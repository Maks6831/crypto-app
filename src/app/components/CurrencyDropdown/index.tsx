import { useAppSelector } from '@/app/GlobalRedux/hooks';
import React from 'react'
import { useDispatch } from 'react-redux'
import { changeCurr } from '@/app/GlobalRedux/Features/Currency/Currency';

export const Currencydropdown = () => {
  const dispatch = useDispatch();
  const data = useAppSelector(state => state.currencyReducer);

  const changeCurrency = (newCurrency: string) => {  
    dispatch(changeCurr(newCurrency))
  }

  return (
    <div className='absolute -left-0 top-14 rounded-xl bg-opacity-40 bg-light-button-color flex justify-center  p-1 w-full z-50 dark:bg-dark-button-color'>
        <ul className=' '>
          <li onClick={()=> changeCurrency('usd')} className='pb-1 p-1 border-b border-gray-900 border-opacity-30'>USD</li>
          <li onClick={()=> changeCurrency('eur')} className='pb-1 p-1 border-b border-gray-900 border-opacity-30'>EUR</li>
          <li onClick={()=> changeCurrency('gbp')} className='pb-1 p-1 '>GBP</li>
        </ul>
    </div>
  )
}
