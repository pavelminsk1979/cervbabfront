import styles from './StatisticBlock.module.css';
import {useSelector} from "react-redux";
import type {RootState} from "../../store";
import type {BoxWithProductsTeaser} from "../../types/boxes.ts";

export const StatisticBlock = () => {
    const countProducts = useSelector((s: RootState) => s.productsStore.countProducts);
    const countBoxes = useSelector((s: RootState) => s.boxStore.countBoxes);
    const currentBoxWithProducts: BoxWithProductsTeaser | null = useSelector((s: RootState) => s.boxStore.currentBoxWithProducts);


    return (
        <div className={styles.common}>
            <h3>Статистика</h3>

            <div>
                Количество уникальных продуктов:
                <span className={styles.redNumber}> {countProducts}</span>
            </div>

            <div>
                Количество коробок:
                <span className={styles.redNumber}> {countBoxes}</span>
            </div>

            <div>
                Количество продуктов в текущей коробке:
                <span
                    className={styles.redNumber}> {currentBoxWithProducts ? currentBoxWithProducts.products.length : 0}</span>
            </div>
        </div>
    )
}


