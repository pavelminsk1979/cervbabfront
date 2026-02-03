import styles from './CurrentBox.module.css';
import {useSelector} from "react-redux";
import type {RootState} from "../../store";
import type {BoxWithProductsTeaser} from "../../types/boxes.ts";

export const CurrentBox = () => {
    const currentBoxWithProducts: BoxWithProductsTeaser | null = useSelector((s: RootState) => s.boxStore.currentBoxWithProducts);


    return (
        <div className={styles.blockCurrentBox}>
            <h3>{`Название текущей коробки : ${currentBoxWithProducts ? currentBoxWithProducts.name : ''} `}</h3>
            <h4 className={styles.titleListProducts}>Список продуктов:</h4>
            <div className={styles.blockListProducts}>
                {currentBoxWithProducts?.products.map((el) => (
                    <div key={el.id} className={styles.productItem}>
                        - {el.name}
                    </div>
                ))}
            </div>

        </div>


    )
}