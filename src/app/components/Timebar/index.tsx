'use client';
import { setDays } from '@/app/GlobalRedux/Features/Chartdata/priceSlice';
import { useAppDispatch, useAppSelector } from '@/app/GlobalRedux/hooks'
import React from 'react'

export const Timebar = ({days}: {days:string}) => {
    const dispatch = useAppDispatch();

    const changeTime = (action: string) => {
        if(days !== action){
            dispatch(setDays(action));
        }
    }

    const getClassName = (day: string) => {
        return days === day ? 'bg-carousel-button-color-two bg-opacity-40 shadow-md shadow-carousel-button-color-two dark:shadow-slate-600 ' : '';
    };

  return (
    <div className=' flex items-center justify-center md:ml-2 mt-2 w-72 md:w-[28.938rem] h-11 bg-light-button-color bg-opacity-40 dark:bg-timebar-background-color dark:text-white p-1 rounded-md'>
        <div onClick={()=>{changeTime('1')}}    className={` w-full cursor-pointer h-full rounded-md flex justify-center items-center text-light-text-color dark:text-timebar-text-color text-center font-weight-normal text-sm ${getClassName('1')}`}><div className='min-w-28'>1D</div></div>
        <div onClick={()=>{changeTime('7')}}    className={` w-full cursor-pointer h-full rounded-md flex justify-center items-center text-light-text-color dark:text-timebar-text-color text-center font-weight-normal text-sm ${getClassName('7')}`}><div className='min-w-28'>7D</div></div>
        <div onClick={()=>{changeTime('14')}}   className={` w-full cursor-pointer h-full rounded-md flex justify-center items-center text-light-text-color dark:text-timebar-text-color text-center font-weight-normal text-sm ${getClassName('14')}`}><div className='min-w-28'>14D</div></div>
        <div onClick={()=>{changeTime('31')}}   className={` w-full cursor-pointer h-full rounded-md flex justify-center items-center text-light-text-color dark:text-timebar-text-color text-center font-weight-normal text-sm ${getClassName('31')}`}><div className='min-w-28'>1M</div></div>
        <div onClick={()=>{changeTime('180')}}  className={` w-full cursor-pointer h-full rounded-md flex justify-center items-center text-light-text-color dark:text-timebar-text-color text-center font-weight-normal text-sm ${getClassName('180')}`}><div className='min-w-28'>6M</div></div>
        <div onClick={()=>{changeTime('365')}}  className={` w-full cursor-pointer h-full rounded-md flex justify-center items-center text-light-text-color dark:text-timebar-text-color text-center font-weight-normal text-sm ${getClassName('365')}`}><div className='min-w-28'>1Y</div></div>
        <div onClick={()=>{changeTime('1826')}} className={` w-full cursor-pointer h-full rounded-md flex justify-center items-center text-light-text-color dark:text-timebar-text-color text-center font-weight-normal text-sm ${getClassName('1826')}`}><div className='min-w-28'>5Y</div></div>
    </div>
  )
}
