'use client';
import { priceChart } from '@/app/GlobalRedux/Features/Chartdata/priceSlice';
import { useAppDispatch, useAppSelector } from '@/app/GlobalRedux/hooks';
import React, { useEffect } from 'react'
import { Chart } from "react-chartjs-2";
import { useTheme } from 'next-themes';


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

export const Pricegraph = ({isLine}: {isLine: boolean}) => {
  const dispatch = useAppDispatch();
  const { currency } = useAppSelector(state => state.currencyReducer);
  const { prices, labels, labelsTwo, market_caps, days } = useAppSelector(state => state.priceChart);
  const { coin } = useAppSelector(state => state.coinReducer);
  const { theme, setTheme } = useTheme();


  const data = {
    labels: isLine ? labels : labelsTwo,
    datasets: [
      {
        label: 'Sales',
        borderColor: 'rgb(120, 120, 250)',
        fill: true,
        lineTension: 0.4,
        backgroundColor:   (context: any) => {
          const chart = context.chart;
          const gradient = chart.ctx.createLinearGradient(0, 0, 0, chart.height);
          theme === 'light' ? gradient.addColorStop(1, 'rgba(255, 255, 255, 1)') : isLine ? gradient.addColorStop(1,'rgba(25, 25, 50, 1)') : gradient.addColorStop(1, 'rgba(30, 25, 50,1)')
          isLine ? gradient.addColorStop(0, 'rgba(120, 120, 250, 1)') : gradient.addColorStop(0, 'rgba(157, 98, 217, 1)')
          isLine ? gradient.addColorStop(0.4, 'rgba(120, 120, 250, 0.9)') : gradient.addColorStop(0.4, 'rgba(157, 98, 217, 0.9)')
          return gradient;
        } ,
        data: isLine ? prices : market_caps,
        pointRadius: 0
      }
    ],
  };
  const options = {
    tooltips: {
      mode: 'index',
      intersect: false, 
      callbacks: {
          label: function(tooltipItem: any, data: any) {
              return data.labels[tooltipItem.index] + ': ' + tooltipItem.yLabel; // Customize tooltip label content
          }
      }
  },
    scales :{
      x: {
        ticks: {
          maxTicksLimit: 6,
          maxRotation: 0,
          stepSize: isLine ? Math.ceil(labels.length/10) : Math.ceil(labelsTwo.length / 10)
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
    dispatch(priceChart({currency, coinId: coin, days: days}))
  },[coin, currency, days])

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
