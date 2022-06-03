import { round, sum } from 'lodash';
import { ICoinsData } from '../../api/AllCoinsData';
import { getCoinsFromLocalStorage } from './GetCoinsToLocalStorage';

export const caseCounter = () => {
  const sumCoins: number[] = [];
  getCoinsFromLocalStorage().map((item) => sumCoins.push(item.total))

  return round(sum(sumCoins), 2);
};

export const casePercent = () => {
  const sumCoins: number[] = [];
  getCoinsFromLocalStorage().map((item) => sumCoins.push(item.percent))

  return round(sum(sumCoins), 2);
};

export const caseDifference = (array: ICoinsData[] | undefined) => {
  const data = getCoinsFromLocalStorage();
  let num = 0;
  let arr: number[] = [];
  array?.map((item) => {
    data.map((local) => {
      if(item.id === local.id){
        num = (100 * (item.priceUsd - local.price)/local.price)
        arr.push(num);
      }
    })
  })
  return round(sum(arr), 3)
};
