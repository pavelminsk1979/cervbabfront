import {createAction} from '@reduxjs/toolkit';
import type {BoxWithProductsTeaser} from "../../types/boxes.ts";
import type {ItemsCount} from "../../types/products.ts";
import type {IdProductAndIdBox} from "../../types/common.ts";


export const addBoxWithProduct = createAction<BoxWithProductsTeaser>('ADD_BOX_WITH_PRODUCTS');
export const setCountBoxes = createAction<ItemsCount>('SET_COUNT_BOXES');
export const setCurrentBox = createAction<BoxWithProductsTeaser>('SET_CURRENT_BOX');
export const setBoxesWithProducts = createAction<BoxWithProductsTeaser[]>('SET_BOXES_WITH_PRODUCTS');
export const removeProductForCorrectBox = createAction<IdProductAndIdBox>('REMOVE_PRODUCT_FOR_CORRECT_BOX');
export const removeBoxById = createAction<{ idBox: string }>('REMOVE_BOX_BY_ID');
