import { DatePriceObj, DatePriceType } from "@/app/types/DatePriceTypes";
import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { reject } from "lodash";

export interface DatePriceAttributes {
  id:string;
  date:string;
  amount:number;
  uid: string;
}

interface MyKnownError {
  errorMessage: string
}

export const coinDatePrice = createAsyncThunk<
DatePriceObj,
DatePriceAttributes,
{
  rejectValue: MyKnownError,
}
>(
    'coinDatePrice',
    async ({id, date, amount, uid} ,thunkApi) => {
        const url = `https://api.coingecko.com/api/v3/coins/${id}/history?date=${date}&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
        const response = await fetch(url);
        const json: DatePriceType = await response.json();
        if(json.hasOwnProperty('market_data')){
          const refactoredObj :DatePriceObj = Object.assign({}, json, {
            id: id,
            amount:amount,
            date: date,
            uid: uid
          });
          return refactoredObj;
        } else {
          return thunkApi.rejectWithValue({errorMessage :'Requested date is too early for currency data' } as MyKnownError) 
        }
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
        state.error='';
        if(typeof action.payload !== 'boolean'){
          const indexIfObjectIsEdit = state.data.findIndex(obj => obj.uid === action.payload.uid) 
          indexIfObjectIsEdit === -1 ? state.data.unshift(action.payload): state.data[indexIfObjectIsEdit] = action.payload;
        }
      })
      .addCase(coinDatePrice.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.errorMessage
        } else {
          state.error = action.error.message ?? "An unkown error occurrfetchDatePrice"
        }
    })
    }
    })
    
    export const { deleteCoin } = coinDatePriceSlice.actions;
    export default coinDatePriceSlice.reducer;
