import { createReducer, on } from "@ngrx/store";
import { getChats } from "./chat.actions";

export interface ChatState {
    chats: any,
    error: string | null
}

export const initialChatState: ChatState = {
    chats: null,
    error: null
};

export const chatReducer = createReducer(
    initialChatState,
    on(getChats,
        (state, { chats }) => ({ ...state, chats: chats, error: null })
    ),
)