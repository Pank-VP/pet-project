import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Coin from './pages/Coin/Coin';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFoud';

const App: FC = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/coin/:id" element={<Coin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
