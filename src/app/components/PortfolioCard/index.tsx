"use client";
import React from "react";
import { numberFormatter } from "@/app/Utils/numberFormatter";
import { useAppSelector } from "@/app/GlobalRedux/hooks";

export const PortfolioCard = () => {
  const { symbol } = useAppSelector((state) => state.currencyReducer);
  return (
    <div className="w-full border-2  flex justify-between ">
      <div className=" md:flex justify-around  w-1/2">
        <div className="flex justify-center  m-2 p-1 border border-opacity-20 border-card-text-gray md:border-none items-center flex-col">
          <div className=" text-sm font-normal dark:text-card-text-gray">
            Coin Amount
          </div>
          <div className="text-positive text-base">$39,504</div>
        </div>
        <div className="flex justify-center  m-2 p-1 border border-opacity-20 border-card-text-gray md:border-none items-center flex-col">
          <div className=" text-sm font-normal dark:text-card-text-gray">
            Amount Value
          </div>
          <div className="text-positive text-base">
            {numberFormatter(45406, false, symbol)}
          </div>
        </div>
      </div>
      <div className=" md:flex justify-around  w-1/2">
        <div className="flex justify-center  m-2 p-1 border border-opacity-20 border-card-text-gray md:border-none items-center flex-col">
          <div className=" text-sm font-normal dark:text-card-text-gray">
            APCSP
          </div>
          <div className="text-positive">
            {numberFormatter(35.32, true, "")}
          </div>
        </div>
        <div className="flex justify-center m-2 p-1 border border-opacity-20 border-card-text-gray md:border-none items-center flex-col">
          <div className=" text-sm font-normal dark:text-card-text-gray">
            Purchase Date
          </div>
          <div className="text-positive">3.2.2021</div>
        </div>
      </div>
    </div>
  );
};
