import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MessageState } from "./message.reducer";

export const selectMessageState = createFeatureSelector<MessageState>('message');

export const selectMessages = createSelector(
    selectMessageState,
    (state) => ({
        page: state.page,
        totalPages: state.totalPages,
        messages: state.messages
    })
);