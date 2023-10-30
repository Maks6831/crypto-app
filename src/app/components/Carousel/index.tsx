'use client';
import { fetchData } from '@/app/GlobalRedux/Features/Data/dataSlice';
import { useAppDispatch, useAppSelector } from '@/app/GlobalRedux/hooks'
import React, { useEffect, useState } from 'react'
import { CarouselCard } from '../CarouselCard';
import { MarketData } from '../../../../MarketData';

export const Carousel = () => {
const dispatch = useAppDispatch();
const { coins } = useAppSelector(state => state.carousel) as {coins : MarketData[]}
const { currency } = useAppSelector(state => state.currencyReducer);
const [carIndex, setCarIndex] = useState(1);

const increaseIndex = () => {
  setCarIndex(carIndex+4);
  console.log(carIndex);
  
}
const decreaseIndex = () => {
  carIndex !== 1 ? setCarIndex(carIndex-4) : setCarIndex(1);
}

useEffect(()=>{
  dispatch(fetchData(currency));
},[currency]);
  
  return (
    <div className='m-2 flex items-center'>
    <button className='flex justify-center items-center w-12 h-12 rounded-full border bg-carousel-button-color-one bg-opacity-20 border-carousel-button-color-two border-opacity-25' onClick={decreaseIndex}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
      </svg>
    </button>
    <div className='flex items-center justify-center flex-wrap m-3'>
      { carIndex &&
        coins.map((coin, index)=>(
          <CarouselCard
            index={index}
            key={coin.id}
            symbol={coin.symbol}
            name={coin.name}
            percentageChange={coin.price_change_percentage_24h}
            currentPrice={coin.current_price}
            source={coin.image}
            carIndex={carIndex}
          />
        ))
      }
    </div>
    <button className=' flex justify-center items-center w-12 h-12 rounded-full border bg-carousel-button-color-one bg-opacity-20 border-carousel-button-color-two border-opacity-25'   onClick={increaseIndex}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
    </svg>
    </button>
    </div>
  )
}

