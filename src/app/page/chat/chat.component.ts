import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { loadChats, selectChats, selectLoggedInProfile } from 'src/app/store';
import { socketConnection } from 'src/app/web-socket/socket';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  public toUserId: string = '';
  public messages: any[] = []; // This will hold the chat messages
  public destroy$ = new Subject<void>();
  public userInfo: any;
  public newMessage: string = ''; // This will hold the new message input
  public socket = socketConnection();

  constructor(private activatedRoute: ActivatedRoute, private store: Store) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.activatedRoute.params.subscribe(params => {
      this.toUserId = params['toUserId'];
    });

    if (this.userInfo._id) {
      this.establishSocketConnection();
    }
    this.recieveMessage();
    this.store.dispatch(loadChats({ targetUserId: this.toUserId }));
    this.loadChats();
  }

  establishSocketConnection() {
    //As soon as page loads socket connection made and joicnChat event emitted
    this.socket.emit('joinChat', { currentUserId: this.userInfo._id, targetUserId: this.toUserId });
  }

  getCurrentUser() {
    this.store.select(selectLoggedInProfile)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        res => {
          if (res) {
            this.userInfo = res.data;
          }
        }
      )
  }

  loadChats() {
    this.store.select(selectChats).subscribe(
      res => {
        console.log('Chats loaded:', res);
        if (res) {
          this.messages = res.chat.messages.map((chat: any) => {
            const { firstName, lastName } = chat.senderId;
            const time = this.getTimeDetails(chat.createdAt);
            return { firstName, lastName, text: chat.text, time };
          })
        }
      }
    )
  }

  getTimeDetails(isoString: string) {
    const date = new Date(isoString);

    // Extract hours and minutes
    const hours = date.getUTCHours(); // Use getHours() for local time
    const minutes = date.getUTCMinutes(); // Use getMinutes() for local time

    // Format as "HH:MM"
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    return formattedTime;
  }

  sendMessage() {
    this.socket.emit('sendMessage', { firstName: this.userInfo.firstName, lastName: this.userInfo.lastName, currentUserId: this.userInfo._id, targetUserId: this.toUserId, message: this.newMessage });
  }

  recieveMessage() {
    this.socket.on('receiveMessage', ({ firstName, lastName, message }) => {
      console.log('Message received:', firstName, message);
      const time = this.getTimeDetails(new Date().toISOString());
      this.messages.push({ firstName, lastName, text: message, time });
      this.newMessage = ''; // Clear the input after sending
    });
  }

  ngOnDestroy() {
    this.socket.disconnect(); // Disconnect the socket when the component is destroyed
    this.destroy$.next();
    this.destroy$.complete();
  }
}
