import React, { FC } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import moment from 'moment';
import { ICoinInterval } from '../../api/CoinData';

interface IChart {
  data: ICoinInterval[] | undefined;
}

const Chart:FC<IChart> = ({ data }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  );
  return (
    <Line
      data={{
        labels: data?.map(coin => moment(coin.date).format('DD MMM')),
        datasets: [
          {
            data: data?.map(coin => coin.priceUsd),
            borderColor: "#0d889c",
            pointBackgroundColor: 'black',
            label: `Price ( Past 1 Month ) in USD` ,
          }
        ]
      }}
    />
  );
}

export default Chart;
