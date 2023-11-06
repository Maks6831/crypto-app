'use client';
import { priceChart } from '@/app/GlobalRedux/Features/Chartdata/priceSlice';
import { useAppDispatch, useAppSelector } from '@/app/GlobalRedux/hooks';
import React, { useEffect } from 'react'
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  registerables,
  LineController,
  BarController,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  BarElement,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  LineController,
  BarController
);

export const Pricegraph = () => {
  const dispatch = useAppDispatch();
  const { currency } = useAppSelector(state => state.currencyReducer);
  const { prices, labels } = useAppSelector(state => state.priceChart);
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Sales',
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        data: prices,
        pointRadius: 0
      }
    ],
  };
  const options = {
    scales :{
      x: {
        ticks: {
          display: false
        },
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          display: false
        },
        grid: {
          display: false
        }
      },
    }
  }

  
  useEffect(()=>{
    dispatch(priceChart({currency, coinId:'bitcoin'}))
  },[])





  return (
    <div className=''>
      <Chart
      type='line'
      data={data}
      options={options}
      style={{width: '100%', height: '100%'}}
      />
     
    </div>
  )
}
