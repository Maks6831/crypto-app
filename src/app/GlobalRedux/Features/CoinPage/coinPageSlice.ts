'use client';

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const coinPageData = createAsyncThunk(
    'coinPageData',
    async ({currency, amount}:
      {currency: string, amount: string}, thunkApi) => {
        const url = `https://api.coingecko.com/api/v3/coins/shiba-inu?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
        const response = await fetch(url);
        const json = await response.json();
        return json;
      }
    );