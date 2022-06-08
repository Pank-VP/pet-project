import { createReducer } from '@reduxjs/toolkit';
import { ICoinsData } from '../../api/AllCoinsData';
import { getCoinsData, setCurrentPage } from './ActionCreator';

export interface IDataCoins {
  items?: ICoinsData[];
  currentPage: number;
  coinsPerPage: number;
  totalCount: number;
};

const initialState: IDataCoins | undefined = {
  items: undefined,
  currentPage: 1,
  coinsPerPage: 10,
  totalCount: 0,
};

export const addAllCoins = createReducer(initialState, (builder) => {
  builder.addCase(getCoinsData.fulfilled, (state, action) => {
    state.items = action.payload
    state.coinsPerPage = 10
    state.totalCount = action.payload.length
  });

  builder.addCase(setCurrentPage, (state, action) => {
    state.currentPage = action.payload.page
  })
});
