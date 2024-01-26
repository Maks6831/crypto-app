import { ConverterData, ConverterObject, ConverterTypes, converterObjects } from "@/app/types/ConverterData";
import { GetState } from "@/app/types/GetState";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { elementExtractor } from "@/app/Utils/elementsExtractor";

export const converterData = createAsyncThunk(
    'converterData',
    async({currency, array, days}: {currency: string, array: string[], days: number}, { getState }) =>{
        const currentState = getState() as GetState;
        const { data } = currentState.converterReducer;
        const objectArray: ConverterObject[] = await Promise.all(array.map(async (id, index) => {
            const objectIndex = data.findIndex(currentObj => currentObj.id === id && currentObj.time === days);
            if (objectIndex === -1) {
                const url = `https://api.coingecko.com/api/v3/coins/${array[index]}/market_chart?vs_currency=${currency}&days=${days}&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY_TWO}`;
                const response = await fetch(url);
                const json: ConverterData = await response.json();
                return { id: array[index], time: days, data: json };
            } else {
                return data[objectIndex];
            }
        }));
       return objectArray;
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
        const array = action.payload;
        const stateData : ConverterObject[] = current(state.data);
        array.forEach(obj=> {
            const objectIndex = stateData.findIndex(currentObj => currentObj.time === obj.time && currentObj.id === obj.id);
            if(objectIndex === -1){
                state.data.push(obj);
            }
        })
        
        const [pricesOne, pricesTwo] = array.map(elementExtractor('prices', 1));
        const labels  = array.filter((obj, index) => index === 0).map(elementExtractor('prices', 0)).flat();
        const prices = pricesOne?.reduce((array: number[], priceOne: number, index: number) => {
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