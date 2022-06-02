import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import Logo from '../../images/Header/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import briefcase from '../../images/Header/briefcase.svg';
import { getCoinsData } from '../../store/Home/ActionCreator';
import BriefcaseModal from '../BriefcaseModal/BriefcaseModal';


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
            <div className={styles.modal}>
              <BriefcaseModal active={activeModalPage} setActive={setActiveModalPage}>
                <div className={styles.briefcase}>
                  <div className={styles.briefcase_title}>
                    <p className={styles.briefcase_price}>Coins list</p>
                  </div>
                  <div className={styles.coins}>
                    <div className={styles.coins_heading}>Coins</div>
                    <div className={styles.coins_heading}>Quantity</div>
                    <div className={styles.coins_heading}>Price</div>
                    <div className={styles.coins_heading}>Amount</div>
                  </div>
                  <div className={styles.coins}>
                    <div className={styles.coins_items}>Bitcoin</div>
                    <div className={styles.coins_items}>3.4</div>
                    <div className={styles.coins_items}>29756.99</div>
                    <div className={styles.coins_items}>{3.4 * 29756.99}</div>
                    <div className={styles.coins_delete}>-</div>
                  </div>
                  
                </div>
              </BriefcaseModal>
              <div>
                <img src={briefcase} className={styles.icon} alt="briefcase" onClick={handleOnChange} />
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
