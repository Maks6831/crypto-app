'use client';
import { useAppSelector } from '@/app/GlobalRedux/hooks';
import { moneyConverter} from '@/app/Utils/moneyConverter';
import { timeFormatter } from '@/app/Utils/timeFormatter';
import React from 'react'

export const CoinInfoContainer = ({ isPrice } : { isPrice : boolean}) => {
    const { coinName } = useAppSelector(state => state.coinReducer);
    const { prices, market_caps } = useAppSelector(state => state.priceChart);
    const { symbol } = useAppSelector(state => state.currencyReducer);

    

  return (
    <div className='absolute left-6 top-6'>
        <div className='font-normal pb-2 mb-3 text-xl leading-6 text-light-text-color-two dark:text-card-text-gray '>{isPrice ? coinName : 'Volume 24h' }</div>
        <div className='font-bold text-3xl mb-2 leading-7 text-light-text-color-three dark:text-white'>{symbol}{isPrice ?moneyConverter(+prices[prices.length-1])  :moneyConverter(market_caps[market_caps.length-1])}</div>
        <div className='font-normal text-base text-light-text-color '>{timeFormatter(new Date())}</div>
    </div>
  )
}
