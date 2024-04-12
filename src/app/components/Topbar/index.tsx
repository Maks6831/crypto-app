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
import { Wrapper } from "../Wrapper";

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
      <Wrapper>
        <div className=" w-full  flex justify-between md:justify-start items-center gap-5  md:-ml-5  ">
          <div className="p-3">Coins: {active_cryptocurrencies}</div>
          <div className="p-3">Exchange: {markets}</div>
          <div className="p-3">
            Market Cap: {symbol}
            {moneyConverter(total_market_cap[currency], 2, false)}
          </div>
          <div className="p-3 hidden sm:flex gap-5 justify-center items-center">
            <div>
              Volume: {symbol}
              {moneyConverter(total_volume[currency], 2, false)}
            </div>
            <div className="hidden md:flex justify-center gap-5 items-center">
              <Cryptobar
                currency={"BTC"}
                percentage={market_cap_percentage.btc}
                color="#F7931A"
              />
              <Cryptobar
                currency={"ETH"}
                percentage={market_cap_percentage.eth}
                color="#849DFF"
              />
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
