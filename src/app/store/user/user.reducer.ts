import { createReducer, on } from "@ngrx/store"
import { getConnections, getReceivedRequests, getUserFeed, updateReceivedRequests, updateUserFeeds } from "./user.actions"

export interface UserInitialState {
    userFeeds: any,
    connections: any,
    receivedRequests: any,
    loading: boolean,
    error: any
}

const userIntialState: UserInitialState = {
    userFeeds: null,
    connections: null,
    receivedRequests: null,
    loading: false,
    error: null
}

export const userReducer = createReducer(
    userIntialState,
    on(
        getUserFeed,
        (state, { userFeeds }) => ({ ...state, userFeeds, loading: false, error: null })
    ),
    on(
        getConnections,
        (state, { connections }) => ({ ...state, connections, loading: false, error: null })
    ),
    on(
        getReceivedRequests,
        (state, { receivedRequests }) => ({ ...state, receivedRequests, loading: false, error: null })
    ),
    on(
        updateUserFeeds,
        (state, { userId }) => {
            const userFeed = JSON.parse(JSON.stringify(state.userFeeds.data ?? []));
            const updatedFeeds = userFeed.filter((el: any) => el._id !== userId.toString());
            return ({ ...state, userFeeds: { data: updatedFeeds }, loading: false, error: null })
        }
    ),
    on(
        updateReceivedRequests,
        (state, { requestId }) => {
            const userRequests = JSON.parse(JSON.stringify(state.receivedRequests.data ?? []));
            const updatedRequests = userRequests.filter((el: any) => el._id !== requestId.toString());
            return ({ ...state, receivedRequests: { data: updatedRequests }, loading: false, error: null })
        }
    )
)