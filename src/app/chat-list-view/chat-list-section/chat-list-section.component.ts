import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../chat-list-view.reducer';
import {
  requestChats,
  selectChat,
  acceptChat,
  declineChat,
} from '../chat-list-view.actions';
import {
  selectPendingChatTiles,
  selectActiveChatTiles,
} from '../chat-list-view.selectors';

@Component({
  selector: 'chat-list-section',
  templateUrl: './chat-list-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatListSectionComponent implements OnInit {
  constructor(private store: Store<State>) {}

  activeChats$ = this.store.select(selectActiveChatTiles);
  pendingChats$ = this.store.select(selectPendingChatTiles);

  ngOnInit() {
    this.store.dispatch(requestChats());
  }

  public selectChat(chatId: string) {
    this.store.dispatch(selectChat({ chatId }));
  }

  public acceptChat(chatId: string) {
    this.store.dispatch(acceptChat({ chatId }));
  }

  public declineChat(chatId: string) {
    this.store.dispatch(declineChat({ chatId }));
  }
}
