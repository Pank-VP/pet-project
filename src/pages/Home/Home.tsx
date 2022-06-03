import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageLayout from '../../components/PageLayout/PageLayout';
import Pagination from '../../components/Paginator/Pagination';
import { getCoinsData } from '../../store/Home/ActionCreator';
import type { AppDispatch, RootState } from '../../store/store';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Home.module.scss';
import Tooltip from '../../components/Tooltip/Tooltip';
import AddCoin from '../../components/BriefcaseModal/BriefcaseAddCoins/BriefcaseAddCoins';

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [activeModal, setActiveModal] = useState(false);
  const [coin, setCoin] = useState<string | undefined>(undefined);
  const { items, currentPage, coinsPerPage } = useSelector((state: RootState) => state.addAllCoins);

  useEffect(() => {
    dispatch(getCoinsData())
  }, [dispatch]);

  const lastCoinsIndex = currentPage * coinsPerPage;
  const firstCoinsIndex = lastCoinsIndex - coinsPerPage;

  const handleOnClick = (id: string | undefined): void => {
    navigate(`/coin/${id}`)
  };

  const handleFormAdd = (event: React.MouseEvent<HTMLSpanElement>) => {
    setActiveModal(true)
    setCoin(event.currentTarget.dataset.id)
  }

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
                <th className={styles.table_title}></th>
              </tr>
            </tbody>
            {items && items.slice(firstCoinsIndex, lastCoinsIndex).map((item) => {
              return (
                <tbody>
                  <tr className={styles.table_row} key={item.id} onClick={() => handleOnClick(item.id)}>
                    <td className={styles.table_name}>{item.name}</td>
                    <td className={clsx(Math.sign(item.changePercent24Hr) === -1 || -0 ? styles.red : styles.green)}>
                      {Math.floor(item.priceUsd * 100) / 100} $
                    </td>
                    <td className={clsx(Math.sign(item.changePercent24Hr) === -1 || -0 ? styles.red : styles.green)}>
                      {Math.floor(item.changePercent24Hr * 100) / 100} %
                    </td>
                    <td>{Math.floor(item.marketCapUsd / 1000000) / 1000} B</td>
                    <td className={styles.table_add} onClick={(event) => event.stopPropagation()}>
                      {/* <button className={styles.table_add_coin}>+</button> */}
                      <Tooltip content='Add in case'>
                        <div className={styles.table_add_coin} data-id={item.id} onClick={(event) => handleFormAdd(event)}>+</div>
                      </Tooltip>
                    </td>
                  </tr>
                </tbody>
                )
              })}
          </table>
          <Pagination />
          <AddCoin activeModal={activeModal} setActiveModal={setActiveModal} coins={items} coinId={coin}/>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
