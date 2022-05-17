import { Box, InputLabel, TextField, Select, MenuItem, Typography, Modal } from "@mui/material"
import { FC, useEffect, useState } from "react"
import FormControl from '@mui/material/FormControl';
import { useDispatch, useSelector } from "react-redux";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { addOperation, addStock, calculationBuyStocks, calculationSellStocks, firstTransition } from "../../redux";
import { styleInput, styleModal } from "../../Styles";
import { ButtonComponent } from "../ButtonComponent";

interface InputOperationsProps {
    showInputOperations: boolean;
    handleShowInputOperations: any;
};

export const InputOperations: FC<InputOperationsProps> = ({ showInputOperations, handleShowInputOperations }) => {
    const [values, setValues] = useState({
        stockCode: 'PETR4',
        operationDate: new Date().toISOString().substr(0, 10),
        operationType: 'buy',
        price: 20,
        quantity: 100,
        brokerageFee: 8.50
    });
    const [showButtonAddOperation, setShowButtonAddOperation] = useState(true);
    const transitions = useSelector((state: any) => state.stocks?.transitions);
    const stock = useSelector((state: any) => state.stocks?.stockCode);

    const dispatch = useDispatch();

    useEffect(() => {
        if (stock.length === 0) {
            setShowButtonAddOperation(true);
        } else if (stock.includes(values.stockCode)) {
            setShowButtonAddOperation(true);
        }
    }, [values, transitions, stock]);


    const handleChangeInput = (e: any) => {
        setValues(values => ({ ...values, [e.target.name]: e.target.value }));
    };

    const handleAddOperation = () => {
        dispatch(addOperation(values) as any);

        if (values.operationType === 'buy') {
            dispatch(calculationBuyStocks(transitions[transitions.length - 1], values) as any);
        } else {
            dispatch(calculationSellStocks(transitions[transitions.length - 1], values) as any);
        };

        setValues({
            stockCode: values.stockCode,
            operationDate: new Date().toISOString().substr(0, 10),
            operationType: 'buy',
            price: 20,
            quantity: 100,
            brokerageFee: 8.50
        });

        handleShowInputOperations();
    };

    const checkChangeStock = () => {
        if (stock.length === 0) {
            dispatch(addStock(values.stockCode) as any);
            dispatch(addOperation(values) as any);
            dispatch(firstTransition(values) as any);
            
            handleShowInputOperations();
        } else if (!stock.includes(values.stockCode)) {
            setShowButtonAddOperation(false)
        } else {
            handleAddOperation();
        }
    }

    return (
        <>
            <Modal
                open={showInputOperations}
                onClose={handleShowInputOperations}
                aria-labelledby="Input Operations"
                aria-describedby="Modal for add operation"
            >
                <Box
                    sx={styleModal}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            textAlign: 'center',
                            marginBottom: 2,
                        }}
                    >
                        Adicionar operação
                    </Typography>
                    <Box
                        sx={styleInput}
                    >
                        <TextField
                            type="text"
                            required
                            id="strock-code"
                            label="Código da ação"
                            value={values.stockCode}
                            name="stockCode"
                            onChange={handleChangeInput}
                            helperText={showButtonAddOperation ? "Ex: PETR4, VALE5, etc." : "Caso queira analisar outra ação, por favor, delete todas as operações e inicie novamente"}
                        />
                        <TextField
                            variant="outlined"
                            type="date"
                            name="operationDate"
                            required
                            id="strock-date"
                            label="Data da operação"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={values.operationDate}
                            onChange={handleChangeInput}
                        />
                        <FormControl>
                            <InputLabel id="strock-operation">Operação</InputLabel>
                            <Select
                                labelId="strock-operation"
                                id="strock-operation"
                                value={values.operationType}
                                label="Operação"
                                name="operationType"
                                onChange={handleChangeInput}
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
                            name="price"
                            onChange={handleChangeInput}
                        />
                        <TextField
                            type="number"
                            required
                            id="strock-quantity"
                            label="Quantidade"
                            value={values.quantity}
                            name="quantity"
                            onChange={handleChangeInput}
                        />
                        <TextField
                            type="number"
                            required
                            id="brokerage_fee"
                            label="Taxa de corretagem"
                            value={values.brokerageFee}
                            name="brokerageFee"
                            onChange={handleChangeInput}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            marginTop: 2,
                            gap: 2,
                        }}>
                        <ButtonComponent
                            colorButton={'secondary'}
                            handleOnClick={handleShowInputOperations}
                            textButton={"Cancelar"}
                            variantType={'text'}
                        />
                        <ButtonComponent
                            iconButton={<AddCircleIcon />}
                            handleOnClick={checkChangeStock}
                            textButton={"Adicionar operação"}
                            disabledButton={!showButtonAddOperation}
                        />
                    </Box>
                </Box>
            </Modal>
        </>
    );
};