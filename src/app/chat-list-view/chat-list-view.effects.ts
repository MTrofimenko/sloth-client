import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { ChatService } from '../api/chat.service';
import { State } from './chat-list-view.reducer';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  tap,
  concatMap,
} from 'rxjs/operators';
import {
  requestChats,
  loadChats,
  loadChatsFailed,
  acceptChat,
  upsertChat,
  declineChat,
  deleteChat,
  createChat,
  saveChatKeys,
  addChat,
} from './chat-list-view.actions';
import { KeyStorageService } from '../key-storage/key-storage.service';
import { CryptService } from '../crypt/crypt.service';

@Injectable({ providedIn: 'root' })
export class ChatEffects {
  constructor(
    private actions$: Actions,
    private chatService: ChatService,
    private storageService: KeyStorageService,
    private cryptService: CryptService,
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

  createChat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createChat),
      mergeMap(({ userId }) => {
        const keyPair = this.cryptService.createKeyPair();

        return this.chatService
          .createChat({
            name: '',
            memberIds: [userId],
            creatorPublicKey: keyPair.publicKey,
          })
          .pipe(
            concatMap((chat) =>
              of(saveChatKeys({ chatId: chat.id, keyPair }), addChat({ chat }))
            ),
            catchError(() => EMPTY)
          );
      })
    )
  );

  acceptChat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(acceptChat),
      switchMap(({ chatId }) => {
        const keyPair = this.cryptService.createKeyPair();

        return this.chatService.acceptChat(chatId, keyPair.publicKey).pipe(
          concatMap((chat) => {
            return of(saveChatKeys({ chatId, keyPair }), upsertChat({ chat }));
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

  saveChatKeys$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(saveChatKeys),
        tap(({ chatId, keyPair }) => {
          this.storageService.setKeyPairByChatId(chatId, keyPair);
        })
      ),
    { dispatch: false }
  );
}
