import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RequestsInitialState } from "./requests.reducer";

const selectState = createFeatureSelector<RequestsInitialState>('requestsData');

export const selectSendRequestFails = createSelector(
    selectState,
    (state: RequestsInitialState) => state.sendFails
)

export const selectReviewRequestFails = createSelector(
    selectState,
    (state: RequestsInitialState) => state.reviewFails
)