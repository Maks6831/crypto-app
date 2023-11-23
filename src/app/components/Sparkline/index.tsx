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

export const Sparkline = ({sparklineData, change7d, number} : {sparklineData: number[], change7d:number, number: number}) => {
    const { theme } = useTheme();

    const options = {
        elements: {
            line: {
              tension: 0.2,
            },
        },
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
        labels: sparklineData.filter((element, index)=> index % 3 === 0),
        datasets: [
          {
            fill: true,
            lineTension: 0.5,
            label: "spark_7Days",
            data: sparklineData.filter((element, index)=> index % 3 === 0),
            borderWidth: 2,
            borderColor: `rgba(${getColor(number, 'graph', theme, change7d)},1)` ,
            borderRadius: 3,
            backgroundColor:   (context: any) => {
                const chart = context.chart;
                const gradient = chart.ctx.createLinearGradient(0, 0, 0, chart.height);
                theme === 'light' ? gradient.addColorStop(0.7, 'rgba(255, 255, 255, 1)') :   gradient.addColorStop(0.7, 'rgba(30, 25, 50,1)');
                gradient.addColorStop(0.1, `rgba(${getColor(number, 'graph', theme, change7d)}, 0.6)`); // End with borderColor
                //gradient.addColorStop(1, 'rgba(255, 255, 255, 1)'); 
                //gradient.addColorStop(0, `rgba(${getColor(number, 'graph', theme, change1h)}, 0.5)`);
                return gradient;
              },
          },
        ],
      };

      
  return (
    <td className='pr-3 rounded-r-xl w-40 h-16'>
        <Chart type='line'data={data} options={options} style={{height:'100%', width: '100%'}}/>
    </td>
  )
}
