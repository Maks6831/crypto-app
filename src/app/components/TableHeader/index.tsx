import React from 'react'

export const TableHeader = () => {
  return (
    <thead className='relative'>
        <th className='font-normal text-sm leading-4 text-light-text-color dark:text-card-text-gray hidden xl:table-cell'>#</th>
        <th className='font-normal text-sm leading-4 text-light-text-color dark:text-card-text-gray absolute left-24'>Name</th>
        <th className='font-normal text-sm leading-4 text-light-text-color dark:text-card-text-gray'>Price</th>
        <th className='font-normal text-sm leading-4 text-light-text-color dark:text-card-text-gray hidden xl:table-cell'>1h%</th>
        <th className='font-normal text-sm leading-4 text-light-text-color dark:text-card-text-gray hidden xl:table-cell'>24h%</th>
        <th className='font-normal text-sm leading-4 text-light-text-color dark:text-card-text-gray hidden md:table-cell'>7d%</th>
        <th className='font-normal text-sm leading-4 text-light-text-color dark:text-card-text-gra hidden sm:table-cell'>24h volume / Market Cap</th>
        <th className='font-normal text-sm leading-4 text-light-text-color dark:text-card-text-gray hidden lg:table-cell'>Circulating / Total supply</th>
        <th className='font-normal text-sm leading-4 text-light-text-color dark:text-card-text-gray'>last 7d</th>
    </thead>
  )
}
