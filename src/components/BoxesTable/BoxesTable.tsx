import styles from './BoxesTable.module.css';


export const BoxesTable = () => {

    return (
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
            {/*            {products?.length > 0 ? (
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
                        {error ? error : "Продуктов нет"}
                    </td>
                </tr>
            )}*/}
            </tbody>
        </table>
    )
}