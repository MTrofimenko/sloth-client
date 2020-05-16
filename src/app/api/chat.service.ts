import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppSettings } from '../appsettings';
import { Chat, CreateChatRequest } from './models/chat.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private defaultRoute = '/api/chat';

  constructor(private http: HttpClient) {}

  loadAll(): Observable<Chat[]> {
    return this.http
      .get<{ chats: [] }>(`${AppSettings.apiUrl}${this.defaultRoute}`)
      .pipe(map((x) => x.chats));
  }

  createChat(request: CreateChatRequest) {
    return this.http.post<Chat>(
      `${AppSettings.apiUrl}${this.defaultRoute}`,
      request
    );
  }

  acceptChat(chatId: string, publicKey: string) {
    return this.http.post<Chat>(
      `${AppSettings.apiUrl}${this.defaultRoute}/${chatId}/accept`,
      { publicKey }
    );
  }

  declineChat(chatId: string) {
    return this.http.post(
      `${AppSettings.apiUrl}${this.defaultRoute}/${chatId}/decline`,
      {}
    );
  }
}
