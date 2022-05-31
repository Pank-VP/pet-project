import axios from 'axios';

export interface ICoinsData {
  id: string;
  rank: number;
  symbol: string;
  name: string;
  supply: number;
  maxSupply: number;
  marketCapUsd: number;
  volumeUsd24Hr: number;
  priceUsd: number;
  changePercent24Hr: number;
  vwap24Hr: number;
  explorer: string;
}

const CoinsData = async (): Promise<ICoinsData[]> => {
  const response = await axios.get('https://api.coincap.io/v2/assets');
  
  return response.data.data;
};

export default CoinsData;