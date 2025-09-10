import { createReducer, on } from "@ngrx/store";
import { getChat, getChatList, getMessages } from "./chat.actions";

export interface ChatState {
    chatsList: any,
    chat: any,
    messages: any,
    error: string | null
}

export const initialChatState: ChatState = {
    chatsList: [],
    chat: null,
    messages: [],
    error: null
};

export const chatReducer = createReducer(
    initialChatState,
    on(getChatList,
        (state, { chatsList }) => ({ ...state, chatsList, error: null })
    ),
    on(getChat,
        (state, { chat }) => ({ ...state, chat, error: null })
    ),
    on(getMessages,
        (state, { messages }) => {
            return ({ ...state, messages, error: null })
        }
    ),
)