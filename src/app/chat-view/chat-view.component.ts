import { Component } from '@angular/core';
import { selectCurrentChat } from '../chat-list-view/chat-list-view.selectors';
import { Store } from '@ngrx/store';
import { State } from './chat-view.reducer';
import { selectChatMessagesPage } from './chat-view.selectors';
import { selectCurrentUserId } from '../auth/auth.selectors';
import { sendChatMessage } from './chat-view.actions';

@Component({
  selector: 'chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss'],
})
export class ChatViewComponent {
  constructor(private store: Store<State>) {}

  currentChat$ = this.store.select(selectCurrentChat);
  messages$ = this.store.select(selectChatMessagesPage);
  currentUserId$ = this.store.select(selectCurrentUserId);

  sendMessage(message: string) {
    this.store.dispatch(sendChatMessage({ message }));
  }
}
