'use client';
import { fetchData } from '@/app/GlobalRedux/Features/Data/dataSlice';
import { useAppDispatch, useAppSelector } from '@/app/GlobalRedux/hooks'
import React, { useEffect } from 'react'

export const Carousel = () => {
const dispatch = useAppDispatch();
const data = useAppSelector(state => state.carousel);


useEffect(()=>{
  //dispatch(fetchData());
  console.log(data);
  
},[])
  
  return (
    <div>Hello</div>
  )
}

