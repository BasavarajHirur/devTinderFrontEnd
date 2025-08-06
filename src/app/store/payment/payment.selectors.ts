import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PaymentState } from "./payment.reducer";

const selectState = createFeatureSelector<PaymentState>('paymentData');

export const selectOrderResponse = createSelector(
    selectState,
    (state: PaymentState) => state.orderResponse
)