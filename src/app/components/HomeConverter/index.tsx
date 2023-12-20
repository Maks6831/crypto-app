import { timeFormatter } from '@/app/Utils/timeFormatter'
import React from 'react'
import { Searchbar } from '../Searchbar';
import { ConvertCard } from '../ConverterCard';

export const HomeConverter = () => {
  const date = new Date();
  const defaultValues = ['Bitcoin', 'Ethereum'];
  return (
    <div className='m-3'>
      <div className=' w-1/2 h-14 ml-24'>
        <div className=' text-light-text-color font-medium text-xl dark:text-white '>Online Currency Converter</div>
        <div className=' text-light-text-color text-opacity-80 font-normal text-base dark:text-dark-date-color'>{timeFormatter(date)} {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}</div>
      </div>
      <div className='flex justify-center'>
        {defaultValues.map((element, index)=> (
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
