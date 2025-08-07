import { createAction, props } from "@ngrx/store";

const CRETAE_ORDER = '[payment action] create order';
const GET_ORDER_RESPONSE = '[payment action] order response';

const PREMIUM_VERIFICATION = '[payment action] premium verification';
const IS_USER_PREMIUM = '[payment action] is user premium';

export const createOrder = createAction(
    CRETAE_ORDER,
    props<{ membershipType: string }>()
)

export const getOrderResponse = createAction(
    GET_ORDER_RESPONSE,
    props<{ orderResponse: any }>()
)

export const premiumVerification = createAction(
    PREMIUM_VERIFICATION
)

export const isUserPremium = createAction(
    IS_USER_PREMIUM,
    props<{ isPremium: boolean }>()
)