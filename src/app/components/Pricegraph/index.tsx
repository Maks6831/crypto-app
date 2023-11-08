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
import { log } from 'console';

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

export const Pricegraph = ({isLine}: {isLine: boolean}) => {
  const dispatch = useAppDispatch();
  const { currency } = useAppSelector(state => state.currencyReducer);
  const { prices, labels, labelsTwo, market_caps } = useAppSelector(state => state.priceChart);
  const data = {
    labels: isLine ? labels : labelsTwo,
    datasets: [
      {
        label: 'Sales',
        borderColor: 'rgb(120, 120, 250)',
        fill: true, 
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const gradient = chart.ctx.createLinearGradient(0, 0, 0, chart.height);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 1)'); // Start with white
          gradient.addColorStop(0, 'rgba(120, 120, 250, 1)'); // End with borderColor
          return gradient;
        },
        data: isLine ? prices : market_caps,
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
        display: false
      },
    }
  }

  
  useEffect(()=>{
    dispatch(priceChart({currency, coinId:'bitcoin'}))
  },[])





  return (
    <div className=' w-full h-72 flex justify-center items-end p-2'>
      <Chart
      type={isLine ? 'line' : 'bar'}
      data={data}
      options={options}
      style={{width: '100%', height: '100%'}}
      />
    </div>
  )
}
