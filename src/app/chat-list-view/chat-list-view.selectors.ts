import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  State,
  ChatsFeatureKey,
  selectAll,
  selectChatTiles,
} from './chat-list-view.reducer';
import { ChatStatus } from '../api/models/chat.model';
import { selectCurrentUserId } from '../auth/auth.selectors';

const selectChatsFeature = createFeatureSelector<State>(ChatsFeatureKey);

export const selectAllChats = createSelector(selectChatsFeature, selectAll);

export const selectChatById = (id: string) =>
  createSelector(selectAllChats, (chat) => chat.find((x) => x.id === id));

export const selectCurrentChatId = createSelector(
  selectChatsFeature,
  (state) => state.currentChatId
);

export const selectCurrentChat = createSelector(
  selectAllChats,
  selectCurrentChatId,
  (state, id) => state.find((x) => x.id === id)
);

export const selectCurrentChatMembers = createSelector(
  selectCurrentChat,
  (state) => state && state.members
);

export const selectCurrentInterlocutor = createSelector(
  selectCurrentChatMembers,
  selectCurrentUserId,
  (members, userId) => members && members.find((x) => x.userId !== userId)
);

export const selectCurrentInterlocutorPublicKey = createSelector(
  selectCurrentInterlocutor,
  member => member && member.publicKey
);

export const selectAllChatTiles = createSelector(
  selectChatsFeature,
  selectCurrentUserId,
  (x, y) => selectChatTiles(x, y)
);

export const selectPendingChatTiles = createSelector(
  selectAllChatTiles,
  (chats) => chats.filter((x) => x.status === ChatStatus.Pending)
);

export const selectActiveChatTiles = createSelector(
  selectAllChatTiles,
  (chats) => chats.filter((x) => x.status === ChatStatus.Active)
);
