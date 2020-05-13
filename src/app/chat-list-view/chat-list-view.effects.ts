import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { ChatService } from '../api/chat.service';
import { ChatMemberStatus, ChatStatus } from '../api/models/chat.model';
import { selectCurrentUserId } from '../auth/auth.selectors';
import { State } from './chat-list-view.reducer';
import { selectAllChats } from './chat-list-view.selectors';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import {
  requestChats,
  loadChats,
  loadChatsFailed,
  acceptChat,
  upsertChat,
  declineChat,
  deleteChat,
} from './chat-list-view.actions';

@Injectable({ providedIn: 'root' })
export class ChatEffects {
  constructor(
    private actions$: Actions,
    private chatService: ChatService,
    private store: Store<State>
  ) {}

  loadChats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestChats),
      mergeMap(() =>
        this.chatService.loadAll().pipe(
          map((chats) => loadChats({ chats })),
          catchError(() => of(loadChatsFailed()))
        )
      )
    )
  );

  acceptChat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(acceptChat),
      withLatestFrom(
        this.store.select(selectAllChats),
        this.store.select(selectCurrentUserId)
      ),
      switchMap(([action, chats, userId]) => {
        const publicKey = 'ABC'; // TODO: generate public key for chat

        return this.chatService.acceptChat(action.chatId, publicKey).pipe(
          map(() => {
            const chat = chats.find((x) => x.id === action.chatId);
            const member = chat.members.find((y) => y.userId === userId);
            member.status = ChatMemberStatus.Active;

            return upsertChat({
              chat: {
                ...chat,
                status: ChatStatus.Active,
              },
            });
          }),
          catchError(() => EMPTY)
        );
      })
    )
  );

  declineChat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(declineChat),
      switchMap(({ chatId }) => {
        return this.chatService.declineChat(chatId).pipe(
          map(() => deleteChat({ chatId })),
          catchError(() => EMPTY)
        );
      })
    )
  );
}
