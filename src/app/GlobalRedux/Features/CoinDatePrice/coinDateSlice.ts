import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const coinDatePrice = createAsyncThunk(
    'coinDatePrice',
    async ({id, date}: {id:string, date:string} ,thunkApi) => {
        const url = `https://api.coingecko.com/api/v3/coins/${id}/history?date=${date}&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
        const response = await fetch(url);
        const json = await response.json();
        return json;
      }
    );

    const storedData = localStorage.getItem('dataCoinPrices');
    const dataPrices = storedData !== null ? JSON.parse(storedData) : [];

    const initialState = {
        data : dataPrices,
        loading:false,
        error:''
    }

    const coinDatePriceSlice = createSlice({
    name: 'coinDatePriceSlice',
    initialState,
    reducers: {},
    extraReducers:builder => {
        builder
      .addCase(coinDatePrice.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(coinDatePrice.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
        console.log('hello')
      })
      .addCase(coinDatePrice.rejected, (state, action) => {
        state.loading = false;
        
        state.error = action.error.message ?? "An unkown error occurrfetchData"
        console.log(state.error);
    })
    }
    })

    export default coinDatePriceSlice.reducer;
