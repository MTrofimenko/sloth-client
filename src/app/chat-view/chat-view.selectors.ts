import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  State, ChatMessagesFeatureKey, selectAll
} from './chat-view.reducer';

export const selectChatsFeature = createFeatureSelector<State>(
  ChatMessagesFeatureKey
);

export const selectChatMessagesPage = createSelector(
  selectChatsFeature,
  selectAll
);
