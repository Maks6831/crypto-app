"use client";
import React, { useEffect, useState } from "react";
import { numberFormatter } from "@/app/Utils/numberFormatter";
import { ProgressBar } from "../Progressbar";
import { useAppSelector } from "@/app/GlobalRedux/hooks";
import { colorChange } from "@/app/Utils/colorChange";
import { useTheme } from "next-themes";
import { CoinPageTypes, coinPage } from "@/app/types/CoinPageTypes";
import Image from "next/image";
import { DatePriceObj } from "@/app/types/DatePriceTypes";
import { PortfolioCard } from "../PortfolioCard";

export const AssetCard = ({
  id,
  date,
  array,
  toggleModal,
  uid,
}: {
  id: string;
  date: string;
  array: DatePriceObj[];
  toggleModal: Function;
  uid: string;
}) => {
  const { symbol, currency } = useAppSelector((state) => state.currencyReducer);
  const { portfolioData } = useAppSelector((state) => state.coinPageReducer);
  const { coins } = useAppSelector((state) => state.tableReducer);
  const { theme } = useTheme();
  const [coin, setCoin] = useState<CoinPageTypes>(coinPage);
  const [isLoaded, setIsLoading] = useState<boolean>(false);
  const {
    current_price,
    market_cap,
    total_volume,
    circulating_supply,
    total_supply,
    price_change_24h_in_currency,
  } = coin.market_data;
  const volumePercentage =
    (total_volume[currency] / market_cap[currency]) * 100;
  const supplyPercentage = (circulating_supply / total_supply) * 100;

  useEffect(() => {
    if (portfolioData.length >= array.length) {
      const currenMarketCoin =
        portfolioData.find((el) => el.id === id) || coinPage;
      setCoin(currenMarketCoin);
    }
  }, [portfolioData]);

  useEffect(() => {
    coin !== coinPage ? setIsLoading(true) : null;
  }, [coin]);

  return (
    <div className="w-11/12 bg-light-text-color-two  min-h-[18rem] my-3 p-3 flex flex-col md:flex-row  rounded-lg ">
      {isLoaded && coin !== coinPage && (
        <>
          <div className=" w-full md:w-3/12 flex  justify-center items-center dark:bg-volume-background">
            <div className="flex flex-row-reverse md:flex-col  justify-between w-full md:justify-center items-center ">
              <div className="m-3 h-16 w-16 flex justify-center items-center dark:bg-symbol-background rounded-md">
                <Image
                  src={coin.image.small}
                  alt="coin symbol"
                  width={32}
                  height={32}
                />
              </div>
              <div className="font-bold text-2xl">
                {coin.name}({coin.symbol.toLocaleUpperCase()})
              </div>
            </div>
          </div>
          <div className="w-full md:w-9/12 p-2 flex flex-col justify-center items-center">
            <div className="flex w-full h-1/2 flex-col">
              <div className="flex justify-between">
                <div className="font-medium text-xl">Market Price</div>
                <div className="w-10 h-10 rounded-md flex justify-center items-center dark:bg-edit-button-color">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </div>
              </div>
              <div className="w-full  h-1/2 flex justify-between">
                <div className=" md:flex justify-around  w-1/2">
                  <div className="flex h-20 sm:h-fit justify-center m-2 p-1 border border-opacity-20 border-card-text-gray md:border-none items-center flex-col">
                    <div className=" text-sm font-normal dark:text-card-text-gray">
                      current Price
                    </div>
                    <div className=" text-positive text-base">
                      {symbol}
                      {current_price[currency].toLocaleString()}
                    </div>
                  </div>
                  <div className="flex h-20 sm:h-fit justify-center m-2 p-1 border border-opacity-20 border-card-text-gray md:border-none items-center flex-col">
                    <div className=" text-sm font-normal dark:text-card-text-gray">
                      Price Change 24h
                    </div>
                    <div
                      style={{
                        color: `${
                          coin &&
                          colorChange(
                            price_change_24h_in_currency[currency],
                            theme
                          )
                        }`,
                      }}
                      className=" text-base"
                    >
                      {coin &&
                        numberFormatter(
                          price_change_24h_in_currency[currency],
                          false,
                          symbol
                        )}
                    </div>
                  </div>
                </div>
                <div className=" md:flex justify-around  w-1/2">
                  <div className="flex h-20 sm:h-fit justify-center m-2 p-1 border border-opacity-20 border-card-text-gray md:border-none items-center flex-col">
                    <div className=" text-sm font-normal dark:text-card-text-gray text-center">
                      Volume vs Market Cap
                    </div>
                    <div className="w-full">
                      <ProgressBar
                        percentage={
                          typeof volumePercentage === "number"
                            ? volumePercentage
                            : 0
                        }
                        color="rgba(1, 241, 227, 1)"
                        size="min-w-full h-1.5"
                        backgroundColor="bg-positive bg-opacity-50"
                      />
                    </div>
                  </div>
                  <div className="flex h-20 sm:h-fit justify-center m-2 p-1 border border-opacity-20 border-card-text-gray md:border-none items-center flex-col">
                    <div className=" text-sm font-normal dark:text-card-text-gray text-center">
                      Circ Supply vs Max Supply
                    </div>
                    <div className="text-positive">
                      {supplyPercentage.toPrecision(3)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="border-2 border-card-text-gray border-opacity-40 my-4 w-full rounded-xl"></hr>
            <div className="flex w-full h-1/2 flex-col">
              <div className="flex justify-between">
                <div className="font-medium text-xl">Your Coin</div>
                <div
                  onClick={() => toggleModal(true, coin.id, date, uid)}
                  className="w-10 h-10 rounded-md flex justify-center items-center dark:bg-edit-button-color cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </div>
              </div>
              <PortfolioCard
                id={id}
                date={date}
                currentMarketPrice={current_price}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
