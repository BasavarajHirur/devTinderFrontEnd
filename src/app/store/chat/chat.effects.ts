import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ChatService } from "src/app/service";
import { getChats, loadChats } from "./chat.actions";
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
            ofType(loadChats),
            switchMap(({ targetUserId }) => this.chatService.getChatMessages(targetUserId).pipe(
                map((chats) => getChats({ chats })),
                catchError((error) => of(getChats({ chats: [] })))
            ))
        )
    })
}