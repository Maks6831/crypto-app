import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/app/GlobalRedux/hooks'
import { changeCoin, changeName } from '@/app/GlobalRedux/Features/CurrentCoin/coinSlice'
import { percentFormatter } from '@/app/Utils/percentFormatter'
import { useTheme } from 'next-themes'
import { colorChange } from '@/app/Utils/colorChange'

export const CarouselCard = (
  {index, symbol, name, percentageChange, currentPrice, source, carIndex, coinKey} :
   {index: number, symbol: string, name: string, percentageChange: number, currentPrice: number, source: string, carIndex: number, coinKey: string}
   ) => {
    const dispatch = useAppDispatch()
  const currency = useAppSelector(state => state.currencyReducer.currency.toUpperCase())
  const { coin } = useAppSelector(state => state.coinReducer);
  const displayElement =  index >= carIndex -1  && index < carIndex + 3 
  const displayColor =  percentageChange > 0 ? '#01F1E3' : '#FE2264';
  const { theme } = useTheme();

  const selectCoin = () => {    
    dispatch(changeCoin(coinKey));
    dispatch(changeName(name));
  }

  const selectClass = () => {
    return coin === coinKey ? 'bg-carousel-button-color-two bg-opacity-50 shadow-md shadow-carousel-button-color' :'bg-white dark:bg-dark-card';
    
  }
  
  return (
    <div onClick={selectCoin}  className={displayElement ? `m-1 h-10 md:h-20 overflow-hidden w-full  rounded-md rd cursor-pointer ${selectClass()}`: 'hidden'}>
      <div className='flex  h-full w-full p-0 md:p-2 justify-center items-center '>
        <div className='flex h-6 w-6 md:h-8 md:w-8 items-center justify-center'>
          <Image 
            src={source} 
            alt={name}
            width={32}
            height={32}
          />
        </div>
        <div className='flex flex-col p-0 pl-1 lg:p-1 md:pl-3 lg:pl-5 '>
          <div className='justify-center items-center font-medium xl:text-base text-sm hidden md:flex '>{name}&nbsp;({symbol.toUpperCase()})</div>
          <div className='text-xs sm:text-base md:hidden'>{symbol.toUpperCase()}</div>
          <div className='flex justify-center items-center lg:flex-row-reverse xl:text-sm text-xs'>
            <div className='md:px-0 lg:px-1 xl:px-2 py-2 whitespace-nowrap hidden lg:flex  font-normal' style={{color: `${colorChange(percentageChange, theme)}`}}>{percentFormatter(percentageChange)}</div>
            <div className='md:px-0 lg:px-1 xl:px-2 py-2 font-normal text-light-text-color dark:text-card-text-gray hidden md:flex '>{currentPrice.toFixed(2)}&nbsp;{currency}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
