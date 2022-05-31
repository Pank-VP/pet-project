import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageLayout from '../../components/PageLayout/PageLayout';
import { getCoinsData } from '../../store/Home/ActionCreator';
import type { AppDispatch, RootState } from '../../store/store';
import styles from './Home.module.scss'

const Home: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.addData);

  useEffect(() => {
    dispatch(getCoinsData())
  }, [dispatch]);

  return (
    <PageLayout>
      <div className={styles.container}>
        <div className={styles.container_wrapper}>

        <table className={styles.table}>
            <tbody>
              <tr>
                <th>Coins</th>
                <th>Price $</th>
                <th>24h changes  %</th>
                <th>Marcet Cap</th>
              </tr>
            </tbody>
            {items && items.map((coin) => {
              return (
                <tbody>
                  <tr key={coin.id}>
                    <td>{coin.name}</td>
                    <td>{Math.floor(coin.priceUsd * 100) / 100}</td>
                    <td>{Math.floor(coin.changePercent24Hr * 100) / 100}</td>
                    <td>{Math.floor(coin.marketCapUsd)}</td>
                  </tr>
                </tbody>
              )
            })}
          </table>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;