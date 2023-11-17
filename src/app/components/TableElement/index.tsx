'use client';
import React from 'react';
import Image from 'next/image';
import { ProgressBar } from '../Progressbar';
import { moneyConverter } from '@/app/Utils/moneyConverter';
import { useAppSelector } from '@/app/GlobalRedux/hooks';

export const TableElement = ({number, name, image, symbol, price, change1h, change24h, change7d, sparkline, volume24h, marketCap, circulating, totalSupply} 
  : 
  {number:number, name: string, image: string, symbol:string, price:number, change1h:number, change24h:number, change7d:number, sparkline:number[], volume24h:number, marketCap:number, circulating:number, totalSupply:number}) => {
    const reduxSymbol = useAppSelector(state => state.currencyReducer.symbol);
    const colorArray = [
      ['bg-dark-orange', '#C27721'],
      ['bg-darker-blue', '#6374C3'],
      ['bg-brighter-green', '#30E0A1'],
      ['bg-light-orange', '#F5AC37'],
      ['bg-light-yellow', '#F3EB2F'],
      ['bg-light-blue', '#638FFE'],
      ['bg-light-green', '#4DEEE5'],
      ['bg-dark-red', '#F06142'],
      ['bg-new-blue', '#5082CF']
    ];

    const getColor = (index: number, type: string)=> {
      const arrayLength = colorArray.length;
      const colorIndex = index % arrayLength;
      return type === 'color' ? colorArray[colorIndex][1] : colorArray[colorIndex][0] + ' bg-opacity-30 '; 
    }    
    const colorChange = (value: number ) => {
      return value > 0 ? '#01F1E3' : '#FE2264';
    }

  return (
    <tr className='p-5 bg-white mb-3 gap-4 dark:bg-dark-card cursor-pointer'>
        <td className='p-5 rounded-l-xl'>{number}</td>
        <td className='p-5 flex flex-row'>
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
        <td className='p-5'>{price}</td>
        <td className='p-5' style={{color: `${colorChange(change1h)}`}}>{change1h.toFixed(2)}%</td>
        <td className='p-5' style={{color: `${colorChange(change24h)}`}}>{change24h.toFixed(2)}%</td>
        <td className='p-5' style={{color: `${colorChange(change7d)}`}}>{change7d.toFixed(2)}%</td>
        <td className='p-5'>
          <div className='flex justify-between'>
            <div className='text-xs'>{reduxSymbol}{moneyConverter(volume24h, 2)}</div>
            <div className='text-xs'>{reduxSymbol}{moneyConverter(marketCap, 2)}</div>
          </div>
          <ProgressBar 
            percentage={Math.random()* 100}
            color={getColor(number, 'color')}
            size={'w-[10rem] h-2 '}
            backgroundColor={getColor(number, 'none')}
          />
        </td>
        <td className='p-5'>
        <div className='flex justify-between'>
            <div className='text-xs'>{reduxSymbol}{moneyConverter(circulating, 2)}</div>
            <div className='text-xs'>{reduxSymbol}{moneyConverter(totalSupply, 2)}</div>
          </div>
          <ProgressBar 
            percentage={(circulating/totalSupply) * 100}
            color={getColor(number, 'color')}
            size={'w-[10rem] h-2 '}
            backgroundColor={getColor(number, 'none')}
          />
        </td>
        <td className='p-5 rounded-r-xl'>sparkline</td>
    </tr>
  )
}
