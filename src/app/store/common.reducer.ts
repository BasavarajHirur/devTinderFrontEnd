import { createReducer, on } from "@ngrx/store"
import { loginResult, signupResult } from "./common.actions"

export interface InitialState {
    loggedInUser: any,
    signupRes: any,
    loading: boolean,
    error: any
}

const intialState: InitialState = {
    loggedInUser: null,
    signupRes: null,
    loading: false,
    error: null
}

export const commonReducer = createReducer(
    intialState,
    on(
        loginResult,
        (state, { loggedInUser }) => ({ ...state, loggedInUser, loading: false, error: null })
    ),
    on(
        signupResult,
        (state, { signupRes }) => ({ ...state, signupRes, loading: false, error: null })
    )
)