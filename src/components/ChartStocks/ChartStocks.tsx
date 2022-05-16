import { FC, useEffect, useState } from 'react';
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
import 'chart.js/auto'
import { Box, Typography } from '@mui/material';

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


export const ChartStocks: FC<any> = ({ transitions }) => {
  const [data, setData] = useState({
    labels: '',
    datasets: []
  });


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
    <Box
      sx={{
        margin: 3
      }}
    >
      <Typography>
        Transações
      </Typography>
      <Chart type='bar' options={options} data={data as any} />
      <Box
      sx={{
        marginTop: 4,
        marginX: 2,
        textAlign: 'start'
      }}>
        <Typography>
          Dicas para utilizar o gráfico:
        </Typography>
        <ul>
          <li>
            Você pode clicar em um dos rótulos para retirá-lo do gráfico, podendo facilitar a leitura. Para retornar o rótulo, basta clicar nele novamente.
          </li>
          <li>
            Os valores de "Resultado Auferido", "Prejuízo Acumulado" e "Imposto de Renda" serão apresentados somente em operações de venda.
          </li>
        </ul>
      </Box>
    </Box>
  )
}
