'use client';
import { priceChart } from '@/app/GlobalRedux/Features/Chartdata/priceSlice';
import { useAppDispatch, useAppSelector } from '@/app/GlobalRedux/hooks';
import React, { useEffect } from 'react'
import { Chart } from "react-chartjs-2";
import { useTheme } from 'next-themes';
import { labelFormatter } from '@/app/Utils/labelFormatter';
import {
  Tooltip,
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
  Tooltip,
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
  const { currency, symbol } = useAppSelector(state => state.currencyReducer);
  const { prices, labels, labelsTwo, market_caps, days } = useAppSelector(state => state.priceChart);
  const { coin } = useAppSelector(state => state.coinReducer);
  const { theme, setTheme } = useTheme();


  const data = {
    labels: isLine ? labelFormatter(labels, days) : labelFormatter(labelsTwo, days),
    datasets: [
      {
        label: isLine ? 'price': 'market_caps',
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
    responsive: true,
    maintainAspectRatio: false, 
    tooltips: {
      mode: 'index',
      intersect: false, 
      callbacks: {
        label: function(tooltipItem: any, data: any) {
          const currencySymbol = symbol;
          const value = tooltipItem.yLabel.toFixed(2);
          return data.labels[tooltipItem.index] + ': ' + currencySymbol + value;
        }
      }
    },
    scales :{
      x: {
        ticks: {
          maxTicksLimit: 7,
          maxRotation: 0,
          stepSize: isLine ? Math.ceil(labels.length/10) : Math.ceil(labelsTwo.length / 10)
        },
        grid: {
          display: false
        }
      },
      y: {
        suggestedMax: isLine ? Math.max(...prices) : Math.max(...market_caps) * 1.3 ,
        display: false
      },
    }
  }

  
  useEffect(()=>{
    dispatch(priceChart({currency, coinId: coin, days: days}))
  },[coin, currency, days])

  return (
    <div className=' w-full h-64 flex justify-center items-end p-2'>
      <Chart
      type={isLine ? 'line' : 'bar'}
      data={data}
      options={options}
      style={{width: '100%', height: '100%'}}
      />
    </div>
  )
}
