import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    coins: ['bitcoin','ethereum']
}

const converterSlice = createSlice({
    name:'converterSlice',
    initialState,
    reducers:{
        changeConverterArray: (state, action)=> {
            state.coins = action.payload
        }
    }
})

export default converterSlice.reducer;
export const {changeConverterArray} = converterSlice.actions;