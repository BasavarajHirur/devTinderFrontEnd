import { createReducer, on } from "@ngrx/store";
import { getOrderResponse, isUserPremium } from "./payment.actions";

export interface PaymentState {
    orderResponse: any;
    isUserPremium: boolean;
    error: any;
}

export const initialPaymentState: PaymentState = {
    orderResponse: null,
    isUserPremium: false,
    error: null
};

export const paymentReducer = createReducer(
    initialPaymentState,
    on(
        getOrderResponse,
        (state, { orderResponse }) => ({ ...state, orderResponse, error: null })
    ),
    on(
        isUserPremium,
        (state, { isPremium }) => ({ ...state, isUserPremium: isPremium, error: null })
    )
)
