import { DatePriceObj, DatePriceType } from "@/app/types/DatePriceTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const coinDatePrice = createAsyncThunk(
    'coinDatePrice',
    async ({id, date, amount, uid}: {id:string, date:string, amount:number, uid: string} ,thunkApi) => {
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
    reducers: {
      deleteCoin: (state, action) => {
        const uuid = action.payload;
        const coinToDeleteIndex = state.data.findIndex(obj => obj.uid === uuid)
       state.data.splice(coinToDeleteIndex, 1);
      }
    },
    extraReducers:builder => {
        builder
      .addCase(coinDatePrice.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(coinDatePrice.fulfilled, (state, action) => {
        state.loading = false;
        const {id, amount, date, uid} = action.meta.arg;
        if(action.payload.hasOwnProperty('market_data')){
          const refactoredObj :DatePriceObj = Object.assign({}, action.payload, {
            id: id,
            amount:amount,
            date: date,
            uid: uid
          });
        const indexIfObjectisEdit = state.data.findIndex(obj => obj.uid === uid) 
        indexIfObjectisEdit === -1 ? state.data.push(refactoredObj): state.data[indexIfObjectisEdit] = refactoredObj;
        } else {
          state.error = 'Requested date is too early for currency data';
        }
      })
      .addCase(coinDatePrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An unkown error occurrfetchData"
    })
    }
    })
    
    export const { deleteCoin } = coinDatePriceSlice.actions;
    export default coinDatePriceSlice.reducer;
