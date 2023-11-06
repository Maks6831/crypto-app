'use client';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const priceChart = createAsyncThunk(
    'priceChart',
    async({currency, coinId}: {currency: string, coinId: string}) =>{
        const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=180&interval=daily`;
        const response = await fetch(url);
        const json = await response.json();
        return json;
    }
)

const initialState = {
    prices: [],
    loading: false,
    error: ''
}

const priceChartSlice = createSlice({
    name: 'priceChart',
    initialState,
    reducers: {},
    extraReducers : builder => {
        builder
      .addCase(priceChart.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(priceChart.fulfilled, (state, action) => {
        state.loading = false;
        state.prices = action.payload;
      })
      .addCase(priceChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An unkown error occurrfetchData"
    })
    }
   
})