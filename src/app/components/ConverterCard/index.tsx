import React from 'react'
import { Searchbar } from '../Searchbar'

export const ConvertCard = ({defaultValue}: {defaultValue: string}) => {
  return (
    <div className=' w-[39rem] h-52 bg-white m-5 p-6 rounded-2xl flex flex-col justify-between'>
    <div className='font-normal text-sm p-2  '>You sell</div>
    <div>
      <div className='text-xl font-medium text-purpleb p-2 '>
        <Searchbar isSearch={false} defaultValue={defaultValue} />
      </div>
      <hr className=' border-t-2 border-purpleb'/>
      <div className='font-normal text-sm text-purpleb p-2 '>1 BTC = $8,914.12</div>
      <div></div>
    </div>
  </div>
  )
}
