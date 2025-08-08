import { createAction, props } from "@ngrx/store";

const LOAD_CHATS = '[Chat] Load Chats';
const GET_CHATS = '[Chat] Get Chats';

export const loadChats = createAction(
    LOAD_CHATS,
    props<{ targetUserId: string }>()
)

export const getChats = createAction(
    GET_CHATS,
    props<{ chats: any }>()
)