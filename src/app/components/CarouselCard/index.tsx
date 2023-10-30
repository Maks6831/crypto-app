import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useAppSelector } from '@/app/GlobalRedux/hooks'

export const CarouselCard = ({index, symbol, name, percentageChange, currentPrice, source, carIndex} : {index: number, symbol: string, name: string, percentageChange: number, currentPrice: number, source: string, carIndex: number}) => {
  const {currency} = useAppSelector(state => state.currencyReducer)
  const [displayCurr, setDisplayCurr] = useState('');
  const [color, setColor] = useState('');
  const [display, setDisplay] = useState(false);

  useEffect(()=>{
    switch(currency){
      case 'gbp':
        setDisplayCurr('GBP');
      break;
      case 'eur':
        setDisplayCurr('EUR');
      break;
      case 'usd': 
      setDisplayCurr('USD')
      break;
      default: 
      setDisplayCurr('USD');
    }
    
  },[currency])

  useEffect(()=>{
    percentageChange > 0 ? setColor('#01F1E3') : setColor('#FE2264');
    index >= carIndex -1  && index < carIndex + 3 ? setDisplay(true) : setDisplay(false);

  },[carIndex])
  return (
    <div  className={display ? 'm-1 bg-white w-72 h-20 rounded-md dark:bg-dark-card ': 'hidden'}>
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
            <div className='p-2 font-normal' style={{color: color}}>{percentageChange.toFixed(2)}%</div>
            <div className='p-2 font-normal text-light-text-color dark:text-card-text-gray '>{currentPrice.toFixed(2)}&nbsp;{displayCurr}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
