'use client';
import { priceChart } from '@/app/GlobalRedux/Features/Chartdata/priceSlice';
import { useAppDispatch, useAppSelector } from '@/app/GlobalRedux/hooks';
import React, { useEffect } from 'react'

export const Pricegraph = () => {
  const dispatch = useAppDispatch();
  const { currency } = useAppSelector(state => state.currencyReducer);
  const { prices } = useAppSelector(state => state.priceChart);

  
  useEffect(()=>{
    dispatch(priceChart({currency, coinId:'bitcoin'}))
  },[])

  useEffect(()=>{
    console.log(prices);
    
  },[prices])

  return (
    <div>Pricegraph</div>
  )
}
