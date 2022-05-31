import React, { FC } from 'react';
import styles from './Pagination.module.scss';

interface IPagination {
  coinsPerPage: number;
  totalCoins: number;
  paginate: any;

}

const Pagination: FC<IPagination> = ({ coinsPerPage, totalCoins, paginate }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalCoins/coinsPerPage); i++) {
    pageNumber.push(i)
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ul className={styles.numeration}>
          {pageNumber.map(number => (
            <li className={styles.page_item} key={number}>
              <div className={styles.page_link} onClick={() => paginate(number)}>
                {number}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Pagination;