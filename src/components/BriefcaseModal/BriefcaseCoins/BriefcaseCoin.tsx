import styles from './BriefcaseCoins.module.scss';
import React, { FC, useState } from 'react'
import BriefcaseModal from '../BriefcaseModal';
import clsx from 'clsx';
import { round } from 'lodash';
import { ILocalStorageCoin, getCoinsFromLocalStorage } from '../../Utilits/GetCoinsToLocalStorage';
import { signMath } from '../../Utilits/Math';
import { textPercent } from '../../Utilits/textPercent';

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
          <ul className={styles.case_header_title}>
            <li className={styles.case_header_items}>Coin</li>
            <li className={styles.case_header_items}>Price</li>
            <li className={clsx(styles.case_header_items, styles.hidden)}>Change Percent(24H)</li>
            <li className={styles.case_header_items}>Amount Coins(24H)</li>
            <li className={styles.case_header_items}>Total</li>
            <li className={styles.case_header_items}></li>
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
                className={clsx(styles.case_items, textPercent(item.percent), styles.hidden)}
              >
                {signMath(item.percent)}
                {round(item.percent, 4)}%
              </span>
              <span className={styles.case_items}>{item.amount}</span>
              <span className={styles.case_items}>{round(item.total, 1)}$</span>
              <div className={styles.case_items}>
                <div
                  className={styles.case_button}
                  onClick={(event) => removeCoinFromLS(event)}
                  data-id={item.id}
                >
                  Delete
                </div>
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
