import {useState} from "react";
import {useDispatch} from "react-redux";
import type {Dispatch} from "../../../store";
import {boxesApi} from "../../../api/boxesApi.ts";
import {removeBoxById} from "../../../store/box/boxes.actions.ts";
import type {DeleteBox} from "../../../types/boxes.ts";
import {removeProducts} from "../../../store/products/products.actions.ts";

type Props = {
    idBox: string
    headerCleanSearchInput: () => void
}

export const ButtonRemoveBox = ({idBox, headerCleanSearchInput}: Props) => {
    const dispatch = useDispatch<Dispatch>();

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleOnClick = async () => {
        if (isLoading) return;

        setIsLoading(true);
        try {
            const result: DeleteBox = await boxesApi.delete(idBox);

            if (result.status === 404) {
                setMessage('Что-то пошло не так. Перезагрузите приложение');

            }

            if (result.status === 200) {
                dispatch(removeBoxById({idBox}))
                dispatch(removeProducts(result.productIds))
                headerCleanSearchInput()
                setIsLoading(false);
            }
            if (result.status === 500) {
                setMessage('Ошибка сервера. Перезагрузите приложение');
            }


        } catch (error) {
            console.error('ERROR-catch в файле ButtonRemoveBox ', error);
            setMessage('ERROR-catch. Перезагрузите приложение');
        }
    }
    if (message) return <div>{message}</div>
    return <button onClick={handleOnClick} disabled={isLoading}>удалить коробку</button>
}