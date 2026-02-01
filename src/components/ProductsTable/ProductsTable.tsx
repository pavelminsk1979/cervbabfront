import styles from './ProductsTable.module.css';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {Dispatch, RootState} from "../../store";
import {setCountProducts, setData} from "../../store/products/products.actions.ts";
import type {ProductTeaser} from "../../types/products.ts";
import {productsApi} from "../../api/productsApi.ts";
import {ButtonRemoveProduct} from "../buttons/ButtonRemove/ButtonRemove.tsx";

export const ProductsTable = () => {

    const dispatch = useDispatch<Dispatch>();
    const products = useSelector((s: RootState) => s.productsStore.products);
    const [error, setError] = useState("");


    useEffect(() => {
        const fetch = async () => {
            if (products.length) return
            try {
                // const products: ProductTeaser[] = await productsApi.getAll();
                const [products, countProducts] = await Promise.all([
                    productsApi.getAll(),
                    productsApi.getCountProducts(),
                ]);
                if (products.length) {
                    dispatch(setData(products))
                }
                if (countProducts) {
                    dispatch(setCountProducts(countProducts))
                }


            } catch (e) {
                console.log("ERROR-catch in file ProductsTable", e);
                setError('Ошибка сервера')
            }
        };

        fetch();
    }, []);


    return (
        <table className={styles.productsTable}>
            <thead>
            <tr>
                <th>Название продукта</th>
                <th>Дата создания</th>
                <th>Удалить</th>
            </tr>
            </thead>
            <tbody>
            {products?.length > 0 ? (
                products.map((p: ProductTeaser) => (
                    <tr key={p.id}>
                        <td className={styles.nameCell}>{p.name}</td>
                        <td>{new Date(p.createdAt).toLocaleString("ru-RU")}</td>
                        <td><ButtonRemoveProduct idProduct={p.id}/></td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td>
                        {error ? error : <br/>}
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    )
}