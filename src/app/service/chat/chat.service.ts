import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of, tap } from 'rxjs';
import { BASE_URL } from 'src/app/utils/constant';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  private messagesCache = new Map<string, any[]>(); // key: targetUserId, value: messages[]

  getChatList() {
    return this.http.get(BASE_URL + `/chatList`, { withCredentials: true });
  }

  getChat(targetUserId: string) {
    return this.http.get(BASE_URL + `/getChat/${targetUserId}`, { withCredentials: true });
  }

  getMessages(chatId: string) {
    const existing = this.messagesCache.get(chatId) || [];

    console.log('existing', existing);

    if (this.messagesCache.has(chatId)) {
      console.log('got it already')
      return of(existing);
    } else {
      return this.http.get(BASE_URL + `/messages/${chatId}`, { withCredentials: true })
        .pipe(
          tap((res: any) => {
            this.messagesCache.set(chatId, [...existing, ...res.data]);
          }),
          map(
            res => res.data
          )
        );
    }
  }
}
