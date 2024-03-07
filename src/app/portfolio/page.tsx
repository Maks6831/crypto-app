"use client";
import * as Yup from "yup";
import { useTheme } from "next-themes";
import { useAppDispatch, useAppSelector } from "../GlobalRedux/hooks";
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

interface Error {
  id?: string;
  amount?: string;
  date?: string;
}

export default function Portfolio() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { data, error } = useAppSelector((state) => state.coinDatePriceReducer);
  const { portfolioData } = useAppSelector((state) => state.coinPageReducer);
  const [chosenCoin, setChosenCoin] = useState<Coin | CoinPageTypes>(
    exampleAsset
  );
  const [errors, setErrors] = useState<Error>({});
  const [searchValue, setSearchValue] = useState<string>("");
  const [isAddAsset, setIsAddAsset] = useState<boolean>(true);
  const [modalCloseCheck, setModalCloseCheck] = useState<boolean>(false);
  const [localData, setLocalData] = useLocalState("dataCoinPrices", []);
  const searchData = useAppSelector((state) => state.searchReducer.data);
  const modalRef = useRef<HTMLDialogElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const arrForApi = localData
    .filter(
      (value: string, index: number) => localData.indexOf(value) === index
    )
    .map((el: { id: string }) => el.id);
  const { symbol } = useAppSelector((state) => state.currencyReducer);

  const validationSchema = Yup.object({
    id: Yup.string().oneOf(
      searchData.filter((el) => el.id).map((el) => el.name),
      (value) => {
        return value.value === ""
          ? "Please provide the ID (required)"
          : "Please choose a valid currency from the dropdown";
      }
    ),
    date: Yup.date()
      .required("Purchase date is required")
      .max(new Date(), "Please enter a historical date"),
    amount: Yup.number().moreThan(0, "Please enter a valid amount"),
  });

  const toggleModal = (isEdit: boolean, id: string) => {
    if (isEdit) {
      setIsAddAsset(false);
      const coinFromSearchData =
        portfolioData.find((el) => el.id === id) || exampleAsset;
      setChosenCoin(coinFromSearchData);
    } else {
      setChosenCoin(exampleAsset);
    }
    if (!modalRef.current) {
      return;
    }
    if (modalRef.current.hasAttribute("open")) {
      modalRef.current.close();
      setIsAddAsset(true);
      amountRef.current?.value && (amountRef.current.value = "");
      dateRef.current?.value && (dateRef.current.value = "");
      setModalCloseCheck(!modalCloseCheck);
    } else {
      modalRef.current.showModal();
    }
  };

  const saveAsset = async () => {
    const date = dateRef.current ? dateRef.current?.value : "undefined";
    const amount = amountRef.current ? amountRef.current?.value : "0";
    const parts = date.split("-");
    const dateCorrectedForAPi = parts[2] + "-" + parts[1] + "-" + parts[0];
    const isoString = date === "" ? null : new Date(date).toISOString();
    try {
      await validationSchema.validate(
        {
          id: searchValue,
          date: isoString,
          amount: isNaN(parseFloat(amount)) ? 0 : parseFloat(amount),
        },
        { abortEarly: false }
      );
      await dispatch(
        coinDatePrice({
          id: chosenCoin.id,
          date: dateCorrectedForAPi,
          amount: isNaN(parseFloat(amount)) ? 0 : parseFloat(amount),
        })
      );
      await dispatch(coinPageData(chosenCoin.id));
      toggleModal(false, "");
    } catch (error: any) {
      const newErrors: any = {};
      console.log(error.inner);
      error.inner.forEach((err: { path: string | number; message: any }) => {
        newErrors[err.path] = err.message;
        setErrors(newErrors);
      });
    }
  };

  useEffect(() => {
    arrForApi.length > 0 &&
      arrForApi.map((id: string) => dispatch(coinPageData(id)));
  }, [data]);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  useEffect(() => {
    if (error) {
      setErrors((prevErrors) => ({ ...prevErrors, date: error }));
    }
  }, [error]);
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
                {errors && errors.id && (
                  <div className=" w-full text-xs text-red-700 h-1 pb-1 opacity-0 ">
                    ghio
                  </div>
                )}
                <div className="h-14 m-2">Enter the amount you purchased</div>
                {errors && errors.amount && (
                  <div className=" w-full text-xs text-red-700 text-center pb-1 opacity-0 ">
                    {errors.amount}
                  </div>
                )}
                <div className="h-14 m-2">Select the date of purchase</div>
                {errors && errors.date && (
                  <div className=" w-full text-xs text-red-700 text-center pb-1 opacity-0 ">
                    {errors.date}
                  </div>
                )}
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
                {isAddAsset ? (
                  <div className=" w-full">
                    <Searchbar
                      isPortfolio={true}
                      isSearch={false}
                      liftStateUp={setChosenCoin}
                      modalCloseChecker={modalCloseCheck}
                      setSearchState={setSearchValue}
                    />
                    {errors && errors.id && (
                      <div className=" w-full text-xs text-red-700 text-center pb-1 ">
                        {errors.id}
                      </div>
                    )}
                  </div>
                ) : (
                  <div></div>
                )}

                <div className="w-full ">
                  <div className="m-1 py-1 relative flex ">
                    <label
                      htmlFor="amountRef"
                      className="h-12 rounded-xl leading-10 w-full"
                    >
                      <input
                        className="dark:bg-dark-button-color w-full rounded-md h-11  pl-2"
                        placeholder="Purchased Amount..."
                        name="amountRef"
                        ref={amountRef}
                        onFocus={() => setErrors({ ...errors, amount: "" })}
                      />
                    </label>
                  </div>
                  {errors && errors.amount && (
                    <div className=" w-full text-xs text-red-700 text-center pb-1 ">
                      {errors.amount}
                    </div>
                  )}
                </div>
                <div className="w-full">
                  <div className="m-1 py-1 relative flex">
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
                        onFocus={() => setErrors({ ...errors, date: "" })}
                      />
                    </label>
                  </div>
                  {errors && errors.date && (
                    <div className=" w-full text-xs text-red-700 text-center pb-1 ">
                      {errors.date}
                    </div>
                  )}
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
