import {setInitialized} from "./initialized.actions.ts";
import {createReducer} from "@reduxjs/toolkit";

export interface BoxState {
    isInitialized: boolean
}

const initialState: BoxState = {
    isInitialized: false
}

export default createReducer(initialState, (builder) => {
    builder
        .addCase(setInitialized, (state, action) => {
            state.isInitialized = action.payload;
        })

})
