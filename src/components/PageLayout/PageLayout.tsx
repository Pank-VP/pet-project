import { FC } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

type Props = {
  children?: React.ReactNode
};

const PageLayout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default PageLayout;
