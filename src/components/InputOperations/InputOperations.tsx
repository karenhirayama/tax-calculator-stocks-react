import { InputLabel, TextField, Select, MenuItem, Button, Typography } from "@mui/material"
import { useState } from "react"
import FormControl from '@mui/material/FormControl';
import { InputBox, InputContainer } from './InputOperationStyles';
import { useDispatch, useSelector } from "react-redux";
import { calculationBuyStocks, calculationSellStocks, firstTransition, addOperation } from '../../redux/actions/stocksActions';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export const InputOperations = () => {
    const [values, setValues] = useState({
        operationDate: new Date().toISOString().substr(0, 10),
        operationType: 'buy',
        price: 0,
        quantity: 100,
        brokerageFee: 8.50
    });

    const transitions = useSelector((state: any) => state.stocks?.transitions);

    const dispatch = useDispatch();

    const handlePushData = () => {
        dispatch(addOperation(values) as any);

        if (transitions.length === 0) {
            dispatch(firstTransition(values) as any);
        } else if (values.operationType === 'buy') {
            dispatch(calculationBuyStocks(transitions[transitions.length - 1], values) as any);
        } else {
            dispatch(calculationSellStocks(transitions[transitions.length - 1], values) as any);
        };

        setValues({
            operationDate: new Date().toISOString().substr(0, 10),
            operationType: 'buy',
            price: 0,
            quantity: 100,
            brokerageFee: 8.50
        });
    };

    return (
        <InputContainer>
             <Typography sx={{
                margin: 2
            }}>
                Campo para adicionar operação
            </Typography>
            <InputBox>
                <TextField
                    variant="outlined"
                    type="date"
                    required
                    id="strock-date"
                    label="Data da operação"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={values.operationDate}
                    onChange={(e: any) => setValues(values => ({ ...values, operationDate: e.target.value }))}
                />
                <FormControl>
                    <InputLabel id="strock-operation">Operação</InputLabel>
                    <Select
                        labelId="strock-operation"
                        id="strock-operation"
                        value={values.operationType}
                        label="Operação"
                        onChange={(e: any) => setValues(values => ({ ...values, operationType: e.target.value }))}
                    >
                        <MenuItem value={'buy'}>Compra</MenuItem>
                        <MenuItem value={'sell'}>Venda</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    type="number"
                    required
                    id="strock-price"
                    label="Preço"
                    value={values.price}
                    onChange={(e: any) => setValues(values => ({ ...values, price: Number(e.target.value) }))}
                />
                <TextField
                    type="number"
                    required
                    id="strock-quantity"
                    label="Quantidade"
                    value={values.quantity}
                    onChange={(e: any) => setValues(values => ({ ...values, quantity: Number(e.target.value) }))}
                />
                <TextField
                    type="number"
                    required
                    id="brokerage_fee"
                    label="Taxa de corretagem"
                    value={values.brokerageFee}
                    onChange={(e: any) => setValues(values => ({ ...values, brokerageFee: Number(e.target.value) }))}
                />
            </InputBox>
            <Button variant="outlined" onClick={(e: any) => handlePushData()}
                sx={{
                    marginY: 5,
                    marginX: 'auto',
                    width: 'fit-content'
                }}
                startIcon={<AddCircleIcon />}
            >
                Adicionar operação
            </Button>
        </InputContainer>
    );
};