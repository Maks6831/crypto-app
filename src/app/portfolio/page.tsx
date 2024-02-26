"use client";

import { useTheme } from "next-themes";
import { useAppSelector } from "../GlobalRedux/hooks";
import { numberFormatter } from "../Utils/numberFormatter";
import { ProgressBar } from "../components/Progressbar";
import { Wrapper } from "../components/Wrapper";
import { AssetCard } from "../components/AssetCard";
import { useEffect, useState } from "react";
import { useLocalState } from "../Utils/Hooks/useLocalState";

export default function Portfolio() {
  const { theme } = useTheme();
  const { data } = useAppSelector((state) => state.coinDatePriceReducer);
  const [localData, setLocalData] = useLocalState("dataCoinPrices", []);
  const arr = ["bitcoin", "ethereum"];
  const { symbol } = useAppSelector((state) => state.currencyReducer);

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <Wrapper>
      <div className="w-full min-h-screen justify-start items-center flex flex-col">
        <div className="w-11/12  h-24 md:h-12 flex flex-col md:flex-row items-center justify-between my-3  font-medium text-xl ">
          <div>Your Statistics</div>
          <button className="w-56 h-10 md:h-full  flex justify-center items-center dark:bg-carousel-button-color-two dark:bg-opacity-50 rounded-md dark:border-carousel-button-color-one dark:border-opacity-20 shadow-lg dark:shadow-border-carousel-button-color-one">
            <div className="font-medium text-base">Add Asset</div>
          </button>
        </div>
        <div className="w-full h-max flex flex-col items-center  justify-center ">
          {data.map((el: any) => (
            <AssetCard key={el.id} id={el.id} />
          ))}
        </div>
      </div>
    </Wrapper>
  );
}
