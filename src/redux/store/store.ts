import { configureStore } from "@reduxjs/toolkit";
import stocksReducer from "../Reducers/stocksReducer";

const store = configureStore({
    reducer: {
        stocks: stocksReducer
    }
});

export default store;