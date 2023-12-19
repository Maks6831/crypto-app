import { timeFormatter } from '@/app/Utils/timeFormatter'
import React from 'react'
import { Searchbar } from '../Searchbar';

export const HomeConverter = () => {
  const date = new Date();
  return (
    <div className='m-3'>
      <div className=' w-1/2 h-14 ml-24'>
        <div className=' text-light-text-color font-medium text-xl dark:text-white '>Online Currency Converter</div>
        <div className=' text-light-text-color text-opacity-80 font-normal text-base dark:text-dark-date-color'>{timeFormatter(date)} {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}</div>
      </div>
      <div className='flex justify-center'>
        <div className=' w-[39rem] h-52 bg-white m-5 p-6 rounded-2xl flex flex-col justify-between'>
          <div className='font-normal text-sm p-2  '>You sell</div>
          <div>
            <div className='text-xl font-medium text-purpleb p-2 '>
              <Searchbar isSearch={false} />
            </div>
            <hr className=' border-t-2 border-purpleb'/>
            <div className='font-normal text-sm text-purpleb p-2 '>1 BTC = $8,914.12</div>
            <div></div>
          </div>
        </div>
        <div className=' w-[39rem] h-52 bg-white m-5 p-6 rounded-2xl flex flex-col justify-between '>
          <div>Hello</div>
          <div>
            <div>hello</div>
          </div>
        </div>
      </div>
    </div>
  )
}
