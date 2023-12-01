import { SearchTypes } from "@/app/Utils/searchTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const searchData = createAsyncThunk(
    'searchData',
    async (thunkApi) => {
        try{
            const url = 'https://api.coingecko.com/api/v3/coins/list';
            const response = await fetch(url);
            const json = await response.json(); 
            return json;
        } catch (err) {
            throw new Error('global data error');
        }
    } 
)

const initialState : {data: SearchTypes[], loading: boolean, error: string}= {
    data : [],
    loading: false,
    error : '',
}

const searchSlice = createSlice({
    name: 'globalSlice',
    initialState,
    reducers: {},
    extraReducers:builder => {
        builder
      .addCase(searchData.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(searchData.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(searchData.rejected, (state, action) => {
        state.loading = false;
        
        state.error = action.error.message ?? "An unkown error occurrfetchData"
        console.log(state.error);
    })
    }

})

export default searchSlice.reducer;