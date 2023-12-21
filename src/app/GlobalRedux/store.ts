'use client';
import { configureStore,  } from "@reduxjs/toolkit";
import counterReducer from './Features/Counter/CounterSlice';
import carouselReducer from "./Features/Data/dataSlice";
import currencyReducer from './Features/Currency/Currency';
import priceChartReducer from './Features/Chartdata/priceSlice';
import coinReducer from './Features/CurrentCoin/coinSlice';
import tableReducer from './Features/Tabledata/TableSlice';
import globalReducer from './Features/GlobalData/globalSlice';
import searchReducer from './Features/SearchData/searchSlice';
import converterReducer from './Features/ConverterCoins/ConvertSlice';


export const store= configureStore({
    reducer : {
        counter : counterReducer,
        carousel: carouselReducer,
        priceChart: priceChartReducer,
        currencyReducer,
        coinReducer,
        tableReducer,
        globalReducer,
        searchReducer,
        converterReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;