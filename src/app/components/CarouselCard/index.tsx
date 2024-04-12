import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/app/GlobalRedux/hooks";
import {
  changeCoin,
  changeName,
} from "@/app/GlobalRedux/Features/CurrentCoin/coinSlice";
import { numberFormatter } from "@/app/Utils/numberFormatter";
import { useTheme } from "next-themes";
import { colorChange } from "@/app/Utils/colorChange";
import { useRouter } from "next/navigation";

export const CarouselCard = ({
  index,
  symbol,
  name,
  percentageChange,
  currentPrice,
  source,
  carIndex,
  coinKey,
  isCoinPage,
  id,
}: {
  index: number;
  symbol: string;
  name: string;
  percentageChange: number;
  currentPrice: number;
  source: string;
  carIndex: number;
  coinKey: string;
  isCoinPage: boolean;
  id: string;
}) => {
  const dispatch = useAppDispatch();
  const currency = useAppSelector((state) =>
    state.currencyReducer.currency.toUpperCase()
  );
  const { coin } = useAppSelector((state) => state.coinReducer);
  const router = useRouter();
  const displayElement = index >= carIndex - 1 && index < carIndex + 4;
  const firstCard = index === carIndex - 1;
  const lastCard = index === carIndex + 3;
  const displayColor = percentageChange > 0 ? "#01F1E3" : "#FE2264";
  const { theme } = useTheme();

  const goToPage = () => {
    router.push(`/coins/${id}`);
  };

  const selectCoin = () => {
    dispatch(changeCoin(coinKey));
    dispatch(changeName(name));
  };

  const selectClass = () => {
    return coin === coinKey
      ? "bg-carousel-button-color-two bg-opacity-50 shadow-md shadow-carousel-button-color"
      : "bg-white dark:bg-dark-card";
  };

  return (
    <div
      onClick={isCoinPage ? goToPage : selectCoin}
      className={
        displayElement
          ? `${
              firstCard ? "mr-1" : lastCard ? "ml-1" : "mx-1"
            } my-1 h-10 md:h-20 overflow-hidden w-full rounded-2xl  md:rounded-3xl  cursor-pointer ${
              isCoinPage ? "bg-white dark:bg-dark-card " : selectClass()
            }`
          : "hidden"
      }
    >
      <div className="flex  h-full w-full p-0 md:p-2 justify-center items-center ">
        <div className="flex w-1/3 md:w-1/4 h-10 ml-1 items-center justify-center relative">
          <Image src={source} alt={name} layout="fill" objectFit="contain" />
        </div>
        <div className="w-2/3 md:w-3/4 flex  flex-col p-1 md:p-0 justify-start  lg:p-1 md:pl-3 lg:pl-5 ">
          <div className=" justify-start items-center font-medium text-xs md:text-sm hidden md:block overflow-hidden overflow-ellipsis whitespace-nowrap">
            {name}&nbsp;({symbol.toUpperCase()})
          </div>
          <div className="text-xs md:text-base md:hidden block overflow-hidden overflow-ellipsis">
            {symbol.toUpperCase()}
          </div>
          <div className="flex justify-between items-center lg:flex-row-reverse text-xs">
            <div
              className="md:px-0 lg:px-1 xl:px-2 py-2 whitespace-nowrap hidden lg:flex  font-light"
              style={{ color: `${colorChange(percentageChange, theme)}` }}
            >
              {numberFormatter(percentageChange, true, "")}
            </div>
            <div className="md:px-0  py-2 font-light text-light-text-color dark:text-card-text-gray hidden md:flex text-xs ">
              {currentPrice.toFixed(2)}&nbsp;{currency}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
