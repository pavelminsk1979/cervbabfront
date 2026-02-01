import styles from './CurrentBox.module.css';

export const CurrentBox = () => {
    const productsForCorrectBox = [
        {id: 1, name: 'dddddyyyyy'},
        {id: 2, name: 'dddddgggggg'},
        {id: 3, name: 'dddddbbbbbb нннннннннннннн ооооооооооооооо аааааааааааааааааааааа 7777777777777777777'},
        {id: 4, name: 'ddddd555555ggggg99999999999999999999999999999999999999999999999999'},
        {id: 5, name: 'dddddjjjjj'}
    ]

    const nameBox = 'beautifulBox'
    return (
        <div className={styles.blockCurrentBox}>
            <h3>{`Текущая коробка : ${nameBox} `}</h3>

            <div className={styles.blockListProducts}>
                {productsForCorrectBox.map((el, index) => (
                    <div key={el.id} className={styles.productItem}>
                        {index + 1}. {el.name}
                    </div>
                ))}
            </div>

        </div>


    )
}