import { DatePriceObj, DatePriceType } from "@/app/types/DatePriceTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const coinDatePrice = createAsyncThunk(
    'coinDatePrice',
    async ({id, date, amount}: {id:string, date:string, amount:number} ,thunkApi) => {
        const url = `https://api.coingecko.com/api/v3/coins/${id}/history?date=${date}&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
        const response = await fetch(url);
        const json: DatePriceType = await response.json();
        return json;
      }
    );

    const storedData = typeof window !== 'undefined' ? window.localStorage.getItem('dataCoinPrices') : null;
    const dataPrices = storedData !== null ? JSON.parse(storedData) : [];

    const initialState : {data: DatePriceObj[], loading: boolean, error: string}  = {
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
        const {id, amount, date} = action.meta.arg;
        const refactoredObj :DatePriceObj = Object.assign({}, action.payload, {
          id: id,
          amount:amount,
          date: date,
        });
        state.data.push(refactoredObj);
      })
      .addCase(coinDatePrice.rejected, (state, action) => {
        state.loading = false;
        
        state.error = action.error.message ?? "An unkown error occurrfetchData"
        console.log(state.error);
    })
    }
    })

    export default coinDatePriceSlice.reducer;
