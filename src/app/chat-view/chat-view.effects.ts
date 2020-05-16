import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { ChatMessageService } from '../api/chat-message.service';
import { ChatMessage } from '../api/models/chat-message.model';
import { selectCurrentUserId } from '../auth/auth.selectors';
import { selectChat } from '../chat-list-view/chat-list-view.actions';
import { CryptService } from '../crypt/crypt.service';
import { KeyPair } from '../key-storage/key-pair.model';
import { KeyStorageService } from '../key-storage/key-storage.service';
import { State } from './chat-view.reducer';
import {
  selectCurrentChatId,
  selectCurrentInterlocutorPublicKey,
} from '../chat-list-view/chat-list-view.selectors';
import {
  catchError,
  map,
  mergeMap,
  withLatestFrom,
  switchMap,
  filter,
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
    private keyStorageService: KeyStorageService,
    private cryptService: CryptService,
    private store: Store<State>
  ) {}

  loadChatMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(selectChat),
      withLatestFrom(
        this.store.select(selectCurrentUserId),
        this.store
          .select(selectCurrentInterlocutorPublicKey)
          .pipe(filter((x) => !!x))
      ),
      mergeMap(([action, userId, publicKey]) =>
        this.chatMessageService.loadAll(action.chatId).pipe(
          map((chatMessages) => {
            const secretKey = this.keyStorageService.getSecretKeyByChatId(
              action.chatId
            );
            const decryptedMessages = this.decryptMessages(
              chatMessages,
              { publicKey, secretKey },
              userId
            );
            return loadChatMessages({ chatMessages: decryptedMessages });
          }),
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
        this.store.select(selectCurrentInterlocutorPublicKey).pipe(filter((x) => !!x))
      ),
      switchMap(([action, chatId, publicKey]) => {
        const secretKey = this.keyStorageService.getSecretKeyByChatId(chatId);
        const encryptedMsg = this.cryptService.encryptMessage(
          action.message,
          publicKey,
          secretKey
        );
        return this.chatMessageService
          .sendMessage(chatId, { message: encryptedMsg })
          .pipe(
            map((chatMessage) => addChatMessage({ chatMessage: {
              ...chatMessage,
              message: action.message
            } })),
            catchError(() => EMPTY)
          );
      })
    )
  );

  public decryptMessages(
    chatMessages: ChatMessage[],
    keyPair: KeyPair,
    userId: string
  ) {
    const decryptedMessages = chatMessages.map((x) => {
      const decryptedMessage =
        x.userId !== userId
          ? this.cryptService.decryptMessage(
              x.message,
              keyPair.publicKey,
              keyPair.secretKey
            )
          : 'Your message can\'t be decrypted';
      return {
        ...x,
        message: decryptedMessage,
      };
    });

    return decryptedMessages;
  }
}
