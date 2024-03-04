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
import { Coin, exampleAsset } from "../types/searchTypes";
import Image from "next/image";
import { CoinPageTypes } from "../types/CoinPageTypes";

export default function Portfolio() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.coinDatePriceReducer);
  const { portfolioData } = useAppSelector((state) => state.coinPageReducer);
  const searchData = useAppSelector((state) => state.searchReducer.data);
  const [chosenCoin, setChosenCoin] = useState<Coin | CoinPageTypes>(
    exampleAsset
  );
  const [modalCloseCheck, setModalCloseCheck] = useState<boolean>(false);
  const [localData, setLocalData] = useLocalState("dataCoinPrices", []);
  const modalRef = useRef<HTMLDialogElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const arrForApi = localData
    .filter(
      (value: string, index: number) => localData.indexOf(value) === index
    )
    .map((el: { id: string }) => el.id);
  const { symbol } = useAppSelector((state) => state.currencyReducer);

  const toggleModal = (isEdit: boolean, id: string) => {
    if (isEdit) {
      const coinFromSearchData =
        portfolioData.find((el) => el.id === id) || exampleAsset;
      console.log(coinFromSearchData);
      setChosenCoin(coinFromSearchData);
    } else {
      setChosenCoin(exampleAsset);
    }

    if (!modalRef.current) {
      return;
    }
    if (modalRef.current.hasAttribute("open")) {
      modalRef.current.close();
      amountRef.current?.value && (amountRef.current.value = "");
      dateRef.current?.value && (dateRef.current.value = "");
      setModalCloseCheck(!modalCloseCheck);
    } else {
      modalRef.current.showModal();
    }
  };

  const saveAsset = () => {
    if (
      chosenCoin !== exampleAsset &&
      amountRef.current?.value &&
      dateRef.current?.value
    ) {
      const parts = dateRef.current.value.split("-");
      const dateCorrectedForAPi = parts[2] + "-" + parts[1] + "-" + parts[0];
      dispatch(
        coinDatePrice({
          id: chosenCoin.id,
          date: dateCorrectedForAPi,
          amount: parseFloat(amountRef.current?.value),
        })
      );
      dispatch(coinPageData(chosenCoin.id));

      toggleModal(false, "");
    }
  };

  useEffect(() => {
    arrForApi.length > 0 &&
      arrForApi.map((id: string) => dispatch(coinPageData(id)));
  }, [data]);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  return (
    <Wrapper>
      <div className="w-full min-h-screen justify-start items-center flex flex-col">
        <div className="w-11/12  h-24 md:h-12 flex flex-col md:flex-row items-center justify-between my-3  font-medium text-xl ">
          <div>Your Statistics</div>
          <button
            onClick={() => toggleModal(false, "")}
            className="w-56 h-10 md:h-full  flex justify-center items-center dark:bg-carousel-button-color-two dark:bg-opacity-50 rounded-md dark:border-carousel-button-color-one dark:border-opacity-20 shadow-lg dark:shadow-border-carousel-button-color-one"
          >
            <div className="font-medium text-base">Add Asset</div>
          </button>
        </div>
        <div className="w-full h-max flex flex-col items-center  justify-center ">
          {data &&
            data.map((el: any, index: number, arr: DatePriceObj[]) => (
              <AssetCard
                key={el.id}
                id={el.id}
                date={el.date}
                index={index + 1}
                array={arr}
                toggleModal={toggleModal}
              />
            ))}
        </div>
      </div>
      <dialog
        className="  w-11/12 md:w-4/5 backdrop:delay-1000 p-3 lg:w-7/12 2xl:w-2/5 backdrop:backdrop-blur-lg  bg-dark-background rounded-3xl h-max min-[580px]:h-[22rem] py-10 "
        ref={modalRef}
      >
        <div className="w-full h-full justify-center  items-center flex flex-col">
          <div className=" flex m-3 w-11/12 justify-between">
            <div>Select coin</div>
            <button onClick={() => toggleModal(false, "")}>
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
          <div className="flex flex-col h-full   min-[580px]:flex-row w-10/12 justify-between items-center">
            {chosenCoin && chosenCoin === exampleAsset ? (
              <div className="w-5/12 min-[580px]:flex  flex-col justify-start  h-full hidden  ">
                <div className="h-14 pt-1 m-2">Select a cryptocurrency</div>
                <div className="h-14 m-2">Enter the amount you purchased</div>
                <div className="h-14 m-2">Select the date of purchase</div>
              </div>
            ) : (
              <div className="m-2  w-full h-full  min-[580px]:w-5/12">
                <div className=" flex w-full  h-full rounded-xl   justify-center items-center dark:bg-volume-background">
                  <div className="flex flex-row-reverse  min-[580px]:flex-col justify-between w-full  min-[580px]:justify-center items-center ">
                    <div className="m-3 h-16 w-16 flex justify-center items-center dark:bg-symbol-background rounded-md">
                      <Image
                        src={
                          "image" in chosenCoin
                            ? chosenCoin.image.large
                            : chosenCoin.large
                        }
                        alt="coin symbol"
                        width={32}
                        height={32}
                      />
                    </div>
                    <div className=" text-center pl-3 min-[580px]:pl-0 font-bold flex justify-center items-center xl:text-2xl lg:text-sm text-base ">
                      <div className=" whitespace-nowrap xl:text-xl lg:text-lg text-base">
                        {chosenCoin.name}
                      </div>
                      <div className="hidden md:flex xl:text-xl lg:text-lg text-bas">
                        ({chosenCoin.symbol.toLocaleUpperCase()})
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className=" min-w-full w-full h-full flex flex-col justify-between min-[580px]:min-w-0  min-[580px]:w-7/12 ">
              <div className=" w-full flex flex-col justify-between">
                <div className=" w-full">
                  <Searchbar
                    isPortfolio={true}
                    isSearch={false}
                    liftStateUp={setChosenCoin}
                    modalCloseChecker={modalCloseCheck}
                  />
                </div>
                <div className="w-full ">
                  <div className="m-2 relative flex ">
                    <label
                      htmlFor="amountRef"
                      className="h-12 rounded-xl leading-10 w-full"
                    >
                      <input
                        className="dark:bg-dark-button-color w-full rounded-md h-11  pl-2"
                        placeholder="Purchased Amount..."
                        name="amountRef"
                        ref={amountRef}
                      />
                    </label>
                  </div>
                </div>
                <div className="w-full">
                  <div className="m-2 relative flex">
                    <label
                      htmlFor="dateRef"
                      className="h-12 rounded-xl leading-10 w-full"
                    >
                      <input
                        className="dark:bg-dark-button-color w-full rounded-md h-11  pl-2"
                        placeholder="Purchase date..."
                        name="dateRef"
                        ref={dateRef}
                        type="date"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="w-full flex ">
                <div className="w-1/2 flex justify-center items-center">
                  <button
                    onClick={() => toggleModal(false, "")}
                    className=" dark:bg-timebar-background-color rounded-md h-11 w-11/12 "
                  >
                    Cancel
                  </button>
                </div>
                <div className="w-1/2 flex justify-center items-center">
                  <button
                    onClick={saveAsset}
                    className=" bg-carousel-button-color-one bg-opacity-40  w-11/12 h-11 rounded-md text-sm lg:text-base "
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </Wrapper>
  );
}
