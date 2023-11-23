'use client';

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TableData } from "@/app/types/TableData";

export const tableData = createAsyncThunk(
    'tableData',
    async ({currency, amount}:
      {currency: string, amount: string}, thunkApi) => {
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${amount}&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
        const response = await fetch(url);
        const json = await response.json();
        return json;
      }
    );

const initialState: {coins: TableData[], amount:string, loading: boolean, error: string} = {
    coins : [],
    amount: '20',
    loading: false,
    error:''
}

const tableSlice = createSlice({
    name: 'tableSlice',
    initialState,
    reducers:{
      changeAmount : (state, action) => {
        state.amount = action.payload;
      }
    },
    extraReducers:builder => {
        builder
      .addCase(tableData.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(tableData.fulfilled, (state, action) => {
        state.coins = action.payload as TableData[];
      })
      .addCase(tableData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An unkown error occurrfetchData"
    })
    }
})

export const { changeAmount } = tableSlice.actions;
export default tableSlice.reducer;
