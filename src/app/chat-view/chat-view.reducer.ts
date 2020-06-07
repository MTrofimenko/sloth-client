import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as ChatMessageActions from './chat-view.actions';
import { ChatMessage } from '../api/models/chat-message.model';

export const ChatMessagesFeatureKey = 'ChatMessages';

export interface State extends EntityState<ChatMessage> {
  isLoading: boolean;
}

export const adapter: EntityAdapter<ChatMessage> = createEntityAdapter<ChatMessage>({
  selectId: (chatMessage) => chatMessage.id,
});

export const initialState: State = adapter.getInitialState({
  isLoading: false,
});

const chatMessageReducer = createReducer(
  initialState,
  on(ChatMessageActions.requestChatMessages, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(ChatMessageActions.addChatMessage, (state, action) =>
    adapter.addOne(action.chatMessage, state)
  ),
  on(ChatMessageActions.upsertChatMessage, (state, action) =>
    adapter.upsertOne(action.chatMessage, state)
  ),
  on(ChatMessageActions.addChatMessages, (state, action) =>
    adapter.addMany(action.chatMessages, state)
  ),
  on(ChatMessageActions.upsertChatMessages, (state, action) =>
    adapter.upsertMany(action.chatMessages, state)
  ),
  on(ChatMessageActions.updateChatMessage, (state, action) =>
    adapter.updateOne(action.chatMessage, state)
  ),
  on(ChatMessageActions.updateChatMessages, (state, action) =>
    adapter.updateMany(action.chatMessages, state)
  ),
  on(ChatMessageActions.deleteChatMessage, (state, action) =>
    adapter.removeOne(action.companyId, state)
  ),
  on(ChatMessageActions.deleteChatMessages, (state, action) =>
    adapter.removeMany(action.companyIds, state)
  ),
  on(ChatMessageActions.loadChatMessages, (state, action) => {
    return adapter.addAll(action.chatMessages, {
      ...state,
      isLoading: false,
    });
  }),
  on(ChatMessageActions.loadChatMessagesFailed, (state) => {
    {
      return {
        ...state,
        isLoading: false,
      };
    }
  })
);

export function reducer(state: State | undefined, action: Action) {
  return chatMessageReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
