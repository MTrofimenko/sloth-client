import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchedUsersFeatureKey } from './chat-search.reducer';
import { State } from './chat-search.reducer';
import { selectAll } from './chat-search.reducer';

const selectSearchedUsersFeature = createFeatureSelector<State>(
  SearchedUsersFeatureKey
);

export const selectAllUsers = createSelector(
  selectSearchedUsersFeature,
  selectAll
);

