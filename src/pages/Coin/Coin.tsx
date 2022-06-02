import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import Chart from '../../components/Chart/Chart';
import PageLayout from '../../components/PageLayout/PageLayout';
import { getDataCoin } from '../../store/Coin/ActionCreator';
import { getCoinsData } from '../../store/Home/ActionCreator';
import { AppDispatch, RootState } from '../../store/store';
import styles from './Coin.module.scss';


const Coin: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.addDataCoin);
  
  useEffect(() => {
    dispatch(getCoinsData());
    dispatch(getDataCoin(id))
  }, [id, dispatch]);
  
  
  return (
    <PageLayout>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.heading}>
            <div className={styles.title}>
              <div className={styles.title_header}>Price</div>
              <div className={styles.title_price}>123</div>
            </div>
            <div className={styles.title}>
              <div className={styles.title_header}>24h changes</div>
              <div className={styles.title_price}>%</div>
            </div>
            <div className={styles.title}>
              <div className={styles.title_header}>Marcet Cap</div>
              <div className={styles.title_price}>B</div>
            </div>
          </div>
          <div className={styles.chart}>
            <Chart data={items} />
          </div>
          <span className={styles.button_back} onClick={() => navigate(-1)}>Go Back</span>
        </div>
      </div>
    </PageLayout>
  );
};

export default Coin;
