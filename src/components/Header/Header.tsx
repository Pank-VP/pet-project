import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import Logo from '../../images/Header/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import briefcase from '../../images/Header/briefcase.svg';


const Header: FC = () => {
  const navigate = useNavigate();
  const { items } = useSelector((state: RootState) => state.addDataReducers);
  const handleOnHome = () => {
    navigate('/');
  };

  

  const handleOnClick = (id: string | undefined): void => {
    navigate(`/coin/${id}`)
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
            <div className={styles.briefcase} onClick={() => console.log(items)}>
              <img src={briefcase} className={styles.icon} alt="briefcase" />
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;