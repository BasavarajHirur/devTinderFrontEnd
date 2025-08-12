import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/utils/constant';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  getChatList() {
    return this.http.get(BASE_URL + `/chatList`, { withCredentials: true });
  }

  getIndividualChatMessages(targetUserId: string) {
    return this.http.get(BASE_URL + `/chat/${targetUserId}`, { withCredentials: true });
  }
}
