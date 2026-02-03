import styles from './BoxesTable.module.css';
import type {BoxWithProductsTeaser} from "../../types/boxes.ts";
import {useSelector} from "react-redux";
import type {RootState} from "../../store";
import {useEffect, useState} from "react";
import {ButtonRemoveBox} from "../buttons/ButtonRemoveBox.tsx";


export const BoxesTable = () => {
    const [search, setSearch] = useState('');

    const boxesWithProducts: BoxWithProductsTeaser[] = useSelector((s: RootState) => s.boxStore.boxesWithProducts);

    useEffect(() => {
        if (search.length) {
            const timeout = setTimeout(() => setSearch(''), 0);
            return () => clearTimeout(timeout);
        }
    }, [boxesWithProducts]);

    const filteredBoxesWithProducts = boxesWithProducts.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    const headerCleanSearchInput = () => {
        setSearch('');
    };

    return (
        <div className={styles.common}>
            <input
                className={styles.searchInput}
                placeholder="Поиск коробки в таблице..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <table className={styles.boxsTable}>
                <thead>
                <tr>
                    <th>Название коробки</th>
                    <th>Дата создания</th>
                    <th>Список продуктов</th>
                    <th>Удалить</th>
                </tr>
                </thead>
                <tbody>
                {filteredBoxesWithProducts.length > 0 && filteredBoxesWithProducts.map((box: BoxWithProductsTeaser) => {
                    return (
                        <tr key={box.id}>
                            <td>{box.name}</td>
                            <td>{new Date(box.createdAt).toLocaleString("ru-RU")}</td>
                            <td className={styles.listProducts}>{box.products.map(p => (
                                <span key={p.id} className={styles.nameCell}>{p.name}</span>
                            ))}</td>

                            <td><ButtonRemoveBox idBox={box.id} headerCleanSearchInput={headerCleanSearchInput}/></td>
                        </tr>
                    )
                })}

                </tbody>
            </table>
        </div>
    )
}