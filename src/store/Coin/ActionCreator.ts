import { createAsyncThunk } from '@reduxjs/toolkit';
import CoinData from '../../api/CoinData';
import DataActionType from './ActionType';

export const getCoinInterval = createAsyncThunk(DataActionType.Get,(id: string | undefined) => {
  return CoinData(id);
});
