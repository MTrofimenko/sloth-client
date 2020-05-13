import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const selectCurrentUser = createSelector(
  selectAuthState,
  (state) => state && state.user
);

export const selectCurrentUserId = createSelector(
  selectCurrentUser,
  (state) => state && state.id
);
