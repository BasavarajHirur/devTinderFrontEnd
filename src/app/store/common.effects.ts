import { Actions, createEffect, ofType } from "@ngrx/effects";
import { login, loginResult, signup, signupResult } from "./common.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { AuthService } from "../service/auth/auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class commonEfects {
    constructor(private action$: Actions, private service: AuthService) { }

    public signup$ = createEffect(() => {
        return this.action$.pipe(
            ofType(signup),
            switchMap(({ signupDetails }) => this.service.signUp(signupDetails).pipe(
                map((signupRes) => signupResult({ signupRes })),
                catchError((error) => of(signupResult({ signupRes: error })))
            ))
        )
    })

    public login$ = createEffect(() => {
        return this.action$.pipe(
            ofType(login),
            switchMap(({ loginDetails }) => this.service.login(loginDetails).pipe(
                map((loggedInUser) => loginResult({ loggedInUser })),
                catchError((error) => of(loginResult({ loggedInUser: error })))
            ))
        )
    })
}