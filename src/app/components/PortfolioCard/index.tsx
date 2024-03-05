"use client";
import React, { useEffect, useState } from "react";
import { numberFormatter } from "@/app/Utils/numberFormatter";
import { useAppSelector } from "@/app/GlobalRedux/hooks";
import { useLocalState } from "@/app/Utils/Hooks/useLocalState";
import { DatePriceObj, minimalDatePriceObj } from "@/app/types/DatePriceTypes";

export const PortfolioCard = ({
  id,
  date,
  currentMarketPrice,
}: {
  id: string;
  date: string;
  currentMarketPrice: { [key: string]: number };
}) => {
  const { symbol, currency } = useAppSelector((state) => state.currencyReducer);
  const { data } = useAppSelector((state) => state.coinDatePriceReducer);
  const [coin, setCoin] = useState<DatePriceObj>(minimalDatePriceObj);
  useEffect(() => {
    setCoin(
      data.find((el: DatePriceObj) => el.id === id && el.date === date) ||
        minimalDatePriceObj
    );
  }, [data]);
  const historicalPrice = coin.market_data
    ? coin.market_data.current_price
    : minimalDatePriceObj.market_data.current_price;
  const total = coin.amount * currentMarketPrice[currency];
  const purchasedPrice = historicalPrice[currency];
  const priceChange =
    (currentMarketPrice[currency] /
      historicalPrice[currency] /
      historicalPrice[currency]) *
    100;
  return (
    <div className="w-full  flex justify-between ">
      <div className=" md:flex justify-around  w-1/2">
        <div className="flex justify-center  m-2 p-1 border border-opacity-20 border-card-text-gray md:border-none items-center flex-col">
          <div className=" text-sm font-normal dark:text-card-text-gray">
            Total:
          </div>
          <div className="text-positive text-base">
            {symbol}
            {total.toPrecision(3)}
          </div>
        </div>
        <div className="flex justify-center  m-2 p-1 border border-opacity-20 border-card-text-gray md:border-none items-center flex-col">
          <div className=" text-sm font-normal dark:text-card-text-gray">
            Purchased Price
          </div>
          <div className="text-positive text-base">
            {symbol}
            {purchasedPrice.toFixed(2)}
          </div>
        </div>
      </div>
      <div className=" md:flex justify-around  w-1/2">
        <div className="flex justify-center  m-2 p-1 border border-opacity-20 border-card-text-gray md:border-none items-center flex-col">
          <div className=" text-sm font-normal dark:text-card-text-gray">
            APCSP
          </div>
          <div className="text-positive">
            {numberFormatter(priceChange, true, "")}
          </div>
        </div>
        <div className="flex justify-center m-2 p-1 border border-opacity-20 border-card-text-gray md:border-none items-center flex-col">
          <div className=" text-sm font-normal dark:text-card-text-gray">
            Purchase Date
          </div>
          <div className="text-positive">{date.replaceAll("-", ".")}</div>
        </div>
      </div>
    </div>
  );
};
