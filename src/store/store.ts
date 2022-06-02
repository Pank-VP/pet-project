import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { addDataCoin } from './Coin/Reducers';
import { addDataReducers } from './Home/Reducers';

const store = configureStore({
  reducer: {
    addDataReducers: addDataReducers,
    addDataCoin: addDataCoin,
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;
