'use client';
import React, { useState } from 'react'

export const Buttonswitcher = ({setCoin, isCoin} : {setCoin: Function, isCoin: boolean}) => {
  
  return (
    <div className='mt-5 ml-3 w-80 sm:w-[31.6rem] h-14 rounded-md flex items-center bg-white dark:bg-dark-card cursor-pointer '>
        <div onClick={()=> setCoin(true)} className={isCoin ? 'w-full h-14  flex items-center justify-center bg-carousel-button-color-two bg-opacity-50 rounded-md': 'w-full h-14  flex items-center justify-center rounded-md'}>
          <div className='text-center'>Coins</div>
        </div>
        <div onClick={()=> setCoin(false)} className={isCoin ?'w-full h-14  flex items-center justify-center rounded-md':  'w-full h-14  flex items-center justify-center bg-carousel-button-color-two bg-opacity-50 rounded-md'}>
          <div className='text-center'>Converter</div>
        </div>
      </div>
  )
}
