import { createAction, props } from "@ngrx/store";

const CRETAE_ORDER = '[payment action] create order';
const GET_ORDER_RESPONSE = '[payment action] order response';

export const createOrder = createAction(
    CRETAE_ORDER,
    props<{ membershipType: string }>()
)

export const getOrderResponse = createAction(
    GET_ORDER_RESPONSE,
    props<{ orderResponse: any }>()
)