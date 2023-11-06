'use client';
import { configureStore,  } from "@reduxjs/toolkit";
import counterReducer from './Features/Counter/CounterSlice';
import carouselReducer from "./Features/Data/dataSlice";
import currencyReducer from './Features/Currency/Currency';
import priceChartReducer from './Features/Chartdata/priceSlice';



export const store= configureStore({
    reducer : {
        counter : counterReducer,
        carousel: carouselReducer,
        priceChart: priceChartReducer,
        currencyReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;