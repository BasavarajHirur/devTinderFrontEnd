import { createAction, props } from "@ngrx/store";

const LOAD_PROFILE = '[profile action] load profile';
const GET_PROFILE = '[profile action] get profile';

const EDIT_PROFILE = '[profile action] edit profile';
const EDIT_PROFILE_SUCCESS = '[profile action] edit profile success';
const EDIT_PROFILE_FAILS = '[profile action] edit profile fails';


export const loadProfile = createAction(
    LOAD_PROFILE
)

export const getProfile = createAction(
    GET_PROFILE,
    props<{ profileDetails: any }>()
)

export const editProfile = createAction(
    EDIT_PROFILE,
    props<{ profileDetails: any }>()
)

export const editProfileSuccess = createAction(
    EDIT_PROFILE_SUCCESS,
    props<{ editProfileSuccessRes: any }>()
)

export const editProfileFails = createAction(
    EDIT_PROFILE_FAILS,
    props<{ editProfileFailsRes: any }>()
)