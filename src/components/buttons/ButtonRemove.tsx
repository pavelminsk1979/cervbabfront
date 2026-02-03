import {useState} from "react";
import {productsApi} from "../../api/productsApi.ts";
import {useDispatch} from "react-redux";
import type {Dispatch} from "../../store";
import {removeProductById} from "../../store/products/products.actions.ts";
import type {DeleteProduct} from "../../types/products.ts";
import {removeProductForCorrectBox} from "../../store/box/boxes.actions.ts";

type Props = {
    idProduct: string
    headerCleanSearchInput: () => void;
}

export const ButtonRemoveProduct = ({idProduct, headerCleanSearchInput}: Props) => {
    const dispatch = useDispatch<Dispatch>();

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleOnClick = async () => {
        if (isLoading) return;

        setIsLoading(true);
        try {
            const result: DeleteProduct = await productsApi.delete(idProduct);
            if (result.status === 404) {
                setMessage('Что-то пошло не так. Перезагрузите приложение');

            }
            if (result.status === 200) {
                dispatch(removeProductById({idProduct, idBox: result.idBox}))
                dispatch(removeProductForCorrectBox({idProduct, idBox: result.idBox}))
                headerCleanSearchInput()
                setIsLoading(false);
            }
            if (result.status === 500) {
                setMessage('Ошибка сервера. Перезагрузите приложение');
            }

        } catch (error) {
            console.error('ERROR-catch в файле ButtonRemoveProduct ', error);
            setMessage('ERROR-catch. Перезагрузите приложение');
        }
    }
    if (message) return <div>{message}</div>
    return <button onClick={handleOnClick} disabled={isLoading}>удалить продукт</button>
}