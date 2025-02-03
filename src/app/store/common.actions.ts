import { createAction, props } from "@ngrx/store";

const SIGNUP = '[common action] signup';
const SIGNUP_SUCCESS = '[common action] signup success';

const LOGIN = '[common action] login';
const LOGGED_IN_USER = '[common action] logged in user';

export const signup = createAction(
    SIGNUP,
    props<{ signupDetails: any }>()
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
    LOGGED_IN_USER,
    props<{ loggedInUser: any }>()
)