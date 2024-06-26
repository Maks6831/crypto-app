"use client";
import { priceChart } from "@/app/GlobalRedux/Features/Chartdata/priceSlice";
import { useAppDispatch, useAppSelector } from "@/app/GlobalRedux/hooks";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import { useTheme } from "next-themes";
import { labelFormatter } from "@/app/Utils/labelFormatter";
import { moneyConverter } from "@/app/Utils/moneyConverter";
import { GraphProps } from "@/app/types/GraphProps";
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
import { useScreenSize } from "@/app/Utils/Hooks/useScreenSize";
import { useDebounce } from "@/app/Utils/Hooks/useDebounce";

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

export const Pricegraph = (props: GraphProps) => {
  const dispatch = useAppDispatch();
  const { symbol } = useAppSelector((state) => state.currencyReducer);
  const { theme, setTheme } = useTheme();
  const screenSize = useScreenSize();
  const { prices } = useAppSelector((state) => state.priceChart);
  const initialScreenSize = screenSize.width && screenSize.width > 700 ? 16 : 8;
  const [tickSize, setTickSize] = useState<number>(initialScreenSize);
  const [hoverPrice, setHoverPrice] = useState(0);
  const correctSeconds = props.days && props.days > "180" ? 500 : 200;
  const debouncedNumber = useDebounce(hoverPrice, correctSeconds);

  const data = {
    labels: props.isLine
      ? labelFormatter(props.labels, props.days)
      : labelFormatter(props.labelsTwo, props.days),
    datasets: [
      {
        label: props.isLine ? "price" : "Total volume",
        borderColor: "rgb(120, 120, 250)",
        fill: true,
        lineTension: 0.4,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const gradient = chart.ctx.createLinearGradient(
            0,
            0,
            0,
            chart.height
          );
          theme === "light"
            ? gradient.addColorStop(1, "rgba(255, 255, 255, 1)")
            : props.isLine
            ? gradient.addColorStop(1, "rgba(25, 25, 50, 1)")
            : gradient.addColorStop(1, "rgba(30, 25, 50,1)");
          props.isLine
            ? gradient.addColorStop(0, "rgba(120, 120, 250, 1)")
            : gradient.addColorStop(0, "rgba(157, 98, 217, 1)");
          props.isLine
            ? gradient.addColorStop(0.4, "rgba(120, 120, 250, 0.9)")
            : gradient.addColorStop(0.4, "rgba(157, 98, 217, 0.9)");
          return gradient;
        },
        data: props.isLine ? props.prices : props.market_caps,
        pointRadius: 0,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (tooltipItem: any) {
            let value = tooltipItem.dataset.data[tooltipItem.dataIndex];
            value =
              value < 10
                ? value.toPrecision(7)
                : value.toFixed(2).toLocaleString();
            props.isLine &&
              setHoverPrice(tooltipItem.dataset.data[tooltipItem.dataIndex]);
            return `${symbol}` + value;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: tickSize,
          },
          maxTicksLimit: tickSize,
          maxRotation: 0,
          stepSize: props.isLine
            ? Math.ceil(props.labels.length / 10)
            : Math.ceil(props.labelsTwo.length / 10),
        },
        grid: {
          display: false,
        },
      },
      y: {
        suggestedMax: props.isLine
          ? Math.max(...props.prices)
          : Math.max(...props.market_caps) * 1.3,
        display: props.isCoinPage ? true : false,
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          callback: function (value: any, index: any, ticks: any) {
            return `${symbol}` + moneyConverter(value, 0, true);
          },
          font: {
            size: tickSize,
          },
          maxTicksLimit: tickSize === 8 ? tickSize - 3 : 5,
        },
      },
    },
  };
  useEffect(() => {
    if (screenSize.width && screenSize.width > 700 && tickSize !== 16) {
      setTickSize(16);
    } else if (screenSize.width && screenSize.width < 700 && tickSize !== 8) {
      setTickSize(8);
    }
  }, [screenSize]);

  useEffect(() => {
    if (hoverPrice && props.isLine) {
      props.handleHover(debouncedNumber);
    }
  }, [debouncedNumber]);

  useEffect(() => {
    props.isLine && prices && props.handleHover(0);
  }, [prices]);

  return (
    <div
      className={`max-w-full w-full max-h-full h-full  ${
        props.isCoinPage ? " h-56" : " sm:h-48 lg:h-64"
      }  flex justify-center items-end  md:p-2`}
    >
      <Chart
        width={"100%"}
        height={"100%"}
        type={props.isLine ? "line" : "bar"}
        data={data}
        options={options as any}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};
