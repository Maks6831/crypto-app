'use client';

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk(
    'fetchData',
    async()=> {
        const url = 'https://api.coingecko.com/api/v3/coins/list';
        const response = await fetch(url);
        const json = await response.json();
        return json;
    }
)

const initialState = {
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
        console.log(action.payload);
        
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An unkown error occurrfetchData"
    })
    }
})

export default carouselSlice.reducer;