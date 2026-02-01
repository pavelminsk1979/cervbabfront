import styles from './StatisticBlock.module.css';
import {useSelector} from "react-redux";
import type {RootState} from "../../store";

export const StatisticBlock = () => {
    const countProducts = useSelector((s: RootState) => s.productsStore.countProducts);

    const countBox = 0
    const countProductsInCurrentBox = 0
    return (
        <div className={styles.common}>
            <h3>Статистика</h3>

            <div>
                Количество уникальных продуктов:
                <span className={styles.redNumber}> {countProducts}</span>
            </div>

            <div>
                Количество коробок:
                <span className={styles.redNumber}> {countBox}</span>
            </div>

            <div>
                Количество продуктов в текущей коробке:
                <span className={styles.redNumber}> {countProductsInCurrentBox}</span>
            </div>
        </div>
    )
}


