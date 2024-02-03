'use client';
import React, { useState } from 'react'

export const Buttonswitcher = ({setState, boolean, nameArray} : {setState: Function, boolean: boolean, nameArray: string[]}) => {
  
  return (
    <div className='mt-5 ml-3 w-9/12 sm:w-5/12 md:w-[31.6rem] h-14 rounded-md flex items-center bg-white dark:bg-dark-card cursor-pointer '>
        <div onClick={()=> setState(true)} className={boolean ? 'w-full h-14  flex items-center justify-center bg-carousel-button-color-two bg-opacity-50 rounded-md': 'w-full h-14  flex items-center justify-center rounded-md'}>
          <div className='text-center'>Coins</div>
        </div>
        <div onClick={()=> setState(false)} className={boolean ?'w-full h-14  flex items-center justify-center rounded-md':  'w-full h-14  flex items-center justify-center bg-carousel-button-color-two bg-opacity-50 rounded-md'}>
          <div className='text-center'>Converter</div>
        </div>
      </div>
  )
}
