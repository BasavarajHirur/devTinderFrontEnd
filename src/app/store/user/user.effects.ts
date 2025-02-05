import { Actions, createEffect, ofType } from "@ngrx/effects";
import { getConnections, getReceivedRequests, getUserFeed, loadConnections, loadReceivedRequests, loadUserFeed } from "./user.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { Injectable } from "@angular/core";
import { UserService } from "src/app/service/user/user.service";

@Injectable()
export class UserEfects {
    constructor(private action$: Actions, private service: UserService) { }

    public userFeed$ = createEffect(() => {
        return this.action$.pipe(
            ofType(loadUserFeed),
            switchMap(() => this.service.feedUsers().pipe(
                map((userFeeds) => getUserFeed({ userFeeds })),
                catchError((error) => of())
            ))
        )
    })

    public loadConnections$ = createEffect(() => {
        return this.action$.pipe(
            ofType(loadConnections),
            switchMap(() => this.service.connections().pipe(
                map((connections) => getConnections({ connections })),
                catchError((error) => of())
            ))
        )
    })

    public loadReceivedRequests$ = createEffect(() => {
        return this.action$.pipe(
            ofType(loadReceivedRequests),
            switchMap(() => this.service.recievedRequests().pipe(
                map((receivedRequests) => getReceivedRequests({ receivedRequests })),
                catchError((error) => of())
            ))
        )
    })
}