import { createAction, props } from '@ngrx/store';
import { UserModel } from 'src/app/auth/auth.model';

export const searchUsers = createAction(
  '[Chat/API] Search User',
  props<{ namePart: string }>()
);

export const selectUser = createAction(
  '[Chat/API] Select User',
  props<{ user: UserModel }>()
);

export const searchUsersSuccess = createAction(
  '[Chat/API] Search User Success',
  props<{ users: UserModel[] }>()
);
export const searchUsersFail = createAction(
  '[Chat/API] Search User Fail'
);
