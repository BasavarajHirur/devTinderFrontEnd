import { createReducer, on } from "@ngrx/store"
import { logInResult, signupResult } from "./common.actions"

export interface InitialState {
    signupRes: any,
    loginRes: any,
    loading: boolean,
    error: any
}

const intialState: InitialState = {
    signupRes: null,
    loginRes: null,
    loading: false,
    error: null
}

export const commonReducer = createReducer(
    intialState,
    on(
        signupResult,
        (state, { signupRes }) => ({ ...state, signupRes, loading: false, error: null })
    ),
    on(
        logInResult,
        (state, { loginRes }) => ({ ...state, loginRes, loading: false, error: null })
    )
)