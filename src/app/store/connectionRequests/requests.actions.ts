import { createAction, props } from "@ngrx/store";

const SEND_REQUSET = '[request action] send requsts';
const SEND_REQUEST_SUCCESS = '[request action] send success';
const SEND_REQUEST_FAILS = '[request action] send fails';

const REVIEW_REQUEST = '[request action] review requsts';
const REVIEW_REQUEST_SUCCESS = '[request action] review success';
const REVIEW_REQUEST_FAILS = '[request action] review fails';

export const sendRequest = createAction(
    SEND_REQUSET,
    props<{ status: string, userId: any }>()
)

export const sendRequestSuccess = createAction(
    SEND_REQUEST_SUCCESS,
    props<{ sendSuccess: any }>()
)

export const sendRequestFails = createAction(
    SEND_REQUEST_FAILS,
    props<{ sendFails: any }>()
)

export const reviewRequest = createAction(
    REVIEW_REQUEST,
    props<{ status: string, requestId: any }>()
)

export const reviewRequestSuccess = createAction(
    REVIEW_REQUEST_SUCCESS,
    props<{ reviewSuccess: any }>()
)

export const reviewRequestFails = createAction(
    REVIEW_REQUEST_FAILS,
    props<{ reviewFails: any }>()
)