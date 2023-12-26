import React, { useEffect, useState } from 'react'
import { Searchbar } from '../Searchbar'
import { useAppSelector } from '@/app/GlobalRedux/hooks';

export const ConvertCard = ({defaultValue, index}: {defaultValue: string, index : number}) => {
  const [isFirst, setIsFirst] = useState(true);
  const { symbols, data } = useAppSelector(state => state.converterReducer);
  const {symbol} = useAppSelector(state=> state.currencyReducer);
  
  useEffect(()=>{
    index ? setIsFirst(true): setIsFirst(false);
  },[])

  const cryptoSymbol = isFirst ? symbols[1] : symbols[0];
  const prices = data.length > 0 && data?.filter(obj => obj.name === defaultValue)[0].data.prices
  const currentPrice = prices && prices[prices.length-1][1];
  console.log(prices);
  return (
    <div className={`w-[39rem] h-52 bg-white m-5 p-6 rounded-2xl flex flex-col justify-between ${index ? `dark:bg-light-text-color-two`:`dark:bg-purplea`}`}>
    <div className='font-normal text-sm p-2 dark:text-dark-convert-color'>{index? 'You sell' : 'You buy'}</div>
    <div>
      <div className='text-xl font-medium text-purpleb p-2 dark:text-white  '>
       {/*<Searchbar isSearch={false} defaultValue={defaultValue} />*/}
      </div>
      <hr className=' border-t-2 border-purpleb dark:border-white'/>
      <div className='font-normal text-sm text-purpleb p-2 dark:text-white '>1 {cryptoSymbol} = {symbol}{currentPrice && currentPrice.toFixed(2)}</div>
      <div></div>
    </div>
  </div>
  )
}
