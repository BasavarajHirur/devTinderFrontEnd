import { createReducer, on } from "@ngrx/store";
import { getOrderResponse } from "./payment.actions";

export interface PaymentState {
    orderResponse: any;
    error: any;
}

export const initialPaymentState: PaymentState = {
    orderResponse: null,
    error: null
};

export const paymentReducer = createReducer(
    initialPaymentState,
    on(
        getOrderResponse,
        (state, { orderResponse }) => ({ ...state, orderResponse, error: null })
    )
)
