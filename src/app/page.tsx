'use client';
import { useEffect, useState } from 'react';
import { Buttonswitcher } from './components/Buttonswitcher';
import { Carousel } from './components/Carousel';
import { CoinInfoContainer } from './components/CoinInfoContainer';
import { Cointable } from './components/Cointable';
import { Pricegraph } from './components/Pricegraph';
import { Timebar } from './components/Timebar';
import "./globals.css";
import { HomeConverter } from './components/HomeConverter';
import { useAppDispatch, useAppSelector } from './GlobalRedux/hooks';
import { priceChart } from './GlobalRedux/Features/Chartdata/priceSlice';
import { TitleHeader } from './components/TitleHeader';

export default function Home() {
  const [isCoin, setisCoin] = useState(true);
  const { prices, labels, labelsTwo, market_caps, days } = useAppSelector(state => state.priceChart);
  const { currency, symbol } = useAppSelector(state => state.currencyReducer);
  const { coin } = useAppSelector(state => state.coinReducer);
  const dispatch = useAppDispatch();

  const setCoin = (value: boolean) => {
    value ? setisCoin(true) : setisCoin(false);
  }

  useEffect(()=>{
    dispatch(priceChart({currency, coinId: coin, days: days}))
  },[coin, currency, days])

  return (
  <div>
    <div className=' bg-light-background w-full dark:bg-dark-background min-h-screen'>
        <TitleHeader isNavbar={false} />
      <div className='w-3/4 md:w-1/2  h-full flex justify-center flex-col'>
        <Buttonswitcher setCoin={setCoin} isCoin={isCoin}/>
      </div>
      {isCoin ? 
        <>
          <div className='mb-2 flex justify-center items-center'>
            <Carousel />
          </div>
          <div className='flex h-[25rem] w-full justify-center m-2'>
            <div className=' m-2 p-6 bg-white-color rounded-xl  h-[25rem] w-[37rem] flex justify-center items-end relative dark:bg-light-text-color-two '>
              <CoinInfoContainer isPrice={true} />
              <Pricegraph isLine={true} prices={prices} labels={labels} days={days}/>
            </div>
            <div className='m-2 p-6 bg-white-color rounded-xl  h-[25rem] w-[37rem] flex justify-center items-end relative dark:bg-volume-background'>
              <CoinInfoContainer isPrice={false} />
              <Pricegraph isLine={false} market_caps={market_caps} labelsTwo={labelsTwo} days={days} />
            </div>
            </div>
            <div className='m-4 w-1/2 h-full flex justify-center'>
              <Timebar days={days}/>
            </div>
        </>
        :
        <>
          <HomeConverter/>
        </>
        }
      <div className='flex justify-center items-center'>
        <Cointable/>
      </div>
    </div> 
  </div>
  )
}
