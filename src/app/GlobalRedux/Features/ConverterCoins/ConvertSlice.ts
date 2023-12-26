import { ConverterData, ConverterObject } from "@/app/types/ConverterData";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const converterData = createAsyncThunk(
    'converterData',
    async({currency, array, days}: {currency: string, array: string[], days: number}, thunkAPI) =>{
        const urlOne = `https://api.coingecko.com/api/v3/coins/${array[0]}/market_chart?vs_currency=${currency}&days=${days}&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY_TWO}`;
        const responseOne = await fetch(urlOne);
        const urlTwo = `https://api.coingecko.com/api/v3/coins/${array[1]}/market_chart?vs_currency=${currency}&days=${days}&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY_TWO}`;
        const responseTwo = await fetch(urlTwo);
        const jsonOne : ConverterData = await responseOne.json();
        const jsonTwo : ConverterData = await responseTwo.json();
        const objOne : ConverterObject = {name: array[0], time : days, data : jsonOne};
        const objTwo : ConverterObject = {name: array[1], time : days, data : jsonTwo};
        

        return {objOne, objTwo};
    }
)


const initialState : {coins: string[], symbols: string[], loading: boolean, error: string, data: ConverterObject[] }  = {
    coins: ['bitcoin','ethereum'],
    symbols: ['BTC', 'ETH'],
    loading: false,
    error: '',
    data: []
}

const converterSlice = createSlice({
    name:'converterSlice',
    initialState,
    reducers:{
        changeConverterArray: (state, action)=> {
            state.coins = action.payload
        }
    },
    extraReducers : builder => {
        builder
      .addCase(converterData.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(converterData.fulfilled, (state, action) => {
        const {objOne, objTwo} = action.payload
        const array = [objOne, objTwo];
        array.forEach(obj=> {
            const objectIndex = state.data.findIndex(currentObj => currentObj.name === obj.name)
            if(objectIndex === -1){
                state.data.push(obj);
            }
        })
      })
      .addCase(converterData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An unkown error occurrfetchData"
    })
    }
})

export default converterSlice.reducer;
export const {changeConverterArray} = converterSlice.actions;