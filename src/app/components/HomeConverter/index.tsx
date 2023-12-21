import { timeFormatter } from '@/app/Utils/timeFormatter'
import React, { useState } from 'react'
import { ConvertCard } from '../ConverterCard';
import { useAppDispatch, useAppSelector } from '@/app/GlobalRedux/hooks';
import { changeConverterArray } from '@/app/GlobalRedux/Features/ConverterCoins/ConvertSlice';

export const HomeConverter = () => {
  const date = new Date();
  const [defaultValues, setDefaultValues] = useState(['Bitcoin', 'Ethereum']);
  const { coins } = useAppSelector(state => state.converterReducer);
  const dispatch = useAppDispatch();

  const switchPair = () => {
   const arr = [coins[1], coins[0]];
   dispatch(changeConverterArray(arr));
  }

  console.log(coins);

  return (
    <div className='m-3 relative'>
      <div onClick={switchPair} className='w-12 h-12 absolute rounded-3xl  left-[42.3rem] top-2/4 bg-purpleb dark:bg-white flex justify-center items-center cursor-pointer'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" data-slot="icon" className="w-8 h-8 text-white dark:text-black">
  <path fill-rule="evenodd" d="M6.97 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.25 4.81V16.5a.75.75 0 0 1-1.5 0V4.81L3.53 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5Zm9.53 4.28a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V7.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
</svg>

      </div>
      <div className=' w-1/2 h-14 ml-24'>
        <div className=' text-light-text-color font-medium text-xl dark:text-white '>Online Currency Converter</div>
        <div className=' text-light-text-color text-opacity-80 font-normal text-base dark:text-dark-date-color'>{timeFormatter(date)} {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}</div>
      </div>
      <div className='flex justify-center'>
        {coins.map((element, index)=> (
          <ConvertCard 
          defaultValue={element}
          key={element}
          index={index}
          />
        ))}
      </div>
    </div>
  )
}
