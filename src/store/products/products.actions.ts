import {createAction} from '@reduxjs/toolkit';
import type {ItemsCount, ProductTeaser} from "../../types/products.ts";
import type {IdProductAndIdBox} from "../../types/common.ts";

export const setData = createAction<ProductTeaser[]>('SET_DATA');
export const setCountProducts = createAction<ItemsCount>('SET_COUNT_PRODUCTS');
export const addProduct = createAction<ProductTeaser>('ADD_PRODUCTS');
export const removeProductById = createAction<IdProductAndIdBox>('REMOVE_PRODUCT_BY_ID');
export const removeProducts = createAction<string[]>('REMOVE_PRODUCTS');