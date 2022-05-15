import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { DeleteOperations } from '../DeleteOperations/DeleteOperations';


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
                            <TableCell align="center">Data da operação</TableCell>
                            <TableCell align="center">Operação</TableCell>
                            <TableCell align="center">Preço (R$)</TableCell>
                            <TableCell align="center">Quantidade</TableCell>
                            <TableCell align="center">Taxa de Corretagem</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {operations?.map((operation: any, index: any) => (
                            <TableRow key={index}>
                                <TableCell align="center">{operation.operationDate}</TableCell>
                                <TableCell align="center">{operation.operationType === 'buy' ? "Compra" : "Venda"}</TableCell>
                                <TableCell align="center">{operation.price}</TableCell>
                                <TableCell align="center">{operation.quantity}</TableCell>
                                <TableCell align="center">{operation.brokerageFee}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <DeleteOperations operations={operations} />
        </Box>
    );
};