import { Action, createReducer, on } from '@ngrx/store';
import {
  loadCurrentUserComplete, loginComplete
} from './auth.actions';
import { CurrentUser } from './auth.model';
import { AuthToken } from './auth-token.model';
export const authFeatureKey = 'auth';

export interface State {
  token: AuthToken;
  user: CurrentUser;
}

export const initialState: State = {
  token: undefined,
  user: undefined
};

const authReducer = createReducer(
  initialState,

  on(loginComplete, (state, action) => ({
    ...state,
    token: action.token
  })),

  on(loadCurrentUserComplete, (state, action) => ({
    ...state,
    user: action.user
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
