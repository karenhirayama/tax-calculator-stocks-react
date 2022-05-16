import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { DeleteOperations } from '../DeleteOperations/DeleteOperations';
import { OperationProps } from '../../Interfaces';


export const TableStrocks = () => {
    const operations = useSelector((state: any) => state.stocks?.operations);

    return (
        <Box sx={{
            marginX: 'auto',
            marginY: 5,
        }}>
            <Typography>Operações</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Código da ação</TableCell>
                            <TableCell align="center">Data da operação</TableCell>
                            <TableCell align="center">Operação</TableCell>
                            <TableCell align="center">Preço (R$)</TableCell>
                            <TableCell align="center">Quantidade</TableCell>
                            <TableCell align="center">Taxa de Corretagem</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {operations?.map(({ stockCode, operationDate, operationType, price, quantity, brokerageFee
                        }: OperationProps, index: number) => (
                            <TableRow key={index}>
                                <TableCell align="center">{stockCode}</TableCell>
                                <TableCell align="center">{operationDate}</TableCell>
                                <TableCell align="center">{operationType === 'buy' ? "Compra" : "Venda"}</TableCell>
                                <TableCell align="center">{price}</TableCell>
                                <TableCell align="center">{quantity}</TableCell>
                                <TableCell align="center">{brokerageFee}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <DeleteOperations operations={operations} />
        </Box>
    );
};