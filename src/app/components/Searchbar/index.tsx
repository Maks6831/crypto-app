'use client';
import { searchData } from '@/app/GlobalRedux/Features/SearchData/searchSlice';
import { useAppDispatch, useAppSelector } from '@/app/GlobalRedux/hooks'
import React, { useEffect } from 'react'

export const Searchbar = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(state => state.searchReducer); 

  useEffect(()=>{
    dispatch(searchData());
  },[])

  useEffect(()=>{
    console.log(data);
  },[data])



  return (
    <div className='relative m-2 w-89'>
        <div className='absolute left-2 top-3 '>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
        </div>
        <label className='h-12 w-89 rounded-xl leading-10'>
            <input className='h-12 pl-8 w-89  bg-light-button-color bg-opacity-40 w-89 rounded-xl dark:bg-dark-button-color dark:bg-opacity-100' placeholder='Search...'/>
        </label>
    </div>
  )
}
