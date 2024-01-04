import { ConverterData, ConverterObject, ConverterTypes } from "@/app/types/ConverterData";
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
        console.log(jsonOne.prices.length);
        console.log(jsonTwo.prices.length);

        const objOne : ConverterObject = {id: array[0], time : days, data : jsonOne};
        const objTwo : ConverterObject = {id: array[1], time : days, data : jsonTwo};
        

        return {objOne, objTwo};
    }
)


const initialState : {coins: ConverterTypes[], loading: boolean, error: string, data: ConverterObject[], labels : number[], prices: number[]}  = {
    coins: 
    [{
        id:'bitcoin', 
        name: 'Bitcoin', 
        symbol:'BTC',
        thumb:"https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png"
    },
    {
        id:'ethereum', 
        name: 'Ethereum',
        symbol: 'ETH',
        thumb:"https://assets.coingecko.com/coins/images/279/thumb/ethereum.png"
    }],
    loading: false,
    error: '',
    data: [],
    labels:[],
    prices: [],
}

const converterSlice = createSlice({
    name:'converterSlice',
    initialState,
    reducers:{
        changeArray: (state, action)=> {
           state.coins = action.payload;
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
            const objectIndex = state.data.findIndex(currentObj => currentObj.id === obj.id)
            if(objectIndex === -1){
                state.data.push(obj);
            }
        })
        const pricesOne : number[] = objOne.data.prices.map((arr: [number, number]) =>arr[1]);
        const pricesTwo : number[] = objTwo.data.prices.map((arr: [number, number]) =>arr[1]);
        const labels = objOne.data.prices.map((arr: [number, number]) =>arr[0]);
        const prices = pricesOne.reduce((array: number[], priceOne: number, index: number) => {
        array.push(priceOne / pricesTwo[index]);
        return array;
        },[])
        state.labels = labels;
        state.prices = prices;
      })
      .addCase(converterData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An unkown error occurrfetchData"
    })
    }
})

export default converterSlice.reducer;
export const {changeArray} = converterSlice.actions;