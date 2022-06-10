import axios from 'axios';

export interface ICoinInterval {
  priceUsd: number;
  time: Date;
  date: Date;
}

const CoinData = async (id: string | undefined): Promise<ICoinInterval[]> => {
  const response = await axios.get(`assets/${id}/history?interval=d1`);
  
  return response.data.data;
};

export default CoinData;
