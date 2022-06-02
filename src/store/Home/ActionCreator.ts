import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import AllCoinsData from '../../api/AllCoinsData';
import DataActionType from './ActionType';

export const getCoinsData = createAsyncThunk(DataActionType.GetCoins,() => {
  return AllCoinsData();
});

export const setCurrentPage = createAction(DataActionType.SetCurrentPage, (page: number) => {
  return {
    payload: {
      page
    }
  }
});
