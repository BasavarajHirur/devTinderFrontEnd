import { createAction, props } from "@ngrx/store";

const LOAD_MESSAGES = '[Chat] Load messages';
const GET_MESSAGES = '[Chat] Get messages';

const CLEAR_MESSAGES = '[Chat] Clear messages';

export const loadMessages = createAction(
    LOAD_MESSAGES,
    props<{ chatId: string }>()
)

export const getMessages = createAction(
    GET_MESSAGES,
    props<{ chatId: string; messages: any[]; page: number; totalPages: number }>()
)