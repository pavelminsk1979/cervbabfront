import {configureStore} from "@reduxjs/toolkit";
import productsReducer from "./products/products.reducer";

export const store = configureStore({
    reducer: {
        productsStore: productsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
window.store = store;