import React from 'react'
import { Searchbar } from '../Searchbar'

export const ConvertCard = ({defaultValue, index}: {defaultValue: string, index : number}) => {
  return (
    <div className={`w-[39rem] h-52 bg-white m-5 p-6 rounded-2xl flex flex-col justify-between ${index ? `dark:bg-light-text-color-two`:`dark:bg-purplea`}`}>
    <div className='font-normal text-sm p-2 dark:text-dark-convert-color'>{index? 'You sell' : 'You buy'}</div>
    <div>
      <div className='text-xl font-medium text-purpleb p-2 dark:text-white  '>
        <Searchbar isSearch={false} defaultValue={defaultValue} />
      </div>
      <hr className=' border-t-2 border-purpleb dark:border-white'/>
      <div className='font-normal text-sm text-purpleb p-2 dark:text-white '>1 BTC = $8,914.12</div>
      <div></div>
    </div>
  </div>
  )
}
