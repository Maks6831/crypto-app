import React from 'react';
import { ProgressBar } from '../Progressbar';
import { useAppSelector } from '@/app/GlobalRedux/hooks';
import { moneyConverter } from '@/app/Utils/moneyConverter';

export const TableBar = ({number, numerator, denominator}:{number:number, numerator: number, denominator: number}) => {
const reduxSymbol = useAppSelector(state => state.currencyReducer.symbol);
const colorArray = [
    ['bg-dark-orange', 'text-dark-orange', '#C27721'],
    ['bg-darker-blue', 'text-darker-blue', '#6374C3'],
    ['bg-brighter-green','text-brighter-green', '#30E0A1'],
    ['bg-light-orange', 'text-light-orange', '#F5AC37'],
    ['bg-light-yellow', 'text-light-yellow', '#F3EB2F'],
    ['bg-light-blue', 'text-light-blue', '#638FFE'],
    ['bg-light-green','text-light-green' , '#4DEEE5'],
    ['bg-dark-red', 'text-dark-red', '#F06142'],
    ['bg-new-blue', 'text-new-blue', '#5082CF']
  ];

  const getColor = (index: number, type: string)=> {
    const arrayLength = colorArray.length;
    const colorIndex = index % arrayLength;
    return type === 'color' ? colorArray[colorIndex][2] : type === 'text' ? colorArray[colorIndex][1] : colorArray[colorIndex][0] + ' bg-opacity-50 '; 
  }    
  return (
    <td className='p-5'>
          <div className='flex ml-1 justify-between w-[10rem]'>
            <div className={`text-xs ${getColor(number, 'text')}`}>&#8226;{reduxSymbol}{moneyConverter(numerator, 2)}</div>
            <div className='text-xs'>&#8226;{reduxSymbol}{moneyConverter(denominator, 2)}</div>
          </div>
          <ProgressBar 
            percentage={(numerator/denominator) * 100}
            color={getColor(number, 'color')}
            size={'w-[10rem] h-2 '}
            backgroundColor={getColor(number, 'none')}
          />
        </td>
  )
}
