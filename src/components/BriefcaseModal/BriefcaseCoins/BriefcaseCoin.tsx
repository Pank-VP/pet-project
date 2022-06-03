import styles from './BriefcaseCoins.module.scss';
import React, { FC, useState } from 'react'
import BriefcaseModal from '../BriefcaseModal';
import clsx from 'clsx';
import { round } from 'lodash';
import { ILocalStorageCoin, getCoinsFromLocalStorage } from '../../Utilits/GetCoinsToLocalStorage';

interface ICaseCoinsProps {
  activeModalPage: boolean;
  setActiveModalPage: (args: boolean) => void;
}

const BrifecaseCoins: FC<ICaseCoinsProps> = ({activeModalPage, setActiveModalPage}) => {
  const [coinsStorage, setCoinsStorage] = useState<ILocalStorageCoin[] | []>(getCoinsFromLocalStorage);

  const removeCoinFromLS = (event: React.MouseEvent<HTMLDivElement>) => {
    const id = event.currentTarget.dataset.id;
    const data = getCoinsFromLocalStorage().filter((item) => item.id !== id);
    localStorage.setItem('coinsArray', JSON.stringify(data));
    setCoinsStorage(getCoinsFromLocalStorage)
  }

  return (
    <BriefcaseModal active={activeModalPage} setActive={setActiveModalPage}>
      <div className={styles.case}>
        <h1 className={styles.case_title}>Coins in your case</h1>
        <div className={styles.case_header}>
          <ul>
            <li>Coin</li>
            <li>Price</li>
            <li>Change Percent(24H)</li>
            <li>Amount Coins(24H)</li>
            <li>Total</li>
          </ul>
        </div>
        <div className={styles.case_container}>
          {getCoinsFromLocalStorage() && getCoinsFromLocalStorage().map((item, index) => (
            <div className={styles.case_card} key={index}>
              <h3 className={styles.case_items}>{item.name}</h3>
              <p className={styles.case_items}>
                {round(item.price, 3)}$
              </p>
              <span
                className={clsx(Math.sign(item.percent) === -1 || -0 ? styles.red : styles.green)}
              >
                {Math.sign(item.percent) !== -1 || -0 ? '+' : ''}
                {round(item.percent, 4)}%
              </span>
              <span className={styles.case_items}>{item.amount}</span>
              <span className={styles.case_items}>{round(item.total, 1)}$</span>
              <div
                className={styles.case_button}
                onClick={(event) => removeCoinFromLS(event)}
                data-id={item.id}
              >
                Delete
              </div>
            </div>
          )
          )}
        </div>
      </div>
    </BriefcaseModal>
  )
}

export default BrifecaseCoins;
