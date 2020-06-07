import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { UserService } from 'src/app/api/user.service';
import {
  mergeMap,
  map,
  catchError,
  withLatestFrom,
  switchMap,
} from 'rxjs/operators';
import {
  searchUsers,
  searchUsersSuccess,
  searchUsersFail,
  selectUser,
} from './chat-search.actions';
import { selectAllChats } from '../chat-list-view.selectors';
import { Store } from '@ngrx/store';
import { State } from './chat-search.reducer';
import { selectChat, createChat } from '../chat-list-view.actions';
@Injectable({ providedIn: 'root' })
export class SearchedUsersEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<State>
  ) {}

  searchUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchUsers),
      mergeMap(({ namePart }) =>
        this.userService.getByName(namePart).pipe(
          map((users) => searchUsersSuccess({ users })),
          catchError(() => of(searchUsersFail()))
        )
      )
    )
  );

  selectUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(selectUser),
      withLatestFrom(this.store.select(selectAllChats)),
      map(([{ user }, chats]) => {
        const chat = chats.find((x) => {
          if (x.members.length > 2) {
            return false;
          }
          return x.members.map((y) => y.userId).includes(user.id);
        });
        if (!!chat) {
          return selectChat({ chatId: chat.id });
        }
        return createChat({ userId: user.id });
      })
    )
  );
}
