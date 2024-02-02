'use client'
import React, { useEffect } from 'react';
import { ProgressBar } from '../Progressbar';
import { useTheme } from 'next-themes';


export const DataCard = ({data, isProgress} : {data: (string | number)[][], isProgress:boolean}) => {
  const {theme} = useTheme();

  useEffect(()=>{
    console.log(theme)
  },[theme]);
  

  return (
    <div className=" shadow-lg bg-coin-card-color bg-opacity-30 dark:bg-purplea rounded-xl max-h-5/6 w-full">
                      <div className="flex flex-col min-[430px]:flex-row justify-between w-full h-1/3  items-center p-3 min-[430px]:p-5">
                        <div className="flex justify-center items-center">
                          <div className=' rounded-full bg-opacity-70  bg-carousel-button-color-two p-1 border-light-text-color border-opacity-20 dark:border-carousel-button-color-two border-2 text-white shadow-sm dark:shadow-md shadow-coin-card-color dark:shadow-black    '>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className=" rounded-full bg-opacity-40  w-3 h-3 ">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                          </div>
                          <div className="p-2  md:text-base sm:text-sm text-xs font-normal text-light-text-color dark:text-card-text-gray">{data[0][0]}</div>
                        </div>
                        <div className='lg:text-xl md:text-lg sm:text-base text-sm'>{data[0][1]}</div>
                      </div>
                      <div className="flex flex-col min-[430px]:flex-row justify-between w-full h-1/3   items-center p-3 min-[430px]:p-5">
                        <div className="flex justify-center items-center">
                          <div className=' rounded-full bg-opacity-70  bg-carousel-button-color-two p-1 border-light-text-color border-opacity-20 dark:border-carousel-button-color-two border-2 text-white shadow-sm dark:shadow-md shadow-coin-card-color dark:shadow-black    '>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className=" rounded-full bg-opacity-40  w-3 h-3 ">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                          </div>
                          <div className="p-2  md:text-base sm:text-sm text-xs font-normal text-light-text-color dark:text-card-text-gray">{data[1][0]}</div>
                        </div>
                        <div className='lg:text-xl md:text-lg sm:text-base text-sm'>{data[1][1]}</div>
                      </div>
                      {isProgress && typeof data[2][1] === 'number' ? 
                      <div>
                        <div className=" flex flex-col justify-between w-full items-center md:items-start max-h-1/3 start p-3  ">
                          <div className='flex items-center justify-between w-full '>
                           <div className='p-1   md:text-base sm:text-sm text-xs font-normal text-light-blue text-opacity-90 dark:text-coin-page-progress'>Circulating/Max </div>
                           <div className=' md:text-base sm:text-sm text-xs font-normal text-light-blue dark:text-coin-page-progress-two'>{data[2][1].toFixed(2)}%</div>
                          </div>
                          {theme && 
                          <ProgressBar
                          percentage={+data[2][1]}
                          color={theme === 'dark' ? 'rgb(212,119,12)': 'rgb(99, 143, 254)'}
                          size='min-w-full h-2'
                          backgroundColor={theme === 'dark' ? 'bg-coin-page-progress-two' : 'bg-blue-100'}
                          />}
                        </div>
                      </div>
                      :
                       data[2].length > 0 && 
                      <div className="flex flex-col min-[430px]:flex-row justify-between w-full h-1/3 items-center p-3 min-[430px]:p-5 ">
                        <div className="flex justify-center items-center">
                          <div className=' rounded-full bg-opacity-70  bg-carousel-button-color-two p-1 border-light-text-color border-opacity-20 dark:border-carousel-button-color-two border-2 text-white shadow-sm dark:shadow-md shadow-coin-card-color dark:shadow-black    '>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className=" rounded-full bg-opacity-40  w-3 h-3 ">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                          </div>
                            <div className="p-2  md:text-base sm:text-sm text-xs font-normal text-light-text-color dark:text-card-text-gray">{data[2][0]}</div>
                        </div>
                        <div className='lg:text-xl md:text-lg sm:text-base text-sm'>{data[2][1]}</div>
                      </div>}
                    </div>
  )
}
