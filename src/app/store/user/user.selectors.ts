import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserInitialState } from "./user.reducer";

const selectState = createFeatureSelector<UserInitialState>('userData');

export const selectUserFeeds = createSelector(
    selectState,
    (state: UserInitialState) => state.userFeeds
);

export const selectConnections = createSelector(
    selectState,
    (state: UserInitialState) => state.connections
);

export const selectReceivedRequests = createSelector(
    selectState,
    (state: UserInitialState) => state.receivedRequests
);