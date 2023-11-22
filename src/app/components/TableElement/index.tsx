'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { ProgressBar } from '../Progressbar';
import { moneyConverter } from '@/app/Utils/moneyConverter';
import { useAppSelector } from '@/app/GlobalRedux/hooks';
import { TableBar } from '../TableBar';
import { useTheme } from 'next-themes';
import { Sparkline } from '../Sparkline';
import { percentFormatter } from '@/app/Utils/percentFormatter';

export const TableElement = ({number, name, image, symbol, price, change1h, change24h, change7d, sparkline, volume24h, marketCap, circulating, totalSupply} 
  : 
  {number:number, name: string, image: string, symbol:string, price:number, change1h:number, change24h:number, change7d:number, sparkline:number[], volume24h:number, marketCap:number, circulating:number, totalSupply:number}) => {
    const { theme } = useTheme();
    const reduxSymbol = useAppSelector(state => state.currencyReducer.symbol)
    const colorChange = (value: number ) => {
      const positive = theme === 'light' ? '#00B1A7' : '#01F1E3';
      return value > 0 ? positive : '#FE2264';
    }

  return (
    <tr className='p-5 bg-white mb-3 gap-4 dark:bg-dark-card cursor-pointer'>
        <td className='p-5 rounded-l-xl'><span className='flex flex-row items-center justify-center'>{number}</span></td>
        <td className='p-5 flex flex-row justify-start items-center'>
         <div className='h-6 w-6 mr-2'>
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
          </div>
          {name}&nbsp;({symbol})
        </td>
        <td className='p-5'><span className='flex flex-row items-center justify-center'>{reduxSymbol}{price.toFixed(2)}</span></td>
        <td className='w-20' style={{color: `${colorChange(change1h)}`}}><span className='flex flex-row justify-center items-center'>{percentFormatter(change1h)}</span></td>
        <td className='w-20' style={{color: `${colorChange(change24h)}`}}><span className='flex flex-row justify-center items-center'>{percentFormatter(change24h)}</span></td>
        <td className='w-20' style={{color: `${colorChange(change7d)}`}}><span className='flex flex-row justify-center items-center'>{percentFormatter(change7d)}</span></td>
        <TableBar
          number={number}
          numerator={volume24h}
          denominator={marketCap}
          change1h={change1h}
        />
        <TableBar
          number={number}
          numerator={circulating}
          denominator={totalSupply}
          change1h={change1h}
        />
        <Sparkline
        sparklineData={sparkline}
        change1h={change1h}
        number={number}
        />
    </tr>
  )
}
