import { createAction, props } from '@ngrx/store';
import { UserModel } from './auth.model';
import { AuthToken } from './auth-token.model';
import { RegisterModel } from './register.model';

export const loadCurrentUserComplete = createAction(
  '[Auth] Load Current User Complete',
  props<{ user: UserModel }>()
);

export const loadCurrentUserFailed = createAction(
  '[Auth] Load Current User Failed',
  props<{ error: any }>()
);

export const login = createAction(
  '[Auth] Login',
  props<{ userName: string, password: string }>()
);
export const logon = createAction(
  '[Auth] Logon',
  props<{ registerModel: RegisterModel}>()
);

export const logout = createAction(
  '[Auth] Logout'
);

export const loginFailed = createAction(
  '[Auth] Login Failed',
  props<{ error: any }>()
);

export const logonFailed = createAction(
  '[Auth] Logon Failed',
  props<{ error: any }>()
);

export const loginComplete = createAction(
  '[Auth] Login Complete',
  props<{ token: AuthToken }>()
);

export const authenticationDone = createAction(
  '[Auth] Authentication Done',
  props<{ isAuthenticationDone: boolean }>()
);
