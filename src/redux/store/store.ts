import { configureStore } from "@reduxjs/toolkit";
import stocksReducer from '../reducers/stocksReducer';

const store = configureStore({
    reducer: {
        stocks: stocksReducer
    }
});

export default store;