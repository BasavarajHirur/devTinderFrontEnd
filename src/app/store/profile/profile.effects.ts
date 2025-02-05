import { Actions, createEffect, ofType } from "@ngrx/effects";
import { editProfile, editProfileFails, editProfileSuccess } from "./profile.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { Injectable } from "@angular/core";
import { ProfileService } from "src/app/service";
import { Router } from "@angular/router";

@Injectable()
export class ProfileEfects {
    constructor(private action$: Actions, private service: ProfileService, private router: Router) { }

    // public loadProfile$ = createEffect(() => {
    //     return this.action$.pipe(
    //         ofType(loadProfile),
    //         switchMap(() => this.service.getProfile().pipe(
    //             map((profileDetails) => getProfile({ profileDetails })),
    //             catchError((error) => of(getProfileFails({ profileFails: error })))
    //         ))
    //     )
    // })

    public editProfile$ = createEffect(() => {
        return this.action$.pipe(
            ofType(editProfile),
            switchMap(({ profileDetails }) => this.service.editProfile(profileDetails).pipe(
                map((editProfileSuccessRes) => editProfileSuccess({ editProfileSuccessRes })),
                catchError((error) => of(editProfileFails({ editProfileFailsRes: error })))
            ))
        )
    })
}