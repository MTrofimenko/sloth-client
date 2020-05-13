import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { ChatMessage } from '../api/models/chat-message.model';

export const requestChatMessages = createAction(
  '[ChatMessage/API] Request ChatMessages'
);

export const loadChatMessages = createAction(
  '[ChatMessage/API] Load ChatMessages',
  props<{ chatMessages: ChatMessage[] }>()
);

export const loadChatMessagesFailed = createAction(
  '[ChatMessage/API] Load ChatMessages'
);

export const sendChatMessage = createAction(
  '[ChatMessage/API] Send Chat Message',
  props<{ message: string }>()
);

export const addChatMessage = createAction(
  '[ChatMessage/API] Add ChatMessage',
  props<{ chatMessage: ChatMessage }>()
);

export const upsertChatMessage = createAction(
  '[ChatMessage/API] Upsert ChatMessage',
  props<{ chatMessage: ChatMessage }>()
);

export const addChatMessages = createAction(
  '[ChatMessage/API] Add ChatMessages',
  props<{ chatMessages: ChatMessage[] }>()
);

export const upsertChatMessages = createAction(
  '[ChatMessage/API] Upsert ChatMessages',
  props<{ chatMessages: ChatMessage[] }>()
);

export const updateChatMessage = createAction(
  '[ChatMessage/API] Update ChatMessage',
  props<{ chatMessage: Update<ChatMessage> }>()
);

export const updateChatMessages = createAction(
  '[ChatMessage/API] Update ChatMessages',
  props<{ chatMessages: Update<ChatMessage>[] }>()
);

export const deleteChatMessage = createAction(
  '[ChatMessage/API] Delete ChatMessage',
  props<{ companyId: number }>()
);

export const deleteChatMessages = createAction(
  '[ChatMessage/API] Delete ChatMessages',
  props<{ companyIds: number[] }>()
);
