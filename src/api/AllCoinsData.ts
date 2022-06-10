import axios from './api';

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

const AllCoinsData = async (): Promise<ICoinsData[]> => {
  const response = await axios.get('assets/');
  
  return response.data.data;
};

export default AllCoinsData;
