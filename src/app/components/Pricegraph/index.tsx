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

type GraphProps = {
  days : string
} & ({
  isLine: true
  prices : number[]
  labels : number[]
}|{
  isLine: false
  labelsTwo: number[]
  market_caps: number[]
})

export const Pricegraph = (props : GraphProps) => {
  const dispatch = useAppDispatch();
  const { symbol } = useAppSelector(state => state.currencyReducer);
  const { theme, setTheme } = useTheme();

  const data = {
    labels: props.isLine ? labelFormatter(props.labels, props.days) : labelFormatter(props.labelsTwo, props.days),
    datasets: [
      {
        label: props.isLine ? 'price': 'market_caps',
        borderColor: 'rgb(120, 120, 250)',
        fill: true,
        lineTension: 0.4,
        backgroundColor:   (context: any) => {
          const chart = context.chart;
          const gradient = chart.ctx.createLinearGradient(0, 0, 0, chart.height);
          theme === 'light' ? gradient.addColorStop(1, 'rgba(255, 255, 255, 1)') : props.isLine ? gradient.addColorStop(1,'rgba(25, 25, 50, 1)') : gradient.addColorStop(1, 'rgba(30, 25, 50,1)')
          props.isLine ? gradient.addColorStop(0, 'rgba(120, 120, 250, 1)') : gradient.addColorStop(0, 'rgba(157, 98, 217, 1)')
          props.isLine ? gradient.addColorStop(0.4, 'rgba(120, 120, 250, 0.9)') : gradient.addColorStop(0.4, 'rgba(157, 98, 217, 0.9)')
          return gradient;
        } ,
        data: props.isLine ? props.prices : props.market_caps,
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
          stepSize: props.isLine ? Math.ceil(props.labels.length/10) : Math.ceil(props.labelsTwo.length / 10)
        },
        grid: {
          display: false
        }
      },
      y: {
        suggestedMax: props.isLine ? Math.max(...props.prices) : Math.max(...props.market_caps) * 1.3 ,
        display: false
      },
    }
  }

  return (
    <div className=' w-full h-64 flex justify-center items-end p-2'>
      <Chart
      type={props.isLine ? 'line' : 'bar'}
      data={data}
      options={options}
      style={{width: '100%', height: '100%'}}
      />
    </div>
  )
}
