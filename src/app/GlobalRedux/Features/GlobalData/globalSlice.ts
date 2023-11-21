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



const initialState : {data: Data[], loading: boolean, error: string } = {
    data: [],
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
        state.data = action.payload as Data[];
      })
      .addCase(globalData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An unkown error occurrfetchData"
    })
    }

})

export default globalSlice.reducer;
