import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Footer.module.scss';
import Logo from '../../images/Footer/bitcoin.svg';

const Footer: FC = () => {
  const navigate = useNavigate();
  const handleOnHome = () => {
    navigate('/');
  };

  return (
    <footer className={styles.footer}>
		  <div className={styles.wrapper}>
        <div className={styles.navigate}>
          <a href='#heading'>
            <img className={styles.logo} src={Logo} onClick={handleOnHome} alt="Crypto coins"/>
          </a>
        </div>
		  </div>
    </footer>
  );
};

export default Footer;
