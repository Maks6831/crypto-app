"use client";
import React, { useEffect } from "react";
import { numberFormatter } from "@/app/Utils/numberFormatter";
import { ProgressBar } from "../Progressbar";
import { useAppSelector } from "@/app/GlobalRedux/hooks";
import { colorChange } from "@/app/Utils/colorChange";
import { useTheme } from "next-themes";

export const AssetCard = ({ id }: { id: string }) => {
  const { symbol } = useAppSelector((state) => state.currencyReducer);
  const { coins } = useAppSelector((state) => state.tableReducer);
  const { theme } = useTheme();
  const coin = coins.length > 0 && coins.find((el) => el.id === id);
  const percentage =
    coins.length > 0 && coin && (coin.total_volume / coin.market_cap) * 100;
  useEffect(() => {
    console.log(coins);
    console.log(coin);
    console.log(percentage);
  }, []);
  return (
    <div className="w-11/12 bg-light-text-color-two  min-h-[18rem] my-3 p-3 flex flex-col md:flex-row  rounded-lg ">
      <div className=" w-full md:w-3/12 flex justify-center items-center dark:bg-volume-background">
        <div className="flex flex-row-reverse md:flex-col justify-between w-full md:justify-center items-center">
          <div>Image</div>
          <div className="font-bold text-2xl">{coin && coin.name}</div>
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
                  {coin && coin.current_price}
                </div>
              </div>
              <div className="flex h-20 sm:h-fit justify-center m-2 p-1 border border-opacity-20 border-card-text-gray md:border-none items-center flex-col">
                <div className=" text-sm font-normal dark:text-card-text-gray">
                  Price Change 24h
                </div>
                <div
                  style={{
                    color: `${
                      coin && colorChange(coin.price_change_24h, theme)
                    }`,
                  }}
                  className=" text-base"
                >
                  {coin &&
                    numberFormatter(coin.price_change_24h, false, symbol)}
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
                    percentage={typeof percentage === "number" ? percentage : 0}
                    color="rgba(1, 241, 227, 1)"
                    size="min-w-full h-1.5"
                    backgroundColor="bg-card-text-gray"
                  />
                </div>
              </div>
              <div className="flex h-20 sm:h-fit justify-center m-2 p-1 border border-opacity-20 border-card-text-gray md:border-none items-center flex-col">
                <div className=" text-sm font-normal dark:text-card-text-gray text-center">
                  Circ Supply vs Max Supply
                </div>
                <div className="text-positive">$56,428</div>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-2 border-card-text-gray border-opacity-40 my-4 w-full rounded-xl"></hr>
        <div className="flex w-full h-1/2 flex-col">
          <div className="flex justify-between">
            <div className="font-medium text-xl">Your Coin</div>
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
          <div className="w-full   flex justify-between ">
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
        </div>
      </div>
    </div>
  );
};
