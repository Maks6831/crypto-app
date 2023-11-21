import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Data } from "@/app/types/globalTypes";

export const globalData = createAsyncThunk(
    'globalData',
    async (thunkApi) => {
        try{
            const url = 'https://api.coingecko.com/api/v3/global';
            const response = await fetch(url);
            const json = await response.json(); 
            return json;
        } catch (err) {
            throw new Error('global data error');
        }
    } 
)

const initialData: Data = {
    active_cryptocurrencies: null,
    upcoming_icos: 0,
    ongoing_icos: 0,
    ended_icos: 0,
    markets: 0,
    total_market_cap: {},
    total_volume: {},
    market_cap_percentage: {},
    market_cap_change_percentage_24h_usd: 0,
    updated_at: 0,
};



const initialState : {data: Data, loading: boolean, error: string } = {
    data: initialData ,
    loading: false,
    error: '',
}

const globalSlice = createSlice({
    name: 'globalSlice',
    initialState,
    reducers: {},
    extraReducers:builder => {
        builder
      .addCase(globalData.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(globalData.fulfilled, (state, action) => {
        state.data = action.payload.data as Data;
      })
      .addCase(globalData.rejected, (state, action) => {
        state.loading = false;
        
        state.error = action.error.message ?? "An unkown error occurrfetchData"
        console.log(state.error);
    })
    }

})

export default globalSlice.reducer;
