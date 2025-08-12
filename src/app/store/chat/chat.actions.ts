import { createAction, props } from "@ngrx/store";

const LOAD_CHATS = '[Chat] Load Chats';
const GET_CHATS = '[Chat] Get Chats';

const LOAD_INDIVIDUAL_CHATS = '[Chat]  load individual chats'
const GET_INDIVIDUAL_CHAT = '[Chat] get individual chat'

export const loadChatList = createAction(
    LOAD_CHATS
)

export const getChatList = createAction(
    GET_CHATS,
    props<{ chatsList: any }>()
)

export const loadIndividualChat = createAction(
    LOAD_INDIVIDUAL_CHATS,
    props<{ targetUserId: string }>()
)

export const getIndividualChat = createAction(
    GET_INDIVIDUAL_CHAT,
    props<{ chats: any }>()
)