import { Actions, createEffect, ofType } from "@ngrx/effects";
import { login, logInResult, logout, signup, signupResult } from "./common.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { AuthService } from "../service/auth/auth.service";
import { Injectable } from "@angular/core";
import * as profileAction from './profile/profile.actions';
import { Router } from "@angular/router";

@Injectable()
export class commonEfects {
    constructor(private action$: Actions, private service: AuthService, private router: Router) { }

    public signup$ = createEffect(() => {
        return this.action$.pipe(
            ofType(signup),
            switchMap(({ signupDetails }) => this.service.signUp(signupDetails).pipe(
                map((signupRes) => signupResult({ signupRes })),
                catchError((error) => of(signupResult({ signupRes: { error } })))
            ))
        )
    })

    public login$ = createEffect(() => {
        return this.action$.pipe(
            ofType(login),
            switchMap(({ loginDetails }) => this.service.login(loginDetails).pipe(
                map((loggedInUser) => logInResult({ loginRes: loggedInUser })),
                catchError((error) => of(logInResult({ loginRes: { error }, })))
            ))
        )
    })

    public logout$ = createEffect(() => {
        return this.action$.pipe(
            ofType(logout),
            switchMap(() => this.service.logout().pipe(
                map(() => {
                    this.router.navigate(['/landing']);
                    return profileAction.getProfile({ profileDetails: [] });
                }),
                catchError((error) => of())
            ))
        )
    })
}