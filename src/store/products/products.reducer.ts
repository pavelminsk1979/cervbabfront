import {setData, addProduct, removeProductById, setCountProducts} from './products.actions.ts'
import type {ProductTeaser} from "../../types/products.ts";
import {createReducer} from "@reduxjs/toolkit";

export interface ProductsState {
    products: ProductTeaser[];
    countProducts: number
}

const initialState: ProductsState = {
    products: [],
    countProducts: 0
}

export default createReducer(initialState, (builder) => {
    builder
        .addCase(setData, (state, action) => {
            state.products = action.payload;
        })
        .addCase(addProduct, (state, action) => {
            const newProduct = action.payload;
            state.products.unshift(newProduct);
            state.countProducts += 1;
        })
        .addCase(removeProductById, (state, action) => {
            const id = action.payload.idProduct;
            state.products = state.products.filter(product => product.id !== id);
            state.countProducts -= 1;

        })
        .addCase(setCountProducts, (state, action) => {

            state.countProducts = action.payload.countProducts

        })
})