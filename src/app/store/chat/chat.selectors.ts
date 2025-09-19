import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ChatState } from "./chat.reducer";

const selectChatState = createFeatureSelector<ChatState>('chat');

export const selectChatList = createSelector(
    selectChatState,
    (state: ChatState) => state.chatsList
)

export const selectChat = createSelector(
    selectChatState,
    (state: ChatState) => state.chat
)