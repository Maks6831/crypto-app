'use client';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MarketData } from "../../../types/MarketData";
import { TableData } from "@/app/types/TableData";


export const fetchData = createAsyncThunk(
    'fetchData',
    async(currency : string)=> {
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
        const response = await fetch(url);
        const json = await response.json();
        return json;
    }
)

const initialState :{coins: TableData[], loading: boolean, error: string} = {
    coins: [],
    loading: false,
    error: ''
}

const carouselSlice = createSlice({
    name: 'carousel',
    initialState,
    reducers: {},
    extraReducers : builder => {
        builder
      .addCase(fetchData.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload;
        
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An unkown error occurrfetchData"
    })
    }
})

export default carouselSlice.reducer;