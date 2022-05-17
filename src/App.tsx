import { useState } from 'react';
import './App.css';
import { Box, Typography } from '@mui/material';
import { InputOperations } from './components/InputOperations/InputOperations';
import { TableStrocks } from './components/TableStrocks/TableStrocks';
import { ChartStocks } from './components/ChartStocks/ChartStocks';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import { ButtonComponent } from './components/ButtonComponent';
import { useSelector } from 'react-redux';

const App = () => {
  const [showInputOperations, setShowInputOperations] = useState(false);

  const handleShowInputOperations = () => {
    setShowInputOperations(!showInputOperations);
  }

  const transitions = useSelector((state: any) => state.stocks?.transitions);

  return (
    <div className="App">
      <Box sx={{
        borderBottom: '1px solid black',
        padding: 2,
        boxShadow: '3px 3px 2px 1px rgba(0, 0, 0, 0.2)'
      }}>
        <Box
          sx={{
            display: 'flex',
            margin: 'auto',
            width: 'fit-content'
          }}>
          <QueryStatsIcon />
          <Typography
            sx={{
              marginLeft: 1
            }}>
            Calculadora Simplificada de Imposto de Renda para operações na Bolsa
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          maxWidth: 1200,
          margin: 'auto',
          padding: 3,
        }}>
        <Box>
          <Typography
            sx={{
              maxWidth: 1100,
              marginX: 'auto',
              marginY: 3,
              textAlign: 'start'
            }}>
            Imposto de Renda em ações para operações de compra e venda comuns, ou seja, que duram mais de um dia, segue a regra de uma alíquota de 15% sobre o ganho de capital obtido com a venda. Mas o cálculo vai além disso e aqui viemos facilitar as contas para você.<br />
            Clique em "Adicionar operação" para começar.
          </Typography>
          <ButtonComponent
            iconButton={<DomainAddIcon />}
            handleOnClick={handleShowInputOperations}
            textButton={"Adicionar operação"}
          />
          <TableStrocks />
        </Box>
      </Box>
      <InputOperations
        showInputOperations={showInputOperations}
        handleShowInputOperations={handleShowInputOperations}
      />
        <Box>
          <ChartStocks transitions={transitions} />
        </Box>
    </div>
  );
};

export default App;
