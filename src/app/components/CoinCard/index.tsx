import React from 'react'

export const CoinCard = () => {
  return (
    <div className=' w-11/12 h-full shadow-lg  bg-carousel-button-color-two bg-opacity-40 dark:bg-purplea rounded-xl flex flex-col p-2'>
        <div className=' h-3/5 md:p-2  w-full '>
            <div className=' h-1/2 w-full flex flex-row-reverse md:flex-row md:justify-start justify-around  items-center    p-2'>
                <div className=' h-20 w-20 md:h-12 md:w-12 '>Image</div>
                <div className=' m-0 md:m-2'>
                    <div className='xl:text-xl lg:text-2xl md:text-lg sm:text-base text-sm font-bold '>Bitcoin (BTC)</div>
                    <div className='font-medium xl:text-base lg:text-lg md:text-md sm:text-sm text-xs text-light-text-color dark:text-card-text-gray'>www.bitcoin.org</div>
                </div>
            </div>
            <div className=' h-1/2 w-full border-b border-opacity-25 border-card-text-gray flex flex-col justify-center p-2 md:p-0  '>
                <div className='flex justify-start items-center  md:p-1'>
                    <div className='xl:text-3xl lg:text-3xl md:text-2xl sm:text-xl text-lg font-bold p-1'>$40,017</div>
                    <div className='font-medium xl:text-xl lg:text-lg md:text-base sm:text-sm text-xs p-1'>^5.02%</div>
                </div>
                <div className='flex justify-start items-center'>
                    <div className='xl:text-xl lg:text-lg md:text-base sm:text-sm text-xs p-1 text-light-text-color dark:text-card-text-gray'>profit:</div>
                    <div className='xl:text-xl lg:text-lg md:text-base sm:text-sm text-xs p-1'>$1,504</div>
                </div>
            </div>
        </div>
        
        <div className=' h-2/5 p-2'>
            <div className=' h-1/2 w-full flex flex-col justify-center '>
                <div className='flex justify-between w-full '>
                    <div className='xl:text-xl lg:text-lg md:text-base sm:text-sm text-xs'>All time high:</div>
                    <div className='xl:text-2xl lg:text-xl md:text-lg sm:text-base text-sm text-purpleb dark:text-white'>$64,805</div>
                </div>
                <div className='text-light-text-color dark:text-card-text-gray xl:text-base lg:text-lg md:text-md sm:text-sm text-xs'>Wed, 14 Sep 2023 11:54:46 GMT</div>
            </div>
            <div className='h-1/2 w-full flex flex-col justify-center'>
            <div className='flex justify-between w-full '>
                    <div className='xl:text-xl lg:text-lg md:text-base sm:text-sm text-xs'>All time low:</div>
                    <div className=' text-purpleb dark:text-white xl:text-2xl lg:text-xl md:text-lg sm:text-base text-sm'>$64,805</div>
                </div>
                <div className='text-light-text-color dark:text-card-text-gray xl:text-base lg:text-lg md:text-md sm:text-sm text-xs'>Wed, 14 Sep 2023 11:54:46 GMT</div>
            </div>  
        </div>
    </div>
  )
}
