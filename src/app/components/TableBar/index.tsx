import React from 'react';
import { ProgressBar } from '../Progressbar';
import { useAppSelector } from '@/app/GlobalRedux/hooks';
import { moneyConverter } from '@/app/Utils/moneyConverter';
import { useTheme } from 'next-themes';
import { getColor } from '@/app/Utils/GetColor';


export const TableBar = ({number, numerator, denominator, change1h}:{number:number, numerator: number, denominator: number, change1h: number}) => {
  const reduxSymbol = useAppSelector(state => state.currencyReducer.symbol);
  const { theme } = useTheme()

  return (
    <td className='p-5'>
          <div className='flex ml-1 justify-between w-[10rem] '>
            <div className={`text-xs ${getColor(number, 'text', theme, change1h)}`}>&#8226;{reduxSymbol}{moneyConverter(numerator, 2)}</div>
            <div className='text-xs'>&#8226;{reduxSymbol}{moneyConverter(denominator, 2)}</div>
          </div>
          <ProgressBar 
            percentage={(numerator/denominator) * 100}
            color={getColor(number, 'color', theme, change1h)}
            size={'w-[10rem] h-2 '}
            backgroundColor={getColor(number, 'none', theme, change1h)}
          />
        </td>
  )
}
