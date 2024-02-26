import { createAsyncThunk } from "@reduxjs/toolkit";


export const coinDatePrice = createAsyncThunk(
    'coinDatePrice',
    async ({id, date}: {id:string, date:string} ,thunkApi) => {
        const url = `https://api.coingecko.com/api/v3/coins/${id}/history?date=${date}&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
        const response = await fetch(url);
        const json = await response.json();
        return json;
      }
    );
