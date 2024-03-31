"use client";
import React, { use, useEffect, useState } from "react";
import { ProgressBar } from "../Progressbar";
import Image from "next/image";
import bitcoin from "@/app/images/bitcoin-btc-logo.png";
import ethereum from "@/app/images/ethLogo.png";
import { Cryptobar } from "../CryptoBar";
import { useAppDispatch, useAppSelector } from "@/app/GlobalRedux/hooks";
import { globalData } from "@/app/GlobalRedux/Features/GlobalData/globalSlice";
import { moneyConverter } from "@/app/Utils/moneyConverter";

export const Topbar = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.globalReducer);
  const { currency, symbol } = useAppSelector((state) => state.currencyReducer);
  const {
    active_cryptocurrencies,
    total_market_cap,
    markets,
    market_cap_percentage,
    total_volume,
  } = data;

  useEffect(() => {
    dispatch(globalData());
  }, []);

  return (
    <div className="w-full text-xs font-medium h-12  bg-purpleb text-white  flex justify-center items-center dark:bg-purplea">
      <div className=" w-full  flex justify-between sm:justify-center  items-center m-2">
        <div className="p-3">Coins: {active_cryptocurrencies}</div>
        <div className="p-3">Exchange: {markets}</div>
        <div className="p-3">
          {symbol}
          {moneyConverter(total_market_cap[currency], 2, false)}
        </div>
        <div className="p-3 hidden sm:flex justify-center items-center">
          <div>
            {symbol}
            {moneyConverter(total_volume[currency], 2, false)}
          </div>
          <div className="">
            <ProgressBar
              percentage={
                (+total_volume[currency] / +total_market_cap[currency]) * 100
              }
              color={"white"}
              size={"w-12 h-2 "}
              backgroundColor={"bg-zinc-500"}
            />
          </div>
          <div className="hidden md:flex justify-center items-center">
            <Cryptobar
              currency={bitcoin}
              percentage={market_cap_percentage.btc}
              color="#F7931A"
            />
            <Cryptobar
              currency={ethereum}
              percentage={market_cap_percentage.eth}
              color="#849DFF"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
