import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProfileInitialState } from "./profile.reducer";

const selectState = createFeatureSelector<ProfileInitialState>('profilesData');

export const selectLoggedInProfile = createSelector(
    selectState,
    (state: ProfileInitialState) => state.profileDetails
)

export const selectEditProfileSuccess = createSelector(
    selectState,
    (state: ProfileInitialState) => state.editProfileSuccessRes
)

export const selectEditProfileFails = createSelector(
    selectState,
    (state: ProfileInitialState) => state.editProfileFailsRes
)