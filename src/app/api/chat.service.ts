import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Chat, CreateChatRequest } from './models/chat.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private defaultRoute = '/api/chat';

  constructor(private http: HttpClient) {}

  loadAll(): Observable<Chat[]> {
    return this.http
      .get<{ chats: [] }>(`${environment.apiUrl}${this.defaultRoute}`)
      .pipe(map((x) => x.chats));
  }

  createChat(request: CreateChatRequest) {
    return this.http.post<Chat>(
      `${environment.apiUrl}${this.defaultRoute}`,
      request
    );
  }

  acceptChat(chatId: string, publicKey: string) {
    return this.http.post<Chat>(
      `${environment.apiUrl}${this.defaultRoute}/${chatId}/accept`,
      { publicKey }
    );
  }

  declineChat(chatId: string) {
    return this.http.post(
      `${environment.apiUrl}${this.defaultRoute}/${chatId}/decline`,
      {}
    );
  }
}
