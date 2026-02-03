import styles from './App.module.css'
import {ProductForm} from "./components/ProductForm/ProductForm.tsx";
import {ProductsTable} from "./components/ProductsTable/ProductsTable.tsx";
import {CurrentBox} from "./components/CurrentBox/CurrentBox.tsx";
import {StatisticBlock} from "./components/StatisticBlock/StatisticBlock.tsx";
import {useEffect, useState} from "react";
import {BoxesTable} from "./components/BoxesTable/BoxesTable.tsx";
import {productsApi} from "./api/productsApi.ts";
import {setCountProducts, setData} from "./store/products/products.actions.ts";
import {useDispatch, useSelector} from "react-redux";
import type {Dispatch, RootState} from "./store";
import {setInitialized} from "./store/initialized/initialized.actions.ts";
import type {ItemsCount, ProductTeaser} from "./types/products.ts";
import {boxesApi} from "./api/boxesApi.ts";
import {setBoxesWithProducts, setCountBoxes, setCurrentBox} from "./store/box/boxes.actions.ts";
import type {BoxWithProductsTeaser} from "./types/boxes.ts";


export function App() {
    const dispatch = useDispatch<Dispatch>();
    const isInitialized = useSelector((s: RootState) => s.initializedStore.isInitialized);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState<'products' | 'boxes'>('products')

    useEffect(() => {
        const fetch = async () => {
            try {
                const [countProducts, countBoxes, currentBox, products, boxes]: [ItemsCount, ItemsCount, BoxWithProductsTeaser | null, ProductTeaser[], BoxWithProductsTeaser[] | null] = await Promise.all([
                    productsApi.getCountProducts(),
                    boxesApi.getCountBoxes(),
                    boxesApi.getCurrentBox(),
                    productsApi.getAll(),
                    boxesApi.getAll(),

                ]);
                if (countProducts) {
                    dispatch(setCountProducts(countProducts))
                }

                if (countBoxes) {
                    dispatch(setCountBoxes(countBoxes))
                }

                if (currentBox) {
                    dispatch(setCurrentBox(currentBox))
                }

                if (products.length) {
                    dispatch(setData(products))
                }

                if (boxes && boxes.length) {
                    dispatch(setBoxesWithProducts(boxes))
                }

                dispatch(setInitialized(true))
            } catch (e) {
                console.log("ERROR-catch in file ProductsTable", e);
                setError('Ошибка сервера')
            }
        };

        fetch();
    }, []);

    if (!isInitialized) return null

    if (error) return <div>{error}</div>

    return (
        <div className={styles.main}>
            <h2>Система управления продуктами</h2>
            <div className={styles.StatisticProductFormAndCurrentBox}>
                <div className={styles.StatisticBlockAndProductForm}>
                    <StatisticBlock/>
                    <ProductForm/>
                </div>
                <CurrentBox/>
            </div>

            <div className={styles.nameTables}>
                <h3 className={`${activeTab === 'products' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('products')}>Таблица продуктов</h3>
                <h3 className={`${activeTab === 'boxes' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('boxes')}>Таблица коробок</h3>
            </div>

            {activeTab === 'products' && <ProductsTable/>}
            {activeTab === 'boxes' && <BoxesTable/>}
        </div>
    )
}
