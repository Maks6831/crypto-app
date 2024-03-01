"use client";

import { useTheme } from "next-themes";
import { useAppDispatch, useAppSelector } from "../GlobalRedux/hooks";
import { numberFormatter } from "../Utils/numberFormatter";
import { ProgressBar } from "../components/Progressbar";
import { Wrapper } from "../components/Wrapper";
import { AssetCard } from "../components/AssetCard";
import { useEffect, useRef, useState } from "react";
import { useLocalState } from "../Utils/Hooks/useLocalState";
import { coinPageData } from "../GlobalRedux/Features/CoinPage/coinPageSlice";
import { coinDatePrice } from "../GlobalRedux/Features/CoinDatePrice/coinDateSlice";
import { DatePriceObj } from "../types/DatePriceTypes";
import { Searchbar } from "../components/Searchbar";

export default function Portfolio() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.coinDatePriceReducer);
  const [localData, setLocalData] = useLocalState("dataCoinPrices", []);
  const modalRef = useRef<HTMLDialogElement>(null);
  const arrForApi = localData
    .filter(
      (value: string, index: number) => localData.indexOf(value) === index
    )
    .map((el: { id: string }) => el.id);
  const { symbol } = useAppSelector((state) => state.currencyReducer);

  const toggleModal = () => {
    if (!modalRef.current) {
      return;
    }
    modalRef.current.hasAttribute("open")
      ? modalRef.current.close()
      : modalRef.current.showModal();
    //dispatch(
    //  coinDatePrice({ id: "tether", date: "13-05-2023", amount: 0.00015 })
    //);
    //console.log("addAsset");
  };

  useEffect(() => {
    setLocalData(data);
    console.log(data);
  }, [data]);

  useEffect(() => {
    arrForApi.length > 0 &&
      arrForApi.map((id: string) => dispatch(coinPageData(id)));
  }, [data]);

  return (
    <Wrapper>
      <div className="w-full min-h-screen justify-start items-center flex flex-col">
        <div className="w-11/12  h-24 md:h-12 flex flex-col md:flex-row items-center justify-between my-3  font-medium text-xl ">
          <div>Your Statistics</div>
          <button
            onClick={toggleModal}
            className="w-56 h-10 md:h-full  flex justify-center items-center dark:bg-carousel-button-color-two dark:bg-opacity-50 rounded-md dark:border-carousel-button-color-one dark:border-opacity-20 shadow-lg dark:shadow-border-carousel-button-color-one"
          >
            <div className="font-medium text-base">Add Asset</div>
          </button>
        </div>
        <div className="w-full h-max flex flex-col items-center  justify-center ">
          {data.map((el: any, index: number, arr: DatePriceObj[]) => (
            <AssetCard
              key={el.id}
              id={el.id}
              date={el.date}
              index={index + 1}
              array={arr}
            />
          ))}
        </div>
      </div>
      <dialog
        className="w-3/5 backdrop:backdrop-blur-lg  bg-dark-background rounded-3xl h-96  p-6 "
        ref={modalRef}
      >
        <div className="w-full h-full justify-center   items-center flex flex-col">
          <div className=" flex m-3 w-11/12 justify-between">
            <div>Select coin</div>
            <button onClick={toggleModal}>
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
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
          <div className="flex  w-10/12 justify-between items-center">
            <div>Choose coin</div>
            <div className=" w-1/2">
              <Searchbar isPortfolio={true} isSearch={false} defaultValue="" />
            </div>
          </div>
          <div className="flex  w-10/12 justify-between items-center">
            <div>Purchase Amount</div>
            <div className="w-1/2">
              <div className="md:m-2">
                <label className="scrollbar-w-full">
                  <input
                    className="dark:bg-dark-button-color w-full rounded-md h-11  pl-2"
                    placeholder="Purchased Amount..."
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="flex  w-10/12 justify-between items-center">
            <div>Date purchased</div>
            <div className="w-1/2">
              <div className="md:m-2">
                <label className="scrollbar-w-full">
                  <input
                    className="dark:bg-dark-button-color w-full rounded-md h-11  pl-2"
                    placeholder="Purchase date..."
                  />
                </label>
              </div>
            </div>
          </div>
          <button>Save</button>
        </div>
      </dialog>
    </Wrapper>
  );
}
