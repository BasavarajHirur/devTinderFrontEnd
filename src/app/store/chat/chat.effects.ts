import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ChatService } from "src/app/service";
import { getChatList, getIndividualChat, loadChatList, loadIndividualChat } from "./chat.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()

export class ChatEffects {
    constructor(
        private actions$: Actions,
        private chatService: ChatService
    ) { }

    public loadChats$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadChatList),
            switchMap(() => this.chatService.getChatList().pipe(
                map((chatsList) => getChatList({ chatsList })),
                catchError((error) => of(getChatList({ chatsList: [] })))
            ))
        )
    })

    public loadIndividualChats$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loadIndividualChat),
            switchMap(({ targetUserId }) => this.chatService.getIndividualChatMessages(targetUserId).pipe(
                map((chats) => getIndividualChat({ chats })),
                catchError((error) => of(getIndividualChat({ chats: null })))
            ))
        )
    })
}