import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { ChatMessageService } from '../api/chat-message.service';
import { selectCurrentUserId } from '../auth/auth.selectors';
import { selectChat } from '../chat-list-view/chat-list-view.actions';
import { selectCurrentChatId } from '../chat-list-view/chat-list-view.selectors';
import { State } from './chat-view.reducer';
import {
  catchError,
  map,
  mergeMap,
  withLatestFrom,
  switchMap,
} from 'rxjs/operators';
import {
  loadChatMessages,
  loadChatMessagesFailed,
  sendChatMessage,
  addChatMessage,
} from './chat-view.actions';

@Injectable({ providedIn: 'root' })
export class ChatMessagesEffects {
  constructor(
    private actions$: Actions,
    private chatMessageService: ChatMessageService,
    private store: Store<State>
  ) {}

  loadChatMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(selectChat),
      mergeMap(({ chatId }) =>
        this.chatMessageService.loadAll(chatId).pipe(
          map((chatMessages) => loadChatMessages({ chatMessages })),
          catchError(() => of(loadChatMessagesFailed()))
        )
      )
    )
  );

  sendChatMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendChatMessage),
      withLatestFrom(
        this.store.select(selectCurrentChatId),
        this.store.select(selectCurrentUserId)
      ),
      switchMap(([action, chatId, userId]) =>
        this.chatMessageService
          .sendMessage(chatId, {
            message: action.message,
          })
          .pipe(
            map((messageId) =>
              addChatMessage({
                chatMessage: {
                  id: messageId,
                  message: action.message,
                  userId,
                  sendDate: new Date(), // TODO: review
                },
              })
            ),
            catchError(() => EMPTY)
          )
      )
    )
  );
}
