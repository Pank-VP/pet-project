import clsx from 'clsx';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../store/Home/ActionCreator';
import { RootState } from '../../store/store';
import styles from './Pagination.module.scss';

const Pagination: FC = () => {
  const dispatch = useDispatch();
  const { coinsPerPage, totalCount, currentPage } = useSelector((state: RootState) => state.addAllCoins);
  const pageNumber: number[] = [];

  for (let i = 1; i <= Math.ceil(totalCount/coinsPerPage); i++) {
    pageNumber.push(i)
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ul className={styles.numeration}>
          {coinsPerPage && pageNumber.map((page, number) => (
            <li key={number} className={styles.page_item}>
              <div
                className={clsx(styles.page_link, currentPage === page && styles.page_link_currentPage)}
                onClick={() => dispatch(setCurrentPage(page))}
              >
                {number + 1}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Pagination;
