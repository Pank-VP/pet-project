import { createReducer } from '@reduxjs/toolkit';
import { ICoinInterval } from '../../api/CoinData';
import { getDataCoin } from './ActionCreator';

export interface IDataState {
  items?: ICoinInterval[];
};

const initialState: IDataState | undefined = {
  items: undefined,
};

export const addDataCoin = createReducer(initialState, (builder) => {
  builder.addCase(getDataCoin.fulfilled, (state, action) => {
    state.items = action.payload
  });
});
