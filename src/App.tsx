import styles from './App.module.css'
import {ProductForm} from "./components/ProductForm/ProductForm.tsx";
import {ProductsTable} from "./components/ProductsTable/ProductsTable.tsx";
import {CurrentBox} from "./components/CurrentBox/CurrentBox.tsx";
import {StatisticBlock} from "./components/StatisticBlock/StatisticBlock.tsx";
import {useState} from "react";
import {BoxesTable} from "./components/BoxesTable/BoxesTable.tsx";


export function App() {
    const [activeTab, setActiveTab] = useState<'products' | 'boxes'>('products')


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
