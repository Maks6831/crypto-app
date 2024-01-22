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
    <div className='absolute p-2 left-2 top-2 md:left-6 md:top-6 flex md:block justify-between  w-11/12'>
        <div className='font-normal pb-2 lg:mb-3 text-xs sm:text-base md:text-lg lg:text-xl leading-6 text-light-text-color-two dark:text-card-text-gray '>{isPrice ? coinName : 'Volume 24h' }</div>
        <div className=''>
          <div className='font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 leading-7 text-light-text-color-three dark:text-white'>{symbol}{isPrice ?moneyConverter(+prices[prices.length-1], 3)  :moneyConverter(market_caps[market_caps.length-1],3)}</div>
          <div className='font-normal text-xs md:text-sm lg:text-base text-light-text-color '>{timeFormatter(new Date())}</div>
        </div>
    </div>
  )
}
