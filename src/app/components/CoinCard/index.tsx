"use client";
import React from "react";
import { useAppSelector } from "@/app/GlobalRedux/hooks";
import Image from "next/image";
import { timeFormatter } from "@/app/Utils/timeFormatter";
import { colorChange } from "@/app/Utils/colorChange";
import { useTheme } from "next-themes";
import { numberFormatter } from "@/app/Utils/numberFormatter";
import { moneyConverter } from "@/app/Utils/moneyConverter";
import { LoadingSpinner } from "../LoadingSpinner";
import { extractUrl } from "@/app/Utils/addressFormatter";

export const CoinCard = ({ isPortfolio }: { isPortfolio: boolean }) => {
  const { theme } = useTheme();
  const { data, loading } = useAppSelector((state) => state.coinPageReducer);
  const { currency, symbol } = useAppSelector((state) => state.currencyReducer);
  const name = data.name;
  const coinSymbol = data.symbol.toUpperCase();
  const homepage = data.links.homepage[0];
  const image = data.image.small;
  const currentPrice = moneyConverter(
    data.market_data.current_price[currency],
    2,
    false
  ).toLocaleString();
  const athPrice = data.market_data.ath[currency].toLocaleString();
  const athDate = timeFormatter(new Date(data.market_data.ath_date[currency]));
  const atlPrice = data.market_data.atl[currency].toLocaleString();
  const atlDate = timeFormatter(new Date(data.market_data.atl_date[currency]));
  const percentage = data.market_data.price_change_percentage_24h.toFixed(2);
  const high24H = data.market_data.high_24h[currency].toLocaleString();
  const loadedData = data && !loading;

  return (
    <div className=" w-full min-h-[20rem]  h-full  rounded-3xl flex flex-col p-2">
      {loading && (
        <div className="w-full min-h-[20rem] flex justify-center items-center">
          <div className="h-14 w-14">
            <LoadingSpinner />
          </div>
        </div>
      )}
      {loadedData && (
        <>
          <div className=" h-1/2  w-full ">
            <div className=" h-1/2 w-full flex gap-3 flex-row-reverse md:flex-row md:justify-start justify-around  items-center  p-2">
              <div className=" h-20 w-20 md:h-12 md:w-12 flex justify-center items-center ">
                <Image alt="symbol" src={image} width={40} height={40} />
              </div>
              <div className=" w-full flex  justify-between items-center m-0 ">
                <div className="xl:text-xl lg:text-2xl md:text-lg sm:text-base text-sm font-bold ">
                  {name} ({coinSymbol})
                </div>
                <a
                  href={homepage}
                  className="cursor-pointer font-light text-sm text-light-text-color dark:text-card-text-gray"
                >
                  {extractUrl(homepage)}
                </a>
              </div>
            </div>
            <div className=" h-1/2  w-full border-b border-opacity-25 border-card-text-gray flex flex-col justify-center p-2 md:p-0  ">
              <div className="flex justify-between items-center  md:p-1">
                <div className="xl:text-3xl lg:text-3xl md:text-2xl sm:text-xl text-lg font-bold p-1">
                  {symbol}
                  {currentPrice}
                </div>
                <div
                  style={{
                    color: `${colorChange(parseInt(percentage), theme)}`,
                  }}
                  className="font-medium xl:text-xl lg:text-lg md:text-base sm:text-sm text-xs "
                >
                  {numberFormatter(parseInt(percentage), true, "")}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div
                  style={{ color: `${colorChange(1, theme)}` }}
                  className=" sm:text-sm text-xs p-1 text-light-text-color dark:text-card-text-gray"
                >
                  {isPortfolio ? "profit" : "High 24h:"}
                </div>
                <div className="sm:text-sm text-xs p-1">
                  {symbol}
                  {isPortfolio ? "&14056" : high24H}
                </div>
              </div>
            </div>
          </div>
          <div className=" h-2/5  ">
            <div className=" h-1/2 w-full flex justify-center items-center ">
              <div
                style={{ color: `${colorChange(1, theme)}` }}
                className="text-base pr-3"
              >
                &#9650;
              </div>
              <div className="w-full flex-col  justify-center h-1/2 mt-5">
                <div className="flex justify-between w-full ">
                  <div className="xl:text-xl lg:text-lg md:text-base sm:text-sm text-xs">
                    All time high:
                  </div>
                  <div className="xl:text-2xl lg:text-xl md:text-lg sm:text-base text-sm text-purpleb dark:text-white">
                    {symbol}
                    {athPrice}
                  </div>
                </div>
                <div className="text-light-text-color dark:text-card-text-gray xl:text-base lg:text-lg md:text-md sm:text-sm text-xs">
                  {athDate}
                </div>
              </div>
            </div>
            <div className=" h-1/2 w-full flex justify-center items-center ">
              <div
                style={{ color: `${colorChange(-1, theme)}` }}
                className="text-base pr-3 "
              >
                &#9660;
              </div>
              <div className="w-full flex-col justify-center h-1/2  ">
                <div className="flex justify-between w-full ">
                  <div className="xl:text-xl lg:text-lg md:text-base sm:text-sm text-xs">
                    All time low:
                  </div>
                  <div className="xl:text-2xl lg:text-xl md:text-lg sm:text-base text-sm text-purpleb dark:text-white">
                    {symbol}
                    {atlPrice}
                  </div>
                </div>
                <div className="text-light-text-color dark:text-card-text-gray xl:text-base lg:text-lg md:text-md sm:text-sm text-xs">
                  {athDate}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
