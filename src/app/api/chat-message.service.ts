import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChatMessage, CreateChatMessageRequest } from './models/chat-message.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatMessageService {
  constructor(private http: HttpClient) {}

  loadAll(chatId: string): Observable<ChatMessage[]> {
    return this.http
      .get<{ chatMessages: [] }>(`${environment.apiUrl}/api/${chatId}/chat-message`)
      .pipe(map((x) => x.chatMessages));
  }

  sendMessage(chatId: string, request: CreateChatMessageRequest) {
    return this.http.post<ChatMessage>(
      `${environment.apiUrl}/api/${chatId}/chat-message`,
      request
    );
  }
}
