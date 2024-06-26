'use client';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const priceChart = createAsyncThunk(
    'priceChart',
    async({currency, coinId, days}: {currency: string, coinId: string, days: string}, thunkAPI) =>{
        const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
        const response = await fetch(url);
        const json = await response.json();
        return json;
    }
)

const initialState = {
    days: '180',
    market_caps: [],
    coinInfo: [],
    labelsTwo: [],
    labels: [],
    prices: [],
    loading: false,
    error: ''
}

const priceChartSlice = createSlice({
    name: 'priceChart',
    initialState,
    reducers: {
      setDays: (state, action) => {
        state.days = action.payload;
      },
      setPrices: (state, action) => {
        state.prices = action.payload
      },
      setLabels: (state, action) => {
        state.labels = action.payload
      },
    },
    extraReducers : builder => {
        builder
      .addCase(priceChart.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(priceChart.fulfilled, (state, action) => {
        state.loading = false;
        state.coinInfo = action.payload;
        const {prices, market_caps, total_volumes } = action.payload; 
        state.labels = prices.map((arr: [number, number]) =>arr[0]); 
        state.prices = prices.map((arr: [number, number]) => arr[1]);
        state.labelsTwo = total_volumes.map((arr: [number, number]) => arr[0]);
        state.market_caps = total_volumes.map((arr: [number, number]) => arr[1]);

      }) 
      .addCase(priceChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An unkown error occurrfetchData"
    })
    }
   
})


export const { setDays, setLabels, setPrices } = priceChartSlice.actions;
export default priceChartSlice.reducer;