import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { getTimeDetails } from 'src/app/common/common';
import { loadChatList, loadIndividualChat, selectChatList, selectIndividualChats, selectLoggedInProfile } from 'src/app/store';
import { socketConnection } from 'src/app/web-socket/socket';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit, OnDestroy {

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  public chatList: any = [];
  public userInfo: any;
  public messages: any[] = [];
  public newMessage: string = ''; // This will hold the new message input
  public toUserId: string = '';
  private destroy$ = new Subject<void>();
  public socket = socketConnection();

  constructor(private store: Store, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
    this.store.dispatch(loadChatList());
    const targetId = JSON.parse(JSON.stringify(localStorage.getItem('targetId')));
    this.toUserId = targetId;
    this.store.dispatch(loadIndividualChat({ targetUserId: this.toUserId }));
    this.getCurrentUser();
    this.loadChats();
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
            this.establishSocketConnection();
            this.getChatList();
          }
        }
      )
  }

  establishSocketConnection() {
    //As soon as page loads socket connection made and joicnChat event emitted
    this.socket.emit('joinChat', { currentUserId: this.userInfo._id, targetUserId: this.toUserId });
  }

  getChatList() {
    this.store.select(selectChatList).subscribe(
      res => {
        if (res && res.chatList?.length > 0) {
          this.chatList = res.chatList;
        }
      }
    )
  }

  sendMessage() {
    this.socket.emit('sendMessage', { firstName: this.userInfo.firstName, lastName: this.userInfo.lastName, currentUserId: this.userInfo._id, targetUserId: this.toUserId, message: this.newMessage });
  }

  recieveMessage() {
    this.socket.on('receiveMessage', ({ firstName, lastName, message }) => {
      console.log('Message received:', firstName, message);
      const time = getTimeDetails(new Date().toISOString());
      this.messages.push({ firstName, lastName, text: message, time });
      this.newMessage = ''; // Clear the input after sending
    });
  }

  selectContact(targetUserId: string) {
    this.store.dispatch(loadIndividualChat({ targetUserId }));
    this.toUserId = targetUserId;
    localStorage.setItem('targetId', targetUserId);
  }

  loadChats() {
    this.store.select(selectIndividualChats)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        res => {
          if (res && res?.chat?.messages.length > 0) {
            this.messages = res.chat.messages.map((chat: any) => {
              const { firstName, lastName } = chat.senderId;
              const time = getTimeDetails(chat.createdAt);
              return { firstName, lastName, text: chat.text, time };
            })
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
