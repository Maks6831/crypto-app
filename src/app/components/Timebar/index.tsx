'use client';
import { setDays } from '@/app/GlobalRedux/Features/Chartdata/priceSlice';
import { useAppDispatch, useAppSelector } from '@/app/GlobalRedux/hooks'
import React from 'react'

export const Timebar = () => {
    const dispatch = useAppDispatch();
    const { days } = useAppSelector(state => state.priceChart)

    const changeTime = (action: string) => {
        
        if(days !== action){
            dispatch(setDays(action));
            console.log(action);
        }
    }

    const getClassName = (day: string) => {
        return days === day ? 'bg-carousel-button-color-two bg-opacity-40 shadow-md shadow-carousel-button-color-two dark:shadow-slate-600 ' : '';
    };

  return (
    <div className=' flex items-center justify-center ml-2 mt-2 w-[28.938rem] h-11 bg-light-button-color bg-opacity-40 dark:bg-timebar-background-color dark:text-white p-1 rounded-md'>
        <div onClick={()=>{changeTime('1')}}    className={`w-56 cursor-pointer h-full rounded-md flex justify-center items-center text-light-text-color dark:text-timebar-text-color text-center font-weight-normal text-sm ${getClassName('1')}`}><div>1D</div></div>
        <div onClick={()=>{changeTime('7')}}    className={`w-56 cursor-pointer h-full rounded-md flex justify-center items-center text-light-text-color dark:text-timebar-text-color text-center font-weight-normal text-sm ${getClassName('7')}`}><div>7D</div></div>
        <div onClick={()=>{changeTime('14')}}   className={`w-56 cursor-pointer h-full rounded-md flex justify-center items-center text-light-text-color dark:text-timebar-text-color text-center font-weight-normal text-sm ${getClassName('14')}`}><div>14D</div></div>
        <div onClick={()=>{changeTime('31')}}   className={`w-56 cursor-pointer h-full rounded-md flex justify-center items-center text-light-text-color dark:text-timebar-text-color text-center font-weight-normal text-sm ${getClassName('31')}`}><div>1M</div></div>
        <div onClick={()=>{changeTime('180')}}  className={`w-56 cursor-pointer h-full rounded-md flex justify-center items-center text-light-text-color dark:text-timebar-text-color text-center font-weight-normal text-sm ${getClassName('180')}`}><div>6M</div></div>
        <div onClick={()=>{changeTime('365')}}  className={`w-56 cursor-pointer h-full rounded-md flex justify-center items-center text-light-text-color dark:text-timebar-text-color text-center font-weight-normal text-sm ${getClassName('365')}`}><div>1Y</div></div>
        <div onClick={()=>{changeTime('1826')}} className={`w-56 cursor-pointer h-full rounded-md flex justify-center items-center text-light-text-color dark:text-timebar-text-color text-center font-weight-normal text-sm ${getClassName('1826')}`}><div>5Y</div></div>
    </div>
  )
}
