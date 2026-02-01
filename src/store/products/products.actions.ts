import {createAction} from '@reduxjs/toolkit';
import type {ProductCount, ProductTeaser} from "../../types/products.ts";

export const setData = createAction<ProductTeaser[]>('SET_DATA');
export const setCountProducts = createAction<ProductCount>('SET_COUNT_PRODUCTS');
export const addProduct = createAction<ProductTeaser>('ADD_PRODUCTS');
export const removeProductById = createAction<{ idProduct: string }>('REMOVE_PRODUCT_BY_ID');