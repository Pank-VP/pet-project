export interface ILocalStorageCoin{
  id: string;
  name: string;
  price: number;
  percent: number;
  amount: number;
  total: number;
}

export const getCoinsFromLocalStorage = ():ILocalStorageCoin[] | [] => {
  const LS_KEY = 'coinsArray';
  const data = localStorage.getItem(LS_KEY);

  if(data) return JSON.parse(data);

  localStorage.setItem(LS_KEY, JSON.stringify([]));

  return [];
};

export const addCoinsLocalStorage = (data: any) => {
  const oldData = getCoinsFromLocalStorage();

  localStorage.setItem('coinsArray', JSON.stringify([...oldData, data]));
};
