import { SearchTypes, Coin } from "@/app/types/searchTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const searchData = createAsyncThunk(
    'searchData',
    async (query: string, thunkApi) => {
        try{
            const url = `https://api.coingecko.com/api/v3/search?query=${query}&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
            const response = await fetch(url);
            const json = await response.json(); 
            return json;
        } catch (err: any) {
            console.error('Search data error:', err.message);
            throw new Error('search data error');
        }
    } 
)

const initialState : {data: Coin[], loading: boolean, error: string}= {
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
        state.loading = false;
        console.log('happening');
        state.data = action.payload.coins;
        console.log(action.payload);
      })
      .addCase(searchData.rejected, (state, action) => {
        state.loading = false;
        
        state.error = action.error.message ?? "An unkown error occurrfetchData"
        console.log(state.error);
    })
    }

})

export default searchSlice.reducer;