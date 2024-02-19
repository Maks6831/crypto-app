"use client";
import { useAppSelector } from "@/app/GlobalRedux/hooks";
import { moneyConverter } from "@/app/Utils/moneyConverter";
import { timeFormatter } from "@/app/Utils/timeFormatter";
import React, { useEffect } from "react";
import { AnimatingNumber } from "../AnimatingNumber";

export const CoinInfoContainer = ({
  isPrice,
  isCoinPage,
  currentPrice,
}: {
  currentPrice: number;
  isPrice: boolean;
  isCoinPage: boolean;
}) => {
  const { coinName } = useAppSelector((state) => state.coinReducer);
  const { coin } = useAppSelector((state) => state.coinReducer);
  const { prices, market_caps } = useAppSelector((state) => state.priceChart);
  const { symbol } = useAppSelector((state) => state.currencyReducer);

  return (
    <div
      className={` h-1/6  absolute p-2  ${
        isCoinPage ? "md:left-28 md:top-4" : "md:left-6 md:top-6"
      } left-2 top-2  flex md:block justify-between  w-11/12`}
    >
      <div className="font-normal pb-2 lg:mb-3 text-xs sm:text-base md:text-lg lg:text-xl leading-6 text-light-text-color-two dark:text-card-text-gray ">
        {isPrice ? coinName : "Volume 24h"}
      </div>
      <div className="">
        <div className=" flex items-center justify-end font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 leading-7 text-light-text-color-three dark:text-white">
          {symbol}
          {isPrice && coin ? (
            isPrice && currentPrice ? (
              currentPrice && currentPrice < 1 && currentPrice > 0.85 ? (
                currentPrice
                  .toString()
                  .slice(0, currentPrice.toString().indexOf(".") + 3)
              ) : (
                <AnimatingNumber
                  value={
                    currentPrice < 0.1
                      ? parseFloat(
                          currentPrice.toExponential().split("e")[0]
                        ).toFixed(2)
                      : currentPrice > 1
                      ? currentPrice.toFixed(2)
                      : currentPrice
                          .toString()
                          .slice(0, currentPrice.toString().indexOf(".") + 3)
                  }
                />
              )
            ) : (
              moneyConverter(+prices[prices.length - 1], 3, false)
            )
          ) : (
            moneyConverter(market_caps[market_caps.length - 1], 3, false)
          )}
          {isPrice && currentPrice && currentPrice < 0.1 ? (
            <div className="text-sm m-2">
              {"  x10"}
              <sup>{currentPrice.toExponential().split("e")[1]}</sup>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="font-normal text-xs md:text-sm lg:text-base text-light-text-color  ">
          {timeFormatter(new Date())}
        </div>
      </div>
    </div>
  );
};
