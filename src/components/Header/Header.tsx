import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import Logo from '../../images/Header/logo.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import briefcase from '../../images/Header/briefcase.svg';


const Header: FC = () => {
  const navigate = useNavigate();
  const { items } = useSelector((state: RootState) => state.addData);
  const handleOnHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.heading} id='heading'>
      <div className={styles.heading_wrapper}>
        <header className={styles.header}>
          <div className={styles.navigate}>
            <img className={styles.logo} src={Logo} onClick={handleOnHome} alt="Crypto coins"/>
            <nav>
              <ul className={styles.navi}>
                <li className={styles.link}>{`${items![0].symbol} - ${Math.floor(items![0].priceUsd * 100) / 100} $`}</li>
                <li className={styles.link}>{`${items![1].symbol} - ${Math.floor(items![1].priceUsd * 100) / 100} $`}</li>
                <li className={styles.link}>{`${items![2].symbol} - ${Math.floor(items![2].priceUsd * 100) / 100} $`}</li>
                
              </ul>
            </nav>
            <div className={styles.briefcase}>
              <img src={briefcase} className={styles.icon} alt="briefcase" />
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;