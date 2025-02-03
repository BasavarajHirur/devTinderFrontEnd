import { createReducer, on } from "@ngrx/store"
import { loginResult, signupResult } from "./user.actions"

export interface InitialState {
    loginRes: any,
    signupRes: any,
    loading: boolean,
    error: any
}

const intialState: InitialState = {
    loginRes: null,
    signupRes: null,
    loading: false,
    error: null
}

export const commonReducer = createReducer(
    intialState,
    on(
        loginResult,
        (state, { loginRes }) => ({ ...state, loginRes, loading: false, error: null })
    ),
    on(
        signupResult,
        (state, { signupRes }) => ({ ...state, signupRes, loading: false, error: null })
    )
)