import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ChatState } from "./chat.reducer";

const selectChatState = createFeatureSelector<ChatState>('chat');

export const selectChats = createSelector(
    selectChatState,
    (state: ChatState) => state.chats
)