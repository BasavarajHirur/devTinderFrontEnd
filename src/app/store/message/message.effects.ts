import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ChatService } from "src/app/service";
import { getMessages, loadMessages } from "./message.actions";
import { catchError, map, mergeMap, of, switchMap, withLatestFrom } from "rxjs";
import { Injectable } from "@angular/core";
import { selectMessages, selectMessageState } from "./message.selectors";
import { Store } from "@ngrx/store";

@Injectable()

export class MessageEffects {
    constructor(
        private actions$: Actions,
        private chatService: ChatService,
        private store: Store
    ) { }

    // public loadMessages$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(loadMessages),
    //         switchMap(({ chatId }) => this.chatService.getMessages(chatId).pipe(
    //             map((messages) => getMessages({ messages })),
    //             catchError((error) => of(getMessages({ messages: [] })))
    //         ))
    //     )
    // })

    loadMessages$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadMessages),
            withLatestFrom(this.store.select(selectMessageState)),
            mergeMap(([{ chatId }, state]) => {
                const currentPage = state.page[chatId] || 0;
                const totalPages = state.totalPages[chatId] || Infinity; // assume unknown at start
                const nextPage = currentPage + 1;
                const limit = 15;

                const cached = state.messages[chatId] || [];

                // If we've already loaded all pages, just return cached
                if (nextPage > totalPages) {
                    return of(getMessages({
                        chatId,
                        messages: [],
                        page: currentPage,
                        totalPages
                    }));
                }

                // Otherwise fetch next page from API
                return this.chatService.getMessages(chatId, nextPage, limit).pipe(
                    map((res: any) => getMessages({
                        chatId,
                        messages: res.data,
                        page: nextPage,
                        totalPages: res.totalPages
                    })
                    ),
                    catchError(() =>
                        of(getMessages({
                            chatId,
                            messages: [],
                            page: currentPage,
                            totalPages
                        }))
                    )
                );
            })
        )
    );
}