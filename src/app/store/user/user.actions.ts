import { createAction, props } from "@ngrx/store";

const LOAD_USER_FEED = '[user action] load user feeds';
const GET_USER_FEED = '[user action] get user feeds';
const UPDATE_USER_FEED = '[user action] update user feed';

const LOAD_CONNECTIONS = '[user action] load connections';
const GET_CONNECTIONS = '[user action] get connections';

const LOAD_RECIEVED_REQUESTS = '[user action] load received requests';
const GET_RECIEVED_REQUESTS = '[user action] get received requests';
const UPDATE_RECEIVED_REQUESTS = '[user action] update received requests';

export const loadUserFeed = createAction(
    LOAD_USER_FEED
)

export const getUserFeed = createAction(
    GET_USER_FEED,
    props<{ userFeeds: any }>()
)

export const loadConnections = createAction(
    LOAD_CONNECTIONS
)

export const getConnections = createAction(
    GET_CONNECTIONS,
    props<{ connections: any }>()
)

export const loadReceivedRequests = createAction(
    LOAD_RECIEVED_REQUESTS
)

export const getReceivedRequests = createAction(
    GET_RECIEVED_REQUESTS,
    props<{ receivedRequests: any }>()
)

export const updateUserFeeds = createAction(
    UPDATE_USER_FEED,
    props<{ userId: any }>()
)

export const updateReceivedRequests = createAction(
    UPDATE_RECEIVED_REQUESTS,
    props<{ requestId: any }>()
)