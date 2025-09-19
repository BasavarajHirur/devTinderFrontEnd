import { createReducer, on } from "@ngrx/store";
import { getMessages, loadMessages } from "./message.actions";

export interface MessageState {
    messages: { [chatId: string]: any[] };
    page: { [chatId: string]: number };
    totalPages: { [chatId: string]: number };
    loading: boolean;
    error: string | null
}

export const initialMessageState: MessageState = {
    messages: {},
    page: {},
    totalPages: {},
    loading: false,
    error: null
};

export const messageReducer = createReducer(
    initialMessageState,
    on(getMessages, (state, { chatId, messages, page, totalPages }) => {
        console.log('Reducer getMessages:', { chatId, messages, page, totalPages });
        const reversedMessages = [...messages].reverse(); // Create a reversed copy of messages
        return ({
            ...state,
            messages: {
                ...state.messages,
                [chatId]: (page === 1 && page !== state.totalPages[chatId]) // if first page and not the only page
                    ? messages
                    : [...reversedMessages, ...(state.messages[chatId] || [])] // prepend older
            },
            page: { ...state.page, [chatId]: page },
            totalPages: { ...state.totalPages, [chatId]: totalPages },
            loading: false
        })
    })
)