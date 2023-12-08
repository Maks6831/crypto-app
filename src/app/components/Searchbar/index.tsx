'use client';
import React, { useEffect, useRef, useState } from 'react'
import { searchData } from '@/app/GlobalRedux/Features/SearchData/searchSlice';
import { useAppDispatch, useAppSelector } from '@/app/GlobalRedux/hooks';
import { SearchItem } from '../SearchItem';
import { useDebounce } from '@/app/Utils/useDebounce';


export const Searchbar = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(state => state.searchReducer); 
  const [searchInput, setSearchInput] = useState('');
  const [dropDown, setDropDown] = useState(false);
  const refOne = useRef<HTMLDivElement>(null!);
  const resultContainer = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [keyPress, setKeyPress] = useState(false);
  const [key, setKey ] = useState(0)

  const changeIndex = (event: any) =>{
    if(!keyPress){
     const { target } = event;
     const index = (target as any).dataset.index;
     setFocusedIndex(parseInt(index || 0));
     setKey(key => key + 1);
    }
    setKeyPress(false);
  }
  
  const searchCoin = (e : any) => {
    const chosenName = e.target.innerText;
    const chosenObject = data.filter(obj => obj.name === chosenName);
  }

  const handleKeyDown : React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    const { key } = e;
    setKeyPress(true);

    if (key === "ArrowDown"){
      const nextIndexCount = (focusedIndex + 1) % data.length;
console.log(nextIndexCount)      
      setFocusedIndex(nextIndexCount);
    }
    if (key === "ArrowUp"){
      const nextIndexCount = (focusedIndex + data.length - 1) % data.length;
      console.log(nextIndexCount)
      setFocusedIndex(nextIndexCount);
    }
  }

  const useHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
    const { value } = event.target;
    setSearchInput(value);
    value !== '' && data.length > 0 ? setDropDown(true): setDropDown(false);
  }

  const debouncedSearch = useDebounce(searchInput, 1000);
  const rightData = data && !loading && !error && data.length > 0 && searchInput;
  const displayLoading = loading && !error;
  const newError = !loading && error;

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!refOne?.current?.contains(event.target)) {
        setDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [refOne]);

  useEffect(()=>{
    if(searchInput){
      dispatch(searchData(debouncedSearch));
    }
  },[debouncedSearch])

  useEffect(()=>{
    if(resultContainer.current){
      resultContainer.current.scrollIntoView({block: 'nearest'});
    }
  },[focusedIndex])

  return (
    <div tabIndex={1} onKeyDown={handleKeyDown} className='relative m-2 w-89'>
        <div className='absolute left-2 top-3 '>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
        </div>
        <label className='h-12 w-89 rounded-xl leading-10'>
            <input  className='h-12 pl-8 w-89  bg-light-button-color bg-opacity-40  rounded-xl dark:bg-dark-button-color dark:bg-opacity-100' placeholder='Search...' type='text' value={searchInput} onChange={useHandleChange}/>
        </label>
        <div className='absolute left-0 top-14 bg-light-button-color bg-scroll bg-opacity-50  w-full rounded-xl z-50 dark:bg-dark-button-color pb-2 pt-2 '>
          <div ref={refOne}>
            {newError && <div>Error {error}</div>}
            {displayLoading && dropDown && <div className='p-2'>Loading...</div>}
            {rightData && dropDown && 
            <div className='scrollbar-thin scrollbar-h-24 scrollbar-thumb-light-button-color scroll-smooth scrollbar-thumb-rounded-xl max-h-44 overflow-x-hidden overflow-y-auto m-1  '>
              {data.map((element, index)=> (
                <div data-index={index} onMouseEnter={changeIndex} className=' cursor-pointer' onClick={(e)=> searchCoin(e)} key={element.id} ref={index === focusedIndex ? resultContainer : null}>
                <SearchItem
                  key={element.id}
                  name={element.name}
                  opacity={index === focusedIndex ? 'bg-opacity-90': 'bg-opacity-0'}
                  index={index}

                  keyPress={keyPress}
                  changeIndex={changeIndex}
                />
                </div>
              ))}
            </div>}
          </div>
        </div>
    </div>
  )
}
