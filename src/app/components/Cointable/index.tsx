'use client';
import { tableData } from '@/app/GlobalRedux/Features/Tabledata/TableSlice';
import { useAppDispatch, useAppSelector } from '@/app/GlobalRedux/hooks'
import React, { useEffect } from 'react'
import { TableElement } from '../TableElement';
import { TableHeader } from '../TableHeader';

export const Cointable = () => {
  const dispatch = useAppDispatch();
  const { currency } = useAppSelector(state => state.currencyReducer);
  const { coins } = useAppSelector(state => state.tableReducer);

  useEffect(()=>{
    dispatch(tableData(currency));
  },[])
  
  return (
    <div>
      <table className='w-[81rem] border-separate border-spacing-y-5'>
        <TableHeader/>
        <tbody>
          {coins &&
          coins.map((coin, index) => (
            <TableElement
              key={coin.id}
              number={index}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              price={coin.current_price}
              change1h={coin.price_change_percentage_1h_in_currency}
              change24h={coin.price_change_percentage_24h}
              change7d={coin.price_change_percentage_7d_in_currency}
              volume24h={coin.total_volume}
              marketCap={coin.market_cap}
              circulating={coin.circulating_supply}
              totalSupply={coin.total_supply}
              sparkline={coin.sparkline_in_7d.price}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
