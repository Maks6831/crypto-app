import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/app/GlobalRedux/hooks'
import { changeCoin, changeName } from '@/app/GlobalRedux/Features/CurrentCoin/coinSlice'

export const CarouselCard = (
  {index, symbol, name, percentageChange, currentPrice, source, carIndex, coinKey} :
   {index: number, symbol: string, name: string, percentageChange: number, currentPrice: number, source: string, carIndex: number, coinKey: string}
   ) => {
    const dispatch = useAppDispatch()
  const currency = useAppSelector(state => state.currencyReducer.currency.toUpperCase())
  const displayElement =  index >= carIndex -1  && index < carIndex + 3 
  const displayColor =  percentageChange > 0 ? '#01F1E3' : '#FE2264';

  const selectCoin = () => {    
    dispatch(changeCoin(coinKey));
    dispatch(changeName(name));
  }
  
  return (
    <div onClick={selectCoin}  className={displayElement ? 'm-1 bg-white w-72 h-20 rounded-md dark:bg-dark-card cursor-pointer ': 'hidden'}>
      <div className='flex h-full w-full p-3 '>
        <div className='flex items-center justify-center'>
          <Image 
            src={source} 
            alt={name}
            width={32}
            height={32}
          />
        </div>
        <div className='flex flex-col pl-5 '>
          <div className='flex justify-center items-center font-medium text-base'>{name}&nbsp;({symbol.toUpperCase()})</div>
          <div className='flex flex-row-reverse text-sm'>
            <div className='p-2 font-normal' style={{color: displayColor}}>{percentageChange.toFixed(2)}%</div>
            <div className='p-2 font-normal text-light-text-color dark:text-card-text-gray '>{currentPrice.toFixed(2)}&nbsp;{currency}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
