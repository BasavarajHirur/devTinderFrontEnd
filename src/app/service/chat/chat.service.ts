import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { BASE_URL } from 'src/app/utils/constant';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  private messagesCache = new Map<string, { messages: any[]; totalPages: number; loadedPages: Set<number> }>();

  getChatList() {
    return this.http.get(BASE_URL + `/chatList`, { withCredentials: true });
  }

  getChat(targetUserId: string) {
    return this.http.get(BASE_URL + `/getChat/${targetUserId}`, { withCredentials: true });
  }

  getMessages(chatId: string, page: number, limit: number): Observable<any> {
    const cached = this.messagesCache.get(chatId);

    // ✅ if this page already loaded, return from cache
    if (cached && cached.loadedPages.has(page)) {
      console.log(`Cache hit for chat ${chatId}, page ${page}`);
      return of(cached.messages);
    }

    // ✅ else fetch from API
    return this.http
      .get<{ data: any[]; totalPages: number }>(
        BASE_URL + `/messages/${chatId}?page=${page}&limit=${limit}`,
        { withCredentials: true }
      )
      .pipe(
        tap((res) => {
          const existing = cached?.messages || [];
          const loadedPages = cached?.loadedPages || new Set<number>();

          const updatedMessages =
            page === 1
              ? res.data // fresh load → replace
              : [...res.data.reverse(), ...existing]; // prepend older messages

          this.messagesCache.set(chatId, {
            messages: updatedMessages,
            totalPages: res.totalPages,
            loadedPages: new Set([...loadedPages, page])
          });
        })
      );
  }

  getCachedMessages(chatId: string): any[] {
    return this.messagesCache.get(chatId)?.messages || [];
  }

  getTotalPages(chatId: string): number {
    return this.messagesCache.get(chatId)?.totalPages || 0;
  }

  resetChatCache(chatId: string) {
    this.messagesCache.delete(chatId);
  }
}
