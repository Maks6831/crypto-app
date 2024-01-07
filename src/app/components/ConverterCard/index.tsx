import React, { useEffect, useState } from 'react'
import { Searchbar } from '../Searchbar'
import { useAppSelector } from '@/app/GlobalRedux/hooks';

export const ConvertCard = ({defaultValue, index, id}: {defaultValue: string, index : number, id: string}) => {
  const [isFirst, setIsFirst] = useState(true);
  const { coins, data } = useAppSelector(state => state.converterReducer);
  const {symbol} = useAppSelector(state=> state.currencyReducer);
  
  useEffect(()=>{
    index ? setIsFirst(false): setIsFirst(true);
  },[index])

  const cryptoSymbol =  isFirst ? coins[0].symbol : coins[1].symbol;
  const firstPrices = data.length > 0 && data?.find(obj => obj.id === id)?.data.prices ;
  const currentPrice = firstPrices && firstPrices.length > 0 && firstPrices[firstPrices.length-1][1];
  const secondPrices = data.length > 0 && data?.find(obj => obj.id !== id)?.data.prices ;
  const secondPrice = secondPrices && secondPrices.length > 0 && secondPrices[secondPrices.length-1][1];
  const valueforSecondCard = currentPrice && secondPrice && (secondPrice / currentPrice).toFixed(3);
  const convertedValue = isFirst ?  1 : valueforSecondCard;
  return (
    <div className={`w-[39rem] h-52 bg-white m-5 p-6 rounded-2xl flex flex-col justify-between ${index ? `dark:bg-light-text-color-two`:`dark:bg-purplea`}`}>
    <div className='font-normal text-sm p-2 dark:text-dark-convert-color'>{index? 'You sell' : 'You buy'}</div>
    <div>
      <div className='text-xl font-medium text-purpleb p-2 dark:text-white flex justify-between item-center'>
       <Searchbar isSearch={false} defaultValue={defaultValue} />
       <div className=' p-1 pt-4 flex justify-center items-center'>{convertedValue}</div>
      </div>
      <hr className=' border-t-2 border-purpleb dark:border-white'/>
      <div className='font-normal text-sm text-purpleb p-2 dark:text-white '>1 {cryptoSymbol} = {symbol}{currentPrice && currentPrice.toFixed(2)}</div>
      <div></div>
    </div>
  </div>
  )
}
