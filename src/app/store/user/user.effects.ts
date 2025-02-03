import { Actions, createEffect, ofType } from "@ngrx/effects";
import { login, loginResult, signupResult } from "./user.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class commonEfects {
    constructor(private action$: Actions) { }

    // public signup$ = createEffect(() => {
    //     return this.action$.pipe(
    //         ofType(signup),
    //         switchMap(({ signupDetails }) => this.service.signUp(signupDetails).pipe(
    //             map((signupRes) => signupResult({ signupRes })),
    //             catchError((error) => of(loginResult({ loginRes: error })))
    //         ))
    //     )
    // })

    // public login$ = createEffect(() => {
    //     return this.action$.pipe(
    //         ofType(login),
    //         switchMap(({ loginDetails }) => this.service.login(loginDetails).pipe(
    //             map((loginRes) => loginResult({ loginRes })),
    //             catchError((error) => of(loginResult({ loginRes: error })))
    //         ))
    //     )
    // })
}