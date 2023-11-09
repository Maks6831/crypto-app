import { createSlice } from '@reduxjs/toolkit';
import { currencySlice } from '../Currency/Currency';

const initialState = {
    coin : 'bitcoin',
    coinName: 'Bitcoin'
}

const coinSlice = createSlice({
    name: 'coinSlice',
    initialState,
    reducers:{
        changeCoin: (state, action)=> {
            state.coin = action.payload
        },
        changeName: (state, action) => {
            state.coinName = action.payload
        }
    }
})

export default coinSlice.reducer;
export const { changeCoin, changeName } = coinSlice.actions;