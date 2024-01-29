import React from 'react'

export const CoinCard = () => {
  return (
    <div className=' w-11/12 h-full dark:bg-purplea rounded-xl flex flex-col'>
        <div className='border-2 h-1/2'>
            <div className='border-2 h-1/2 w-full flex items-center p-2'>
                <div className='h-12 w-12 border-2'>Image</div>
                <div className='m-2'>
                    <div className='text-2xl font-bold '>Bitcoin (BTC)</div>
                    <div className='font-medium text-base'>www.bitcoin.org</div>
                </div>
            </div>
            <div className='border-2 h-1/2 w-full'>
                <div className='flex justify-start items-center'>
                    <div className='text-4xl font-bold p-1'>$40,017</div>
                    <div className='font-medium text-xl p-1'>^5.02%</div>
                </div>
                <div className='flex justify-start items-center'>
                    <div className='text-xl p-1'>profit:</div>
                    <div className='text-xl p-1'>$1,504</div>
                </div>
            </div>
        </div>
        
        <div className='border-2 h-1/2'>
            <div className='border-2 h-1/2 w-full'></div>
            <div className='border-2 h-1/2 w-full'></div>
        </div>
    </div>
  )
}
