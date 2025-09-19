import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ChatService } from "src/app/service";
import { getChat, getChatList, loadChat, loadChatList } from "./chat.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()

export class ChatEffects {
    constructor(
        private actions$: Actions,
        private chatService: ChatService
    ) { }

    public loadChatLists$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadChatList),
            switchMap(() => this.chatService.getChatList().pipe(
                map((chatsList) => getChatList({ chatsList })),
                catchError((error) => of(getChatList({ chatsList: [] })))
            ))
        )
    })

    public loadChat$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadChat),
            switchMap(({ targetUserId }) => this.chatService.getChat(targetUserId).pipe(
                map((chat) => getChat({ chat })),
                catchError((error) => of(getChat({ chat: null })))
            ))
        )
    })
}