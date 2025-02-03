import { createFeatureSelector, createSelector } from "@ngrx/store";
import { InitialState } from "./user.reducer";

const selectState = createFeatureSelector<InitialState>('commonData');

export const selectLogInResponse = createSelector(
    selectState,
    (state: InitialState) => state.loginRes
)

export const selectSignUpResponse = createSelector(
    selectState,
    (state: InitialState) => state.signupRes
)