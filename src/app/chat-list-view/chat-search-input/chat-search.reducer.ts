import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as usersActions from './chat-search.actions';
import { UserModel } from 'src/app/auth/auth.model';

export const SearchedUsersFeatureKey = 'SearchedUsers';

export interface State extends EntityState<UserModel> {
  isLoading: boolean;
}

export const adapter: EntityAdapter<UserModel> = createEntityAdapter<
  UserModel
>({
  selectId: (user) => user.id,
});

export const initialState: State = adapter.getInitialState({
  isLoading: false,
});

const chatReducer = createReducer(
  initialState,
  on(usersActions.searchUsers, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(usersActions.searchUsersSuccess, (state, action) => {
    const newState = adapter.addMany(action.users, state);
    return {
      ...newState,
      isLoading: false,
    };
  }),
  on(usersActions.searchUsersFail, (state) => {
    return {
      ...state,
      isLoading: false,
    };
  }),
);

export function reducer(state: State | undefined, action: Action) {
  return chatReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
