import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Chat } from '../api/models/chat.model';
import { KeyPair } from '../key-storage/key-pair.model';

export const requestChats = createAction(
  '[Chat/API] Request Chats'
);

export const createChat = createAction(
  '[Chat/API] Create Chat',
  props<{ userId: string }>()
);

export const saveChatKeys = createAction(
  '[Chat/API] Save Chat Keys',
  props<{ chatId: string, keyPair: KeyPair }>()
);

export const acceptChat = createAction(
  '[Chat/API] Accept Chats',
  props<{ chatId: string }>()
);

export const declineChat = createAction(
  '[Chat/API] Decline Chats',
  props<{ chatId: string }>()
);

export const loadChats = createAction(
  '[Chat/API] Load Chats',
  props<{ chats: Chat[] }>()
);

export const loadChatsFailed = createAction(
  '[Chat/API] Load Chats'
);

export const selectChat = createAction(
  '[Chat/API] Select Chat',
  props<{ chatId: string }>()
);

export const addChat = createAction(
  '[Chat/API] Add Chat',
  props<{ chat: Chat }>()
);

export const upsertChat = createAction(
  '[Chat/API] Upsert Chat',
  props<{ chat: Chat }>()
);

export const addChats = createAction(
  '[Chat/API] Add Chats',
  props<{ chats: Chat[] }>()
);

export const upsertChats = createAction(
  '[Chat/API] Upsert Chats',
  props<{ chats: Chat[] }>()
);

export const updateChat = createAction(
  '[Chat/API] Update Chat',
  props<{ chat: Update<Chat> }>()
);

export const updateChats = createAction(
  '[Chat/API] Update Chats',
  props<{ chats: Update<Chat>[] }>()
);

export const deleteChat = createAction(
  '[Chat/API] Delete Chat',
  props<{ chatId: string }>()
);

export const deleteChats = createAction(
  '[Chat/API] Delete Chats',
  props<{ chatIds: string[] }>()
);
