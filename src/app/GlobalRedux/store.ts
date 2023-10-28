'use client';
import { configureStore,  } from "@reduxjs/toolkit";
import counterReducer from './Features/Counter/CounterSlice';
import carouselReducer from "./Features/Data/dataSlice";
import currencyReducer from './Features/Currency/Currency';



export const store= configureStore({
    reducer : {
        counter : counterReducer,
        carousel: carouselReducer,
        currencyReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;