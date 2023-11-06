'use client';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const priceChart = createAsyncThunk(
    'priceChart',
    async({currency, coinId}: {currency: string, coinId: string}, thunkAPI) =>{
        const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=180&interval=daily`;
        const response = await fetch(url);
        const json = await response.json();
        return json;
    }
)

const initialState = {
    labels: [],
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
        console.log(action.payload);
        const {prices} = action.payload;
        state.labels = prices.map((arr: [number, number]) => new Date(arr[0]));
        state.prices = prices.map((arr: [number, number]) => arr[1]);
      })
      .addCase(priceChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An unkown error occurrfetchData"
    })
    }
   
})

export default priceChartSlice.reducer;