import { createReducer } from '@reduxjs/toolkit';
import { ICoinsData } from '../../api/CoinsData';
import { getCoinsData } from './ActionCreator';

export interface IDataState {
  items?: ICoinsData[];
};

const initialState: IDataState | undefined = {
  items: undefined
};

export const addDataReducers = createReducer(initialState, (builder) => {
  builder.addCase(getCoinsData.fulfilled, (state, action) => {
    state.items = action.payload;
  });
});
