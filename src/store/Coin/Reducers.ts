import { createReducer } from '@reduxjs/toolkit';
import { ICoinInterval } from '../../api/CoinData';
import { getCoinInterval } from './ActionCreator';

export interface IDataInterval {
  interval?: ICoinInterval[];
};

const initialState: IDataInterval | undefined = {
  interval: undefined,
};

export const addCoinInterval = createReducer(initialState, (builder) => {
  builder.addCase(getCoinInterval.fulfilled, (state, action) => {
    state.interval = action.payload
  });
});
