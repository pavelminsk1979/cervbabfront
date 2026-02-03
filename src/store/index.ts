import {configureStore} from "@reduxjs/toolkit";
import productsReducer from "./products/products.reducer";
import boxReducer from "./box/boxes.reducer.ts";
import InitializedStore from "./initialized/initialized.reducer.ts"

export const store = configureStore({
    reducer: {
        productsStore: productsReducer,
        boxStore: boxReducer,
        initializedStore: InitializedStore
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
window.store = store;