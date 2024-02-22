import { timeFormatter } from "@/app/Utils/timeFormatter";
import React, { useEffect, useState } from "react";
import { ConvertCard } from "../ConverterCard";
import { useAppDispatch, useAppSelector } from "@/app/GlobalRedux/hooks";
import {
  converterData,
  changeArray,
} from "@/app/GlobalRedux/Features/ConverterCoins/ConvertSlice";
import { Pricegraph } from "../Pricegraph";
import { Timebar } from "../Timebar";

export const HomeConverter = () => {
  const date = new Date();
  const { coins, labels, prices } = useAppSelector(
    (state) => state.converterReducer
  );
  const { days } = useAppSelector((state) => state.priceChart);
  const { currency } = useAppSelector((state) => state.currencyReducer);
  const dispatch = useAppDispatch();
  const [currentPrice, setCurrentPrice] = useState(0);
  const coinArray = [coins[0].id, coins[1].id];

  const switchPair = () => {
    const arr = [coins[1], coins[0]];
    dispatch(changeArray(arr));
  };

  useEffect(() => {
    dispatch(
      converterData({ currency, array: coinArray, days: parseInt(days) })
    );
  }, [coins, currency, days]);

  return (
    <div className="m-3 w-full flex justify-center items-center flex-col  h-full relative ">
      <div className=" w-full h-14 flex item-start ">
        <div className="md:w-1/2 flex items-center justify-center flex-col m-5 ">
          <div className=" text-light-text-color font-medium text-xl dark:text-white text-left   w-80 ">
            Online Currency Converter
          </div>
          <div className=" text-light-text-color text-opacity-80 font-normal text-base text-left w-80   dark:text-dark-date-color">
            {timeFormatter(date)} {date.getHours()}:{date.getMinutes()}:
            {date.getSeconds()}
          </div>
        </div>
      </div>
      <div className="flex w-full h-full justify-center relative ">
        <div
          onClick={switchPair}
          className="w-12 inset-0 mx-auto my-auto  h-12 absolute rounded-3xl  bg-purpleb dark:bg-white flex justify-center items-center cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            data-slot="icon"
            className="w-8 h-8 text-white dark:text-black"
          >
            <path
              fill-rule="evenodd"
              d="M6.97 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.25 4.81V16.5a.75.75 0 0 1-1.5 0V4.81L3.53 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5Zm9.53 4.28a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V7.5a.75.75 0 0 1 .75-.75Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div className="w-full flex h-full flex-col md:flex-row justify-center items-center">
          {coins.map((element, index) => (
            <ConvertCard
              defaultValue={element.name}
              key={element.id}
              id={element.id}
              index={index}
            />
          ))}
        </div>
      </div>
      <div className=" relative md:p-2 pr-4 flex flex-col justify-end items-end  bg-white w-10/12 h-52 md:h-60 lg:h-80  rounded-xl dark:bg-light-text-color-two">
        <div className="flex absolute top-1 left-5 justify-center items-center ">
          <div className="m-1 p-1 font-normal dark:text-white text-sm md:text-xl">
            {coins && coins[0].name} ({coins[0].symbol})
          </div>
          <div className="m-1 p-1 dark:text-dark-date-color ">to</div>
          <div className="m-1 p-1 font-normal dark:text-white text-sm md:text-xl">
            {coins && coins[1].name} ({coins[1].symbol})
          </div>
        </div>
        <div className="w-full h-40 md:h-48 lg:h-64  ">
          {prices && (
            <Pricegraph
              isLine={true}
              labels={labels}
              prices={prices}
              days={days}
              isCoinPage={false}
              handleHover={setCurrentPrice}
            />
          )}
        </div>
      </div>
      <div className="m-5">
        <Timebar days={days} />
      </div>
    </div>
  );
};
