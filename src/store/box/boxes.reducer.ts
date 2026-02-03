import {
    addBoxWithProduct,
    setCountBoxes,
    setCurrentBox,
    setBoxesWithProducts,
    removeProductForCorrectBox, removeBoxById
} from './boxes.actions.ts'
import type {BoxWithProductsTeaser} from "../../types/boxes.ts";
import {createReducer} from "@reduxjs/toolkit";


export interface BoxState {
    countBoxes: number
    currentBoxWithProducts: BoxWithProductsTeaser | null
    boxesWithProducts: BoxWithProductsTeaser[]
}

const initialState: BoxState = {
    countBoxes: 0,
    currentBoxWithProducts: null,
    boxesWithProducts: []
}

export default createReducer(initialState, (builder) => {
    builder
        .addCase(addBoxWithProduct, (state, action) => {
            const newBox: BoxWithProductsTeaser = action.payload;
            if (!state.currentBoxWithProducts || state.currentBoxWithProducts.id !== newBox.id) {
                state.currentBoxWithProducts = newBox;
                state.boxesWithProducts.unshift(newBox)
                state.countBoxes += 1
            } else {
                state.currentBoxWithProducts.products.unshift(...newBox.products);

                const targetBox = state.boxesWithProducts.find(
                    b => b.id === newBox.id
                );

                if (targetBox) {
                    targetBox.products.unshift(...newBox.products);
                }
            }

        })
        .addCase(setCountBoxes, (state, action) => {
            state.countBoxes = action.payload.itemsCount
        })
        .addCase(setCurrentBox, (state, action) => {
            state.currentBoxWithProducts = action.payload
        })
        .addCase(setBoxesWithProducts, (state, action) => {
            state.boxesWithProducts = action.payload
        })

        .addCase(removeProductForCorrectBox, (state, action) => {
            const idProduct = action.payload.idProduct
            const idBox = action.payload.idBox
            // удаляю из текущей коробки
            if (state.currentBoxWithProducts && state.currentBoxWithProducts.id === idBox) {

                state.currentBoxWithProducts.products = state.currentBoxWithProducts.products.filter(
                    p => p.id !== idProduct
                )

                if (state.currentBoxWithProducts.products.length === 0) {
                    if (state.boxesWithProducts.length > 0) {
                        state.currentBoxWithProducts = state.boxesWithProducts[1];
                    }
                }
            }
            // удаляю из таблицы коробок
            const boxIndex = state.boxesWithProducts.findIndex(b => b.id === idBox);
            if (boxIndex !== -1) {
                const box = state.boxesWithProducts[boxIndex];
                box.products = box.products.filter(p => p.id !== idProduct);

                if (box.products.length === 0) {
                    state.boxesWithProducts.splice(boxIndex, 1);
                    state.countBoxes -= 1
                }
            }

        })
        .addCase(removeBoxById, (state, action) => {
            const idBox = action.payload.idBox;

            const index = state.boxesWithProducts.findIndex(b => b.id === idBox);
            if (index !== -1) {
                state.boxesWithProducts.splice(index, 1);
                state.countBoxes -= 1;
            }

            if (state.currentBoxWithProducts?.id === idBox) {
                if (state.boxesWithProducts.length > 0) {
                    state.currentBoxWithProducts = state.boxesWithProducts[0]
                } else {
                    state.currentBoxWithProducts = null;
                }
            }
        })

})