import { createAction, props } from "@ngrx/store";

const LOAD_CHAT_LIST = '[Chat] Load Chat list';
const GET_CHAT_LIST = '[Chat] Get Chat list';

const LOAD_CHAT = '[Chat]  load chat';
const GET_CHAT = '[Chat] get chat';

const LOAD_MESSAGES = '[Chat] Load messages';
const GET_MESSAGES = '[Chat] Get messages';

export const loadChatList = createAction(
    LOAD_CHAT_LIST
)

export const getChatList = createAction(
    GET_CHAT_LIST,
    props<{ chatsList: any }>()
)

export const loadChat = createAction(
    LOAD_CHAT,
    props<{ targetUserId: string }>()
)

export const getChat = createAction(
    GET_CHAT,
    props<{ chat: any }>()
)

export const loadMessages = createAction(
    LOAD_MESSAGES,
    props<{ chatId: string }>()
)

export const getMessages = createAction(
    GET_MESSAGES,
    props<{ messages: any }>()
)