import {useState} from "react";
import {productsApi} from "../../../api/productsApi.ts";
import type {ResponseStatus} from "../../../types/common.ts";
import {useDispatch} from "react-redux";
import type {Dispatch} from "../../../store";
import {removeProductById} from "../../../store/products/products.actions.ts";

type Props = {
    idProduct: string
}

export const ButtonRemoveProduct = ({idProduct}: Props) => {
    const dispatch = useDispatch<Dispatch>();

    const [isLoading, setIsLoading] = useState(false);

    const handleOnClick = async () => {
        if (isLoading) return;

        setIsLoading(true);
        try {
            const result: ResponseStatus = await productsApi.delete(idProduct);
            if (result.status === 200 || result.status === 404) {
                dispatch(removeProductById({idProduct}))
            }
            if (result.status === 500) {
                setIsLoading(false);
            }

        } catch (error) {
            console.error("Ошибка при удалении продукта", error);
            setIsLoading(false);
        }
    }
    return <button onClick={handleOnClick} disabled={isLoading}>удалить</button>
}