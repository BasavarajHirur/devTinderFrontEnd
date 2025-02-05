import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ConnectionRequestService } from "src/app/service/request-connection/connection-request.service";
import { reviewRequest, reviewRequestFails, reviewRequestSuccess, sendRequest, sendRequestFails, sendRequestSuccess } from "./requests.actions";
import * as userAction from '../user/user.actions';

@Injectable()
export class RequestEfects {
    constructor(private action$: Actions, private service: ConnectionRequestService, private router: Router) { }

    public sendRequest$ = createEffect(() => {
        return this.action$.pipe(
            ofType(sendRequest),
            switchMap(({ status, userId }) => this.service.sendRequest(status, userId).pipe(
                map((sendSuccess) => userAction.updateUserFeeds({ userId })),
                catchError((error) => of(sendRequestFails({ sendFails: error })))
            ))
        )
    })

    public reviewRequest$ = createEffect(() => {
        return this.action$.pipe(
            ofType(reviewRequest),
            switchMap(({ status, requestId }) => this.service.reviewRequest(status, requestId).pipe(
                map((reviewSuccess) => userAction.updateReceivedRequests({ requestId })),
                catchError((error) => of(reviewRequestFails({ reviewFails: error })))
            ))
        )
    })
}