import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageLayout from '../../components/PageLayout/PageLayout';
import Pagination from '../../components/Paginator/Pagination';
import { getCoinsData } from '../../store/Home/ActionCreator';
import type { AppDispatch, RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.scss';
import Tooltip from '../../components/Tooltip/Tooltip';
import AddCoin from '../../components/BriefcaseModal/BriefcaseAddCoins/BriefcaseAddCoins';
import { textPercent } from '../../components/Utilits/TextPercent';
import { mathFloor, mathFloorBillions } from '../../components/Utilits/MathFloor';

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
                <th className={clsx(styles.table_title, styles.indent)}>Coins</th>
                <th className={clsx(styles.table_title, styles.indent)}>Price $</th>
                <th className={clsx(styles.table_title, styles.indent)}>24h changes  %</th>
                <th className={clsx(styles.table_title, styles.indent)}>Marcet Cap</th>
                <th className={clsx(styles.table_title, styles.indent_last)}></th>
              </tr>
            </tbody>
            {items && items.slice(firstCoinsIndex, lastCoinsIndex).map((item) => {
              return (
                <tbody>
                  <tr className={styles.table_row} key={item.id} onClick={() => handleOnClick(item.id)}>
                    <td className={clsx(styles.table_items, styles.first_child)}>{item.name}</td>
                    <td className={clsx(styles.table_items, textPercent(item.changePercent24Hr), styles.table_items_indent)}>
                      {mathFloor(item.priceUsd)} $
                    </td>
                    <td className={clsx(styles.table_items, textPercent(item.changePercent24Hr), styles.table_items_indent)}>
                      {mathFloor(item.changePercent24Hr)} %
                    </td>
                    <td className={clsx(styles.table_items, styles.table_items_indent)}>{mathFloorBillions(item.marketCapUsd)} B</td>
                    <td className={styles.table_items} onClick={(event) => event.stopPropagation()}>
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
