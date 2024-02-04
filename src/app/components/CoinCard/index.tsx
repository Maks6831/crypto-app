'use client';
import React from 'react';
import {  useAppSelector } from "@/app/GlobalRedux/hooks";
import Image from 'next/image';
import { timeFormatter } from '@/app/Utils/timeFormatter';
import { colorChange } from '@/app/Utils/colorChange';
import { useTheme } from 'next-themes';
import { percentFormatter } from '@/app/Utils/percentFormatter';
import { moneyConverter } from '@/app/Utils/moneyConverter';




export const CoinCard = ({isPortfolio}: {isPortfolio: boolean}) => {
    const { theme } = useTheme();
    const { data } = useAppSelector(state => state.coinPageReducer);
    const {currency, symbol } = useAppSelector(state => state.currencyReducer);
    const name = data.name;
    const coinSymbol = data.symbol.toUpperCase();
    const homepage = data.links.homepage[0];
    const image =   data.image.small;
    const currentPrice = moneyConverter(data.market_data.current_price[currency], 2, false).toLocaleString();
    const athPrice = data.market_data.ath[currency].toLocaleString();
    const athDate = timeFormatter(new Date(data.market_data.ath_date[currency]));
    const atlPrice = data.market_data.atl[currency].toLocaleString();
    const atlDate = timeFormatter(new Date(data.market_data.atl_date[currency]));
    const percentage = data.market_data.price_change_percentage_24h.toFixed(2);
    const high24H = data.market_data.high_24h[currency].toLocaleString();

return (
    <div className=' w-11/12 h-full shadow-lg  bg-carousel-button-color-two bg-opacity-30 dark:bg-purplea rounded-xl flex flex-col p-2'>
        <div className=' h-3/5 md:p-2  w-full '>
            <div className=' h-1/2 w-full flex flex-row-reverse md:flex-row md:justify-start justify-around  items-center    p-2'>
                <div className=' h-20 w-20 md:h-12 md:w-12 flex justify-center items-center '>
                    <Image
                    alt='symbol'
                    src={image}
                    width={40}
                    height={40} 
                    />
                </div>
                <div className=' m-0 md:m-2'>
                    <div className='xl:text-xl lg:text-2xl md:text-lg sm:text-base text-sm font-bold '>{name} ({coinSymbol})</div>
                    <a href={homepage} className='cursor-pointer font-medium xl:text-base lg:text-lg md:text-md sm:text-sm text-xs text-light-text-color dark:text-card-text-gray'>{homepage.replace('http://','')}</a>
                </div>
            </div>
            <div className=' h-1/2 w-full border-b border-opacity-25 border-card-text-gray flex flex-col justify-center p-2 md:p-0  '>
                <div className='flex justify-start items-center  md:p-1'>
                    <div className='xl:text-3xl lg:text-3xl md:text-2xl sm:text-xl text-lg font-bold p-1'>{symbol}{currentPrice}</div>
                    <div style={{color: `${colorChange(percentage, theme)}`}} className='font-medium xl:text-xl lg:text-lg md:text-base sm:text-sm text-xs p-1'>{percentFormatter(percentage)}</div>
                </div>
                <div className='flex justify-start items-center'>
                    
                    <div style={{color: `${colorChange(1, theme)}`}} className='xl:text-xl lg:text-lg md:text-base sm:text-sm text-xs p-1 text-light-text-color dark:text-card-text-gray'>{isPortfolio ? 'profit': "High 24h:" }</div>
                    <div className='xl:text-xl lg:text-lg md:text-base sm:text-sm text-xs p-1'>{symbol}{isPortfolio ? '&14056': high24H }</div>
                </div>
            </div>
        </div>
        
        <div className=' h-2/5 p-2'>
            <div className=' h-1/2 w-full flex justify-center items-center '>
                <div style={{color: `${colorChange(1, theme)}`}} className='lg:text-5xl md:text-4xl text-3xl  p-3' >{'▴'}</div>
                <div className='w-full flex-col justify-center h-1/2 '>
                    <div className='flex justify-between w-full '>
                        <div  className='xl:text-xl lg:text-lg md:text-base sm:text-sm text-xs'>All time high:</div>
                        <div className='xl:text-2xl lg:text-xl md:text-lg sm:text-base text-sm text-purpleb dark:text-white'>{symbol}{athPrice}</div>
                    </div>
                    <div className='text-light-text-color dark:text-card-text-gray xl:text-base lg:text-lg md:text-md sm:text-sm text-xs'>{athDate}</div>
                </div>
            </div>
            <div className=' h-1/2 w-full flex justify-center items-center '>
                <div style={{color: `${colorChange(-1, theme)}`}} className='lg:text-5xl md:text-4xl text-3xl p-3 ' >{'▾'}</div>
                <div className='w-full flex-col justify-center h-1/2 '>
                    <div className='flex justify-between w-full '>
                        <div className='xl:text-xl lg:text-lg md:text-base sm:text-sm text-xs'>All time low:</div>
                        <div className='xl:text-2xl lg:text-xl md:text-lg sm:text-base text-sm text-purpleb dark:text-white'>{symbol}{atlPrice}</div>
                    </div>
                    <div className='text-light-text-color dark:text-card-text-gray xl:text-base lg:text-lg md:text-md sm:text-sm text-xs'>{athDate}</div>
                </div>
            </div>
        </div>
    </div>
  )
}
