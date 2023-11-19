'use client';
import React from 'react'
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

ChartJS.register(
    CategoryScale,
    BarElement,
    LinearScale,
    PointElement,
    LineElement,
    Filler
  );

export const Sparkline = ({sparklineData, change1h} : {sparklineData: number[], change1h:number}) => {
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
            label: "Coin Price",
            data: sparklineData,
            borderWidth: 1,
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
