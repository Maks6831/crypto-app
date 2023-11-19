'use client';
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
} from "chart.js";
import { useTheme } from 'next-themes';
import { getColor } from '@/app/Utils/GetColor';

ChartJS.register(
    CategoryScale,
    BarElement,
    LinearScale,
    PointElement,
    LineElement,
    Filler
  );

export const Sparkline = ({sparklineData, change1h, number} : {sparklineData: number[], change1h:number, number: number}) => {
    const { theme } = useTheme();

    const options = {
        fill: true,
        responsive: true,
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
            border: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
            border: {
              display: false,
            },
          },
        },
        pointRadius: 0,
        borderWidth: 2,
      };

    const data = {
        labels: sparklineData,
        datasets: [
          {
            fill: true,
            label: "spark_7Days",
            data: sparklineData,
            borderWidth: 3,
            borderColor: `rgba(${getColor(number, 'graph', theme, change1h)},1)` ,
            borderRadius: 3,
            tension: 0.4,
          },
        ],
      };

      
  return (
    <td className=' rounded-r-xl w-44 h-20'>
        <Chart type='line'data={data} options={options} style={{height:'100%', width: '100%'}}/>
    </td>
  )
}
