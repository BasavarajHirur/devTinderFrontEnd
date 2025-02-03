import { createFeatureSelector, createSelector } from "@ngrx/store";
import { InitialState } from "./common.reducer";

const selectState = createFeatureSelector<InitialState>('commonData');

export const selectLoggedInUser = createSelector(
    selectState,
    (state: InitialState) => state.loggedInUser?.data
)

export const selectSignUpResponse = createSelector(
    selectState,
    (state: InitialState) => state.signupRes
)