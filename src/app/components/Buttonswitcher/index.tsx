'use client';
import React, { useState } from 'react'

export const Buttonswitcher = () => {
  const [isCoin, setisCoin] = useState(true);

  const setCoin = (value: boolean) => {
    value ? setisCoin(true) : setisCoin(false);
  }


  return (
    <div className='mt-2 w-[31.6rem] h-14 rounded-md flex items-center bg-white dark:bg-dark-card  '>
        <div onClick={()=> setCoin(true)} className={isCoin ? 'w-full h-14  flex items-center justify-center bg-carousel-button-color-two bg-opacity-50 rounded-md': 'w-full h-14  flex items-center justify-center rounded-md'}>
          <div className='text-center'>Coins</div>
        </div>
        <div onClick={()=> setCoin(false)} className={isCoin ?'w-full h-14  flex items-center justify-center rounded-md':  'w-full h-14  flex items-center justify-center bg-carousel-button-color-two bg-opacity-50 rounded-md'}>
          <div className='text-center'>Converter</div>
        </div>
      </div>
  )
}
