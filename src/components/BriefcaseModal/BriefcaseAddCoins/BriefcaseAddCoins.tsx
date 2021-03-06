import styles from './BriefcaseAddCoins.module.scss';
import React, { FC, useState } from 'react'
import { ICoinsData } from '../../../api/AllCoinsData';
import { round } from 'lodash';
import BriefcaseModal from '../../BriefcaseModal/BriefcaseModal';
import clsx from 'clsx';
import { addCoinsLocalStorage, getCoinsFromLocalStorage } from '../../Utilits/GetCoinsToLocalStorage';
import { mathSign } from '../../Utilits/MathSign';
import { textPercent } from '../../Utilits/TextPercent';

interface IAddCoinProps {
  activeModal: boolean;
  setActiveModal: (isActive: boolean) => void;
  coins: ICoinsData[] | undefined;
  coinId: string | undefined
}

const AddCoin: FC<IAddCoinProps> = ({activeModal, setActiveModal, coins, coinId}) => {
  const [amount, setAmount] = useState(1);
  const handleAddCoinCase = (coin: ICoinsData) => {
    setActiveModal(false);
    const data = getCoinsFromLocalStorage().find(item => item.id === coin.id);
    if(data?.id === coin.id) {
      const oldData = getCoinsFromLocalStorage().filter((item) => item.id !== coin.id);
      localStorage.setItem('coinsArray', JSON.stringify([...oldData, {...data, amount: data.amount + amount, total: data.total + (data.price * amount)}]));
    } else {
      addCoinsLocalStorage(
        {
          id: coin.id,
          name: coin.name,
          price: round(coin.priceUsd, 1),
          percent: round(coin.changePercent24Hr, 3),
          amount,
          total: round(coin.priceUsd, 2) * amount,
        }
      )
    }
  }

  return (
    <BriefcaseModal active={activeModal} setActive={setActiveModal}>
      <div className={styles.case}>
        <h1 className={styles.case_title}>Сhoose an action</h1>
        {coins && coins.map((item, index) => {
          if(item.id === coinId){
            return (
              <form className={styles.case_card} key={index}>
                <p className={styles.case_items}>{item.name}</p>
                <p className={styles.case_items}>
                  {round(item.priceUsd, 3)}$
                  <span
                    className={clsx(styles.case_items, textPercent(item.changePercent24Hr), styles.case_items_last)}
                  >
                    ({mathSign(item.changePercent24Hr)}
                    {round(item.changePercent24Hr, 4)} %)
                  </span>
                </p>
                <input
                 className={styles.case_input}
                 type="number"
                 onChange={(event) => setAmount(Number(event.target.value))}
                 required
                 value={amount}
                 />
                <div className={styles.case_button} onClick={() => handleAddCoinCase(item)}>Add</div>
              </form>
            )
          }
        })}
      </div>
    </BriefcaseModal>
  )
}

export default AddCoin;