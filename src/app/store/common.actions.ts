import { createAction, props } from "@ngrx/store";

const SIGNUP = '[common action] signup';
const SIGNUP_RESPONSE = '[common action] signup response';

const LOGIN = '[common action] login';
const LOGIN_RESPONSE = '[common action] login response';
const LOGOUT = '[common action] logout';

export const signup = createAction(
    SIGNUP,
    props<{ signupDetails: any }>()
)

export const signupResult = createAction(
    SIGNUP_RESPONSE,
    props<{ signupRes: any }>()
)

export const login = createAction(
    LOGIN,
    props<{ loginDetails: any }>()
)

export const logInResult = createAction(
    LOGIN_RESPONSE,
    props<{ loginRes: any }>()
)

export const logout = createAction(
    LOGOUT
)