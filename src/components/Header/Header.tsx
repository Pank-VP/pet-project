import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import Logo from '../../images/Header/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import briefcase from '../../images/Header/briefcase.svg';
import { getCoinsData } from '../../store/Home/ActionCreator';
import CaseCoins from '../BriefcaseModal/BriefcaseCoins/BriefcaseCoin';
import clsx from 'clsx';
import { round } from 'lodash';
import { caseCounter, caseDifference } from '../Utilits/BriefcaseCounter';
import { casePercent } from '../Utilits/caseCounter';


const Header: FC = () => {
  const navigate = useNavigate();
  const [activeModalPage, setActiveModalPage] = useState(false);
  const { items } = useSelector((state: RootState) => state.addAllCoins);
  const dispatch = useDispatch<AppDispatch>();
  const handleOnHome = () => {
    navigate('/');
  };

  const handleOnClick = (id: string | undefined): void => {
    navigate(`/coin/${id}`)
  };

  useEffect(() => {
    dispatch(getCoinsData());
  }, []);

  const handleOnChange = () => {
    setActiveModalPage(true);
  };


  return (
    <div className={styles.heading} id='heading'>
      <div className={styles.heading_wrapper}>
        <header className={styles.header}>
          <div className={styles.navigate}>
            <img className={styles.logo} src={Logo} onClick={handleOnHome} alt="Crypto coins"/>
            <nav>
              {!items && (
                <ul className={styles.navi}>
                  <li className={styles.link}>{`BTC - 0 $`}</li>
                  <li className={styles.link}>{`ETH - 0 $`}</li>
                  <li className={styles.link}>{`USDT - 0 $`}</li>
                </ul>
              )}
              <ul className={styles.navi}>
                {items && items.slice(0, 3).map((item) => {
                  return (
                      <li
                        key={item.id}
                        className={styles.link}
                        onClick={() => handleOnClick(item.id)}
                      >
                          {`${item.symbol} - ${Math.floor(item.priceUsd * 100) / 100} $`}
                      </li>
                    )
                  })}
              </ul>
            </nav>
            <div className={styles.modal} onClick={handleOnChange}>
              <CaseCoins activeModalPage={activeModalPage} setActiveModalPage={setActiveModalPage} />
              <div className={styles.modal_cont}>
                <img src={briefcase} className={styles.icon} alt="briefcase" />
                <div className={styles.case_subtitle}>
                  <span className={styles.case_header}>My Briefcase</span>
                  <div className={styles.case_rigft}>
                    <span className={styles.case_item}>{caseCounter()} USD</span>
                    <span
                      className={clsx(styles.case_item, Math.sign(casePercent()) === -1 || -0 ? styles.red : styles.green)}
                    >
                      &nbsp;
                      {Math.sign(casePercent()) !== -1 || -0 ? '+' : ''}
                      {round(casePercent(), 4)}
                      &nbsp;
                    </span>
                    <span
                      className={clsx(styles.case_item, Math.sign(casePercent()) === -1 || -0 ? styles.red : styles.green)}
                    >
                      ({caseDifference(items)} %)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
