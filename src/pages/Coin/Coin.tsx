import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import Chart from '../../components/Chart/Chart';
import PageLayout from '../../components/PageLayout/PageLayout';
import { getCoinInterval } from '../../store/Coin/ActionCreator';
import { getCoinsData } from '../../store/Home/ActionCreator';
import { AppDispatch, RootState } from '../../store/store';
import styles from './Coin.module.scss';


const Coin: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { interval } = useSelector((state: RootState) => state.addCoinInterval);
  const { items } = useSelector((state: RootState) => state.addAllCoins);
  
  useEffect(() => {
    dispatch(getCoinInterval(id))
    dispatch(getCoinsData());
  }, [id, dispatch]);
  
  
  return (
    <PageLayout>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.heading}>
            
          </div>
          {items && items.map((item, index) => {
              if(item.id === id) {
                return (
                  <div className={styles.heading} key={index}>
                    <div className={styles.title}>
                      <div className={styles.title_header}>Price</div>
                      <div className={styles.title_price}>{Math.floor(item.priceUsd * 100) / 100} $</div>
                    </div>
                    <div className={styles.title}>
                      <div className={styles.title_header}>24h changes</div>
                      <div className={styles.title_price}>{Math.floor(item.changePercent24Hr * 100) / 100} %</div>
                    </div>
                    <div className={styles.title}>
                      <div className={styles.title_header}>Marcet Cap</div>
                      <div className={styles.title_price}>{Math.floor(item.marketCapUsd / 1000000) / 1000} B</div>
                    </div>
                  </div>
                )
              }
            })}
          <div className={styles.chart}>
            <Chart data={interval?.slice(0, 30)} />
          </div>
          <span className={styles.button_back} onClick={() => navigate('/')}>Go Back</span>
        </div>
      </div>
    </PageLayout>
  );
};

export default Coin;
