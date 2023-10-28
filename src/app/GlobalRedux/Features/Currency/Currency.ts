'use client';

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currency : 'usd',
}


export const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        changeCurr: (state, action) => {
            state.currency = action.payload
        }
    }
})

export const { changeCurr } = currencySlice.actions;

export default currencySlice.reducer;