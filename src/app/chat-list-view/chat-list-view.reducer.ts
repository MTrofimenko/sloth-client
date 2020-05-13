import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as chatActions from './chat-list-view.actions';
import { Chat, ChatTile, ChatMemberStatus } from '../api/models/chat.model';

export const ChatsFeatureKey = 'Chats';

export interface State extends EntityState<Chat> {
  isLoading: boolean;
  currentChatId: string;
}

export const adapter: EntityAdapter<Chat> = createEntityAdapter<Chat>({
  selectId: (chat) => chat.id,
});

export const initialState: State = adapter.getInitialState({
  isLoading: false,
  currentChatId: null,
});

const chatReducer = createReducer(
  initialState,
  on(chatActions.requestChats, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(chatActions.selectChat, (state, action) => {
    return {
      ...state,
      currentChatId: action.chatId
    };
  }),
  on(chatActions.addChat, (state, action) =>
    adapter.addOne(action.chat, state)
  ),
  on(chatActions.upsertChat, (state, action) =>
    adapter.upsertOne(action.chat, state)
  ),
  on(chatActions.addChats, (state, action) =>
    adapter.addMany(action.chats, state)
  ),
  on(chatActions.upsertChats, (state, action) =>
    adapter.upsertMany(action.chats, state)
  ),
  on(chatActions.updateChat, (state, action) =>
    adapter.updateOne(action.chat, state)
  ),
  on(chatActions.updateChats, (state, action) =>
    adapter.updateMany(action.chats, state)
  ),
  on(chatActions.deleteChat, (state, action) =>
    adapter.removeOne(action.chatId, state)
  ),
  on(chatActions.deleteChats, (state, action) =>
    adapter.removeMany(action.chatIds, state)
  ),
  on(chatActions.loadChats, (state, action) => {
    return adapter.addAll(action.chats, {
      ...state,
      isLoading: false,
    });
  }),
  on(chatActions.loadChatsFailed, (state) => {
    {
      return {
        ...state,
        isLoading: false,
      };
    }
  })
);

export function reducer(state: State | undefined, action: Action) {
  return chatReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectChatTiles = (state: State, currentUserId: string) => {
  const chats = selectAll(state);

  const tiles: ChatTile[] = chats.map((x) => {
    return {
      id: x.id,
      name: x.name,
      status: x.status,
      lastDate: new Date(2020, 3, 15), // TODO on backend
      lastMessage: '', // TODO on backend
      isCurrent: x.id === state.currentChatId,
      isPending:
        x.members.find((y) => y.userId === currentUserId).status ===
        ChatMemberStatus.Pending,
    };
  });

  return tiles;
};
