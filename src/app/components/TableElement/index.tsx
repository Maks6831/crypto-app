'use client';
import React from 'react';
import Image from 'next/image';

export const TableElement = ({number, name, image, symbol, price, change1h, change24h, change7d, sparkline, volume24h, marketCap, circulating, totalSupply} 
  : 
  {number:number, name: string, image: string, symbol:string, price:number, change1h:number, change24h:number, change7d:number, sparkline:number[], volume24h:number, marketCap:number, circulating:number, totalSupply:number}) => {
    
    const colorChange = (value: number ) => {
      return value > 0 ? '#01F1E3' : '#FE2264';
    }

  return (
    <tr className='p-5 bg-white mb-3 gap-5 dark:bg-dark-card'>
        <td className='p-5 rounded-l-xl'>{number}</td>
        <td className='p-5 flex flex-row'>
         {/*<div className='h-6 w-6 mr-2'>
            <Image
              src={image}
              alt={name}
              width={24}
              height={24}
              style={{
                  width: '24px',
                  height: '24px'
              }}
            />
            </div>*/}
          {name}&nbsp;({symbol})
          </td>
        <td className='p-5'>{price}</td>
        <td className='p-5' style={{color: `${colorChange(change1h)}`}}>{change1h.toFixed(2)}%</td>
        <td className='p-5' style={{color: `${colorChange(change24h)}`}}>{change24h.toFixed(2)}%</td>
        <td className='p-5' style={{color: `${colorChange(change7d)}`}}>{change7d.toFixed(2)}%</td>
        <td className='p-5'>{volume24h}</td>
        <td className='p-5'>{circulating}</td>
        <td className='p-5 rounded-r-xl'>sparkline</td>
    </tr>
  )
}
