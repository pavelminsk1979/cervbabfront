import {useRef, useState} from "react";
import {productsApi} from "../../api/productsApi.ts";
import styles from './ProductForm.module.css'
import type {ProductWithStatus} from "../../types/products.ts";
import {useDispatch} from "react-redux";
import type {Dispatch} from "../../store";
import {addProduct} from "../../store/products/products.actions.ts";

export function ProductForm() {
    const dispatch = useDispatch<Dispatch>();
    const nameRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState("");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const name = nameRef.current?.value;
        if (!name) return

        try {
            const result: ProductWithStatus = await productsApi.create(name);

            if (result.status === 409) {
                setMessage(`Продукт c именем '${result.product.name}'  уже существует в базе`);
            }

            if (result.status === 410) {
                setMessage(`Продукт c именем '${result.product.name}'  был удалён, больше недоступен`);
            }

            if (result.status === 500) {
                setMessage('Ошибка сервера');
            }

            if (result.status == 200) {
                setMessage('Продукт  добавлен');

                dispatch(addProduct(result.product))

                if (nameRef.current) {
                    nameRef.current.value = '';
                }
            }

        } catch (e) {
            console.error(e);
            setMessage("Ошибка cервера");
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