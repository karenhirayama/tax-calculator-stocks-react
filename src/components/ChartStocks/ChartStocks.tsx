import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import 'chart.js/auto'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Transações',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      ticks: {
        callback: function (value: any) {
          return 'R$ ' + value;
        }
      },
    },
  },
};


export const ChartStocks: any = () => {
  const [data, setData] = useState({
    labels: '',
    datasets: []
  });

  const transitions = useSelector((state: any) => state.stocks?.transitions);

  useEffect(() => {

    setData({
      labels: transitions?.map((transition: any) => transition?.operationDate as any),
      datasets: [

        {
          type: 'bar' as const,
          label: 'Quantidade Média',
          data: transitions?.map((transition: any) => transition?.averageQuantity),
          backgroundColor: 'rgb(183, 123, 229)',
        },
        {
          type: 'bar' as const,
          label: 'Preço Médio (R$)',
          data: transitions?.map((transition: any) => transition?.averagePrice),
          backgroundColor: 'rgb(252, 137, 255)',
        },
        {
          type: 'line' as const,
          label: 'Ganho de capital (R$)',
          data: transitions?.map((transition: any) => transition?.capitalGains),
          backgroundColor: 'rgb(45, 172, 58)',
        },
        {
          type: 'bar' as const,
          label: 'Resultado Auferido (R$)',
          data: transitions?.map((transition: any) => transition?.earned),
          backgroundColor: 'rgb(14, 78, 208)',
          stack: 'Stack 1',


        },
        {
          type: 'bar' as const,
          label: 'Prejuízo Acumulado (R$)',
          data: transitions?.map((transition: any) => transition?.accumulatedLoss),
          backgroundColor: 'rgb(245, 20, 20)',
          stack: 'Stack 1',

        },
        {
          type: 'bar' as const,
          label: 'Imposto de Renda (R$)',
          data: transitions?.map((transition: any) => transition?.incomeTax),
          backgroundColor: 'rgb(255, 255, 0)',
          stack: 'Stack 1',

        },
      ] as any,
    });
  }, [transitions]);

  return (
    <div>
      <Chart type='bar' options={options} data={data as any} />;
    </div>
  )
}
