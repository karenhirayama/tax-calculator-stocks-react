
import './App.css';
import { Box, Typography } from '@mui/material';
import { InputOperations } from './components/InputOperations/InputOperations';
import { TableStrocks } from './components/TableStrocks/TableStrocks';
import { ChartStocks } from './components/ChartStocks/ChartStocks';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

function App() {

  return (
    <div className="App">
      <Box sx={{
        maxWidth: 1200,
        margin: 'auto',
        padding: 3,
      }}>
        <Box sx={{
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
        <Box sx={{
          display: 'flex',
          flexFlow: 'wrap',
        }}>
          <InputOperations />
          <TableStrocks />
        </Box>
        <Box>
          <ChartStocks />
        </Box>
      </Box>
    </div>
  );
};

export default App;
