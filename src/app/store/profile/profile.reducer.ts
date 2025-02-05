import { createReducer, on } from "@ngrx/store"
import { editProfileFails, editProfileSuccess, getProfile } from "./profile.actions"

export interface ProfileInitialState {
    profileDetails: any,
    editProfileSuccessRes: any,
    editProfileFailsRes: any,
    loading: boolean,
    error: any
}

const profileIntialState: ProfileInitialState = {
    profileDetails: null,
    editProfileSuccessRes: null,
    editProfileFailsRes: null,
    loading: false,
    error: null
}

export const profileReducer = createReducer(
    profileIntialState,
    on(
        getProfile,
        (state, { profileDetails }) => ({ ...state, profileDetails, loading: false, error: null })
    ),
    on(
        editProfileSuccess,
        (state, { editProfileSuccessRes }) => {
            const updatedProfile = editProfileSuccessRes;
            return ({ ...state, profileDetails: updatedProfile, editProfileSuccessRes, loading: false, error: true })
        }
    ),
    on(
        editProfileFails,
        (state, { editProfileFailsRes }) => ({ ...state, editProfileFailsRes, loading: false, error: true })
    )
)