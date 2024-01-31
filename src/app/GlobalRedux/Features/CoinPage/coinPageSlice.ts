'use client';

import { CoinPageType, coinPage } from "@/app/types/CoinPageTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const coinPageData = createAsyncThunk(
    'coinPageData',
    async (coin:string , thunkApi) => {
        const url = `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
        const response = await fetch(url);
        const json: CoinPageType = await response.json();
        return json;
      }
    );

    const initialState : {data: CoinPageType, loading: boolean, error: string } = {
        data: coinPage ,
        loading: false,
        error: '',
    }


    const coinPageSlice = createSlice({
        name: 'coinPageSlice',
        initialState,
        reducers:{
          },
        extraReducers:builder => {
            builder
          .addCase(coinPageData.pending, (state, action) => {
            state.loading = true;
            state.error = "";
          })
          .addCase(coinPageData.fulfilled, (state, action) => {
            state.data = action.payload as CoinPageType;
          })
          .addCase(coinPageData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? "An unkown error occurrfetchData"
        })
        }
    })

    export default coinPageSlice.reducer;
    