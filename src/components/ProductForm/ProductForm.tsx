import {useRef, useState} from "react";
import {productsApi} from "../../api/productsApi.ts";
import styles from './ProductForm.module.css'
import type {ProductWithStatus} from "../../types/products.ts";
import {useDispatch} from "react-redux";
import type {Dispatch} from "../../store";
import {addProduct} from "../../store/products/products.actions.ts";
import {addBoxWithProduct} from "../../store/box/boxes.actions.ts";
import type {BoxWithProductsTeaser} from "../../types/boxes.ts";

export function ProductForm() {
    const dispatch = useDispatch<Dispatch>();
    const nameRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState("");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const name = nameRef.current?.value;
        if (!name) return

        try {
            const response: ProductWithStatus = await productsApi.create(name);

            if (response.status === 409) {
                setMessage(`Продукт c именем '${name}'  уже существует в базе`);
            }


            if (response.status === 500) {
                setMessage('Ошибка сервера');
            }

            if (response.status == 200) {
                setMessage('Продукт  добавлен');
                if (response.result) {
                    dispatch(addProduct(response.result.product))

                    const boxWithProduct: BoxWithProductsTeaser = {
                        id: response.result.box.id,
                        name: response.result.box.name,
                        isFull: response.result.box.isFull,
                        createdAt: response.result.box.createdAt,
                        products: [{id: response.result.product.id, name: response.result.product.name}]
                    }
                    dispatch(addBoxWithProduct(boxWithProduct))
                }

                if (nameRef.current) {
                    nameRef.current.value = '';
                }
            }

        } catch (e) {
            console.error(e);
            setMessage("Ошибка обработки запроса");
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                type="text"
                placeholder="Введите название продукта"
                ref={nameRef}
                required
                className={styles.input}
                onChange={() => setMessage("")}
            />
            <h5 className={styles.message}>{message || <br/>}</h5>
            <button type="submit" className={styles.button}>Создать продукт</button>

        </form>
    );
}