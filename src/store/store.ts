import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { addCoinInterval } from './Coin/Reducers';
import { addAllCoins } from './Home/Reducers';

const store = configureStore({
  reducer: {
    addAllCoins: addAllCoins,
    addCoinInterval: addCoinInterval,
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;
