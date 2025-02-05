import { createReducer, on } from "@ngrx/store"
import { reviewRequestFails, reviewRequestSuccess, sendRequestFails, sendRequestSuccess } from "./requests.actions"

export interface RequestsInitialState {
    sendFails: any,
    reviewFails: any
    loading: boolean,
    error: any
}

const requestsIntialState: RequestsInitialState = {
    sendFails: null,
    reviewFails: null,
    loading: false,
    error: null
}

export const requestsReducer = createReducer(
    requestsIntialState,
    on(
        sendRequestFails,
        (state, { sendFails }) => ({ ...state, sendFails, loading: false, error: null })
    ),
    on(
        reviewRequestFails,
        (state, { reviewFails }) => ({ ...state, reviewFails, loading: false, error: null })
    )
)