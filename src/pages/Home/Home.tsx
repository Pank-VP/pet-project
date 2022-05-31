import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageLayout from '../../components/PageLayout/PageLayout';
import Pagination from '../../components/Paginator/Pagination';
import { getCoinsData } from '../../store/Home/ActionCreator';
import type { AppDispatch, RootState } from '../../store/store';
import styles from './Home.module.scss'

const Home: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.addData);
  const [ loading, setLoading] = useState(false);
  const [ currentPage, setCurrentPage] = useState(1);
  const [ coinsPerPage ] = useState(10);

  useEffect(() => {
    setLoading(true)
    dispatch(getCoinsData())
    setLoading(false)
  }, [dispatch]);

  const lastCoinsIndex = currentPage * coinsPerPage;
  const firstCoinsIndex = lastCoinsIndex - coinsPerPage;
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <PageLayout>
      <div className={styles.container}>
        <div className={styles.container_wrapper}>

          <table className={styles.table}>
            <tbody>
              <tr>
                <th className={styles.table_title}>Coins</th>
                <th className={styles.table_title}>Price $</th>
                <th className={styles.table_title}>24h changes  %</th>
                <th className={styles.table_title}>Marcet Cap</th>
              </tr>
            </tbody>
            {items && items.slice(firstCoinsIndex, lastCoinsIndex).map((item) => {
              return (
                <tbody>
                  <tr className={styles.table_row} key={item.id}>
                    <td className={styles.table_name}>{item.name}</td>
                    <td className={styles.table_price}>{Math.floor(item.priceUsd * 100) / 100}</td>
                    <td className={styles.table_price}>{Math.floor(item.changePercent24Hr * 100) / 100}</td>
                    <td>{Math.floor(item.marketCapUsd)}</td>
                  </tr>
                </tbody>
                )
              })}
          </table>
          {items && 
            <Pagination
              coinsPerPage={coinsPerPage}
              totalCoins={items.length}
              paginate={paginate}
            />
          }
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;