import { createAsyncThunk } from '@reduxjs/toolkit';
import CoinsData from '../../api/CoinsData';
import DataActionType from './ActionType';

export const getCoinsData = createAsyncThunk(DataActionType.Get,() => {
  return CoinsData();
});
