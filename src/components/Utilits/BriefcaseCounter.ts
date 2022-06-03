import { sum } from 'lodash';
import { ICoinsData } from '../../api/AllCoinsData';
import { getCoinsFromLocalStorage } from './GetCoinsToLocalStorage';

export const caseCounter = () => {
  const sumCoins: number[] = [];
  getCoinsFromLocalStorage().map((item) => sumCoins.push(item.total))

  return Math.floor(sum(sumCoins) * 100) / 100
};

export const caseRercent = () => {
  const sumCoins: number[] = [];
  getCoinsFromLocalStorage().map((item) => sumCoins.push(item.percent))

  return Math.floor(sum(sumCoins) * 100) / 100
};

export const caseDifference = (array: ICoinsData[] | undefined) => {
  const data = getCoinsFromLocalStorage();
  let num = 0;
  array?.map((item) => {
    data.map((local) => {
      if(item.id === local.id) {
        num = (100 * (item.priceUsd - local.price) / local.price)
      }
    })
  })

  return Math.floor(num * 100) / 100
};

