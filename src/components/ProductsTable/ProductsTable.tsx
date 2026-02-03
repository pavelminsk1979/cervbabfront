import styles from './ProductsTable.module.css';
import {useSelector} from "react-redux";
import type {RootState} from "../../store";
import type {ProductTeaser} from "../../types/products.ts";
import {ButtonRemoveProduct} from "../buttons/ButtonRemove.tsx";
import {useEffect, useState} from "react";


export const ProductsTable = () => {
    const [search, setSearch] = useState('');

    const products = useSelector((s: RootState) => s.productsStore.products);

    useEffect(() => {
        if (search.length) {
            const timeout = setTimeout(() => setSearch(''), 0);
            return () => clearTimeout(timeout);
        }
    }, [products]);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    const headerCleanSearchInput = () => {
        setSearch('');
    };

    return (
        <div className={styles.common}>
            <input
                className={styles.searchInput}
                placeholder="Поиск продукта в таблице..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <table className={styles.productsTable}>
                <thead>
                <tr>
                    <th>Название продукта</th>
                    <th>Дата создания</th>
                    <th>Удалить</th>
                </tr>
                </thead>
                <tbody>
                {filteredProducts.length > 0 && (
                    filteredProducts.map((p: ProductTeaser) => (
                        <tr key={p.id}>
                            <td className={styles.nameCell}>{p.name}</td>
                            <td>{new Date(p.createdAt).toLocaleString("ru-RU")}</td>
                            <td><ButtonRemoveProduct idProduct={p.id} headerCleanSearchInput={headerCleanSearchInput}/>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>


    )
}