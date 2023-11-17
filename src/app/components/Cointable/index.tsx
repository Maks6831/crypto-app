import React from 'react'

export const Cointable = () => {
  return (
    <div>
      <table className='w-[81rem]'>
        <thead>
          <th className='font-normal text-sm leading-4 text-light-text-color dark:text-card-text-gray'>#</th>
          <th className='font-normal text-sm leading-4 text-light-text-color dark:text-card-text-gray'>Name</th>
          <th className='font-normal text-sm leading-4 text-light-text-color dark:text-card-text-gray'>Price</th>
          <th className='font-normal text-sm leading-4 text-light-text-color dark:text-card-text-gray'>1h%</th>
          <th className='font-normal text-sm leading-4 text-light-text-color dark:text-card-text-gray'>24h%</th>
          <th className='font-normal text-sm leading-4 text-light-text-color dark:text-card-text-gray'>7d%</th>
          <th className='font-normal text-sm leading-4 text-light-text-color dark:text-card-text-gray'>24h volume / Market Cap</th>
          <th className='font-normal text-sm leading-4 text-light-text-color dark:text-card-text-gray'>Circulating / Total supply</th>
          <th className='font-normal text-sm leading-4 text-light-text-color dark:text-card-text-gray'>last 7d</th>
        </thead>
      </table>
    </div>
  )
}
