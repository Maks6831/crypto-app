'use client';
import React, { useEffect, useState } from 'react'
import { searchData } from '@/app/GlobalRedux/Features/SearchData/searchSlice';
import { useAppDispatch, useAppSelector } from '@/app/GlobalRedux/hooks';
import { SearchItem } from '../SearchItem';
import { useDebounce } from '@/app/Utils/useDebounce';

export const Searchbar = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(state => state.searchReducer); 
  const [searchInput, setSearchInput] = useState('');
  const [input, setInput] = useState('');

  const debouncedSearch = useDebounce(searchInput, 1000);
  const rightData = data && !loading && !error && data.length > 0 && searchInput;
  const displayLoading = loading && !error;
  const newError = !loading && error;

  const useHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
    setSearchInput(event.target.value);
  }


  useEffect(()=>{
    if(searchInput){
      dispatch(searchData(debouncedSearch));
    }
  },[debouncedSearch])

  return (
    <div className='relative m-2 w-89'>
        <div className='absolute left-2 top-3 '>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
        </div>
        <label className='h-12 w-89 rounded-xl leading-10'>
            <input  className='h-12 pl-8 w-89  bg-light-button-color bg-opacity-40  rounded-xl dark:bg-dark-button-color dark:bg-opacity-100' placeholder='Search...' type='text' value={searchInput} onChange={useHandleChange}/>
        </label>
        <div className='absolute left-0 top-14 bg-light-button-color bg-opacity-40 w-full rounded-xl z-50 max-h-24 overflow-x-hidden overflow-y-auto'>
          {newError && <div>Error {error}</div>}
          {displayLoading && <div>Loading Bro</div>}
          {rightData && 
          data.filter(bit => bit.name.toLowerCase().includes(searchInput)).map((element)=> (
            <SearchItem
            key={element.id}
            name={element.name}
            />
          ))} 
        </div>
    </div>
  )
}
