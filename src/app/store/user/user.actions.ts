import { createAction, props } from "@ngrx/store";

const CONNECTIONS = '[user action] connections';
const SIGNUP_SUCCESS = '[common action] signup success';

const LOGIN = '[common action] login';
const LOGIN_RESULT = '[common action] login result';

export const connections = createAction(
    CONNECTIONS,
    props<{ connectionRes: any }>()
)

export const signupResult = createAction(
    SIGNUP_SUCCESS,
    props<{ signupRes: any }>()
)

export const login = createAction(
    LOGIN,
    props<{ loginDetails: any }>()
)

export const loginResult = createAction(
    LOGIN_RESULT,
    props<{ loginRes: any }>()
)