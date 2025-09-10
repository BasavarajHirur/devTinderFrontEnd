import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { getTimeDetails } from 'src/app/common/common';
import { chatList } from 'src/app/common/model';
import { loadChat, loadChatList, loadMessages, selectChat, selectChatList, selectIndividualChats, selectLoggedInProfile } from 'src/app/store';
import { socketConnection } from 'src/app/web-socket/socket';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit, OnDestroy {

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  public chatList: chatList[] = [];
  public userInfo: any;
  public messages: any[] = [];
  public newMessage: string = ''; // This will hold the new message input
  public targetUserId: string = '';
  public chatId: string = '';
  private destroy$ = new Subject<void>();
  public socket = socketConnection();

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.chatId = nav?.extras?.state?.['chatId'] ?? null;
  }

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
     this.getCurrentUser();
    this.route.paramMap.subscribe(params => {
      this.targetUserId = params.get('targetUserId')!;
      if (!this.chatId) {
        this.store.dispatch(loadChat({ targetUserId: this.targetUserId }));
        this.loadChat();
      }

      if (this.userInfo?._id) {
        this.establishSocketConnection();
      }
    });
    this.store.dispatch(loadChatList());
    this.recieveMessage();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  getCurrentUser() {
    this.store.select(selectLoggedInProfile)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        res => {
          if (res) {
            this.userInfo = res.data;
            this.getChatList();
          }
        }
      )
  }

  establishSocketConnection() {
    //As soon as page loads socket connection made and joicnChat event emitted
    this.socket.emit('joinChat', { currentUserId: this.userInfo._id, targetUserId: this.targetUserId });
  }

  getChatList() {
    this.store.select(selectChatList).subscribe(
      res => {
        if (res && res.length > 0) {
          this.chatList = res;
        }
      }
    )
  }

  loadChat() {
    this.store.select(selectChat).subscribe(chat => {
      if (chat) {
        this.chatId = chat._id;

        // Now fetch messages for this chat
        this.store.dispatch(loadMessages({ chatId: this.chatId }));
        this.loadMessages();
      }
    });
  }

  showName(participants: any[]) {
    const otherParticipant = participants.find(participant => participant._id !== this.userInfo._id);
    return otherParticipant ? `${otherParticipant.firstName} ${otherParticipant.lastName}` : 'Unknown User';
  }

  sendMessage() {
    console.log('sending message', this.targetUserId, this.newMessage);
    this.socket.emit('sendMessage', { firstName: this.userInfo.firstName, lastName: this.userInfo.lastName, currentUserId: this.userInfo._id, targetUserId: this.targetUserId, text: this.newMessage });
  }

  recieveMessage() {
    this.socket.on('receiveMessage', ({ firstName, lastName, text }) => {
      console.log('Message received:', firstName, text);
      const time = getTimeDetails(new Date().toISOString());
      this.messages.push({ firstName, lastName, text, time });
      this.newMessage = ''; // Clear the input after sending
    });
  }

  selectContact(list: chatList) {
    const targetUserId = list.participants.find((participant: any) => participant._id !== this.userInfo._id)?._id;
    this.store.dispatch(loadMessages({ chatId: list.chatId }));
    this.router.navigate(['/chat-page', targetUserId], {
      state: { chatId: list.chatId }   // pass chatId along
    });
  }

  selectedList(list: any) {
    const targetUserIdFromList = list.participants.find((participant: any) => participant._id !== this.userInfo._id)._id;
    return targetUserIdFromList === this.targetUserId;
  }

  loadMessages() {
    this.store.select(selectIndividualChats)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res: any) => {
          if (res && res.length > 0) {
            this.messages = res.map((chat: any) => {
              const { firstName, lastName } = chat.senderId;
              const time = getTimeDetails(chat.createdAt);
              return { firstName, lastName, text: chat.text, time };
            }).reverse();
          } else {
            this.messages = [];
          }
        }
      )
  }

  private scrollToBottom() {
    try {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  ngOnDestroy() {
    this.socket.disconnect(); // Disconnect the socket when the component is destroyed
    this.destroy$.next();
    this.destroy$.complete();
  }
}

