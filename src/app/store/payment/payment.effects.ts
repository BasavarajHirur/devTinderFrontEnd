import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PaymentService } from "src/app/service/payment/payment.service";
import { createOrder, getOrderResponse, isUserPremium, premiumVerification } from "./payment.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class PaymentEffects {

    constructor(private actions: Actions, private paymentService: PaymentService) { }

    public createOrder$ = createEffect(() => {
        return this.actions.pipe(
            ofType(createOrder),
            switchMap(({ membershipType }) =>
                this.paymentService.makePayment(membershipType).pipe(
                    map((orderResponse) => getOrderResponse({ orderResponse })),
                    catchError((error) => of(getOrderResponse({ orderResponse: { error } })))
                ))
        )
    })

    public premiusVerification$ = createEffect(() => {
        return this.actions.pipe(
            ofType(premiumVerification),
            switchMap(() => this.paymentService.premiumVerification().pipe(
                map((response: any) => {
                    return isUserPremium({ isPremium: response.isPremium });
                }))
            ))
    })
}