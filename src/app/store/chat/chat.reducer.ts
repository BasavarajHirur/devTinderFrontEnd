import { createReducer, on } from "@ngrx/store";
import { getChatList, getIndividualChat } from "./chat.actions";

export interface ChatState {
    chatsList: any,
    individualChats: any,
    error: string | null
}

export const initialChatState: ChatState = {
    chatsList: [],
    individualChats: [],
    error: null
};

export const chatReducer = createReducer(
    initialChatState,
    on(getChatList,
        (state, { chatsList }) => ({ ...state, chatsList, error: null })
    ),
    on(getIndividualChat,
        (state, { chats }) => {
            return ({ ...state, individualChats: chats, error: null })
        }
    ),
)