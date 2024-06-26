"use client";
import * as Yup from "yup";
import { useTheme } from "next-themes";
import { useAppDispatch, useAppSelector } from "../GlobalRedux/hooks";
import { Wrapper } from "../components/Wrapper";
import { AssetCard } from "../components/AssetCard";
import { useEffect, useRef, useState } from "react";
import { useLocalState } from "../Utils/Hooks/useLocalState";
import { coinPageData } from "../GlobalRedux/Features/CoinPage/coinPageSlice";
import {
  DatePriceAttributes,
  coinDatePrice,
  deleteCoin,
} from "../GlobalRedux/Features/CoinDatePrice/coinDateSlice";
import { DatePriceObj, DatePriceType } from "../types/DatePriceTypes";
import { Searchbar } from "../components/Searchbar";
import { Coin, exampleAsset } from "../types/searchTypes";
import Image from "next/image";
import { CoinPageTypes } from "../types/CoinPageTypes";
import { dateConverter } from "../Utils/dateConverter";
import { v4 as uuidv4 } from "uuid";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PortfolioHeader } from "../components/PortFolioHeader";
import { referenceData } from "../Utils/localData";

interface Error {
  id?: string;
  amount?: string;
  date?: string;
}
const initialisedError: Error = {
  id: "",
  amount: "",
  date: "",
};

export default function Portfolio() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { data, error } = useAppSelector((state) => state.coinDatePriceReducer);
  const apiLoading = useAppSelector(
    (state) => state.coinDatePriceReducer.loading
  );
  const { portfolioData, loading } = useAppSelector(
    (state) => state.coinPageReducer
  );
  const [chosenCoin, setChosenCoin] = useState<Coin | DatePriceObj>(
    exampleAsset
  );
  const [errors, setErrors] = useState<Error>(initialisedError);
  const [animation, setAnimation] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isAddAsset, setIsAddAsset] = useState<boolean>(true);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [modalCloseCheck, setModalCloseCheck] = useState<boolean>(false);
  const [amountValue, setAmountValue] = useState<string>("");
  const [dateValue, setDateValue] = useState<string>("");
  const [localData, setLocalData] = useLocalState(
    "dataCoinPrices",
    referenceData
  );
  const searchData = useAppSelector((state) => state.searchReducer.data);
  const loadingTwo = useAppSelector((state) => state.searchReducer.loading);
  const modalRef = useRef<HTMLDialogElement>(null);
  const arrForApi = localData
    .filter(
      (value: string, index: number) => localData.indexOf(value) === index
    )
    .map((el: { id: string }) => el.id);
  const { symbol } = useAppSelector((state) => state.currencyReducer);

  const validationSchema = Yup.object({
    isAddAsset: Yup.boolean().required(),
    id: Yup.string().when("isAddAsset", {
      is: true,
      then: (schema) =>
        schema.required().oneOf(
          searchData.filter((el) => el.id).map((el) => el.name),
          (value) => {
            return value.value === ""
              ? "Please provide the ID (required)"
              : "Please choose a valid currency from the dropdown";
          }
        ),
      otherwise: (schema) => schema.notRequired(),
    }),

    date: Yup.date()
      .required("Purchase date is required")
      .max(new Date(), "Please enter a historical date"),
    amount: Yup.number().moreThan(0, "Please enter a valid amount"),
  });

  const toggleModal = (
    isEdit: boolean,
    id: string,
    date: string,
    uid: string
  ) => {
    setErrors(initialisedError);
    const coinFromLocalData = data.find((el) => el.uid === uid) || exampleAsset;
    if (isEdit) {
      setIsAddAsset(false);
      setChosenCoin(coinFromLocalData);
      if (coinFromLocalData !== exampleAsset) {
        setAmountValue(coinFromLocalData.amount?.toString() || "");
        setDateValue(dateConverter(coinFromLocalData.date || "") || "");
      }
    } else if (id === "") {
      setChosenCoin(exampleAsset);
    } else if (id === "delete!") {
      setChosenCoin(coinFromLocalData);
      setDeleteModal(true);
    }
    if (!modalRef.current) {
      return;
    }
    if (modalRef.current.hasAttribute("open")) {
      modalRef.current.close();
      setIsAddAsset(true);
      setModalCloseCheck(!modalCloseCheck);
      if (deleteModal) {
        setDeleteModal(false);
      }
      setAmountValue("");
      setDateValue("");
    } else {
      deleteModal ? modalRef.current.show() : modalRef.current.showModal();
    }
  };

  const saveAsset = async () => {
    const date = dateValue;
    const amount = amountValue;
    const uid = chosenCoin.uid ? chosenCoin.uid : uuidv4();
    const dateCorrectedForAPi = dateConverter(date);
    const isoString = date === "" ? null : new Date(date).toISOString();
    try {
      await validationSchema.validate(
        {
          isAddAsset: isAddAsset,
          id: searchValue,
          date: isoString,
          amount: isNaN(parseFloat(amount)) ? 0 : parseFloat(amount),
        },
        { abortEarly: false }
      );
      const values: DatePriceAttributes = {
        id: chosenCoin.id,
        date: dateCorrectedForAPi,
        amount: isNaN(parseFloat(amount)) ? 0 : parseFloat(amount),
        uid: uid,
      };
      await dispatch(coinDatePrice(values)).unwrap();
      await dispatch(coinPageData(chosenCoin.id)).unwrap();
      console.log("before if", errors);
      if (Object.values(errors).every((value) => value === "")) {
        console.log("after", errors);
        toggleModal(false, "", "", "");
      }
    } catch (error: any) {
      console.log(error);
      const newErrors: any = {};
      if (error.inner) {
        error.inner.forEach((err: { path: string | number; message: any }) => {
          newErrors[err.path] = err.message;
          setErrors(newErrors);
        });
      } else if (error.errorMessage) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          date: error.errorMessage,
        }));
      }
    }
  };

  const deleteAssetCard = async (id: string | undefined) => {
    await dispatch(deleteCoin(id));
    toggleModal(false, "", "", "");
  };

  useEffect(() => {
    arrForApi.length > 0 &&
      arrForApi.map((id: string) => dispatch(coinPageData(id)));
    setLocalData(data);
  }, [data]);

  useEffect(() => {
    setErrors((prevErrors) => ({ ...prevErrors, id: "" }));
  }, [searchValue]);

  useEffect(() => {
    console.log(apiLoading);
  }, [apiLoading]);

  return (
    <Wrapper>
      <div className="w-full min-h-screen justify-start items-center flex flex-col">
        <div className="w-full h-24 md:h-12 flex flex-col md:flex-row items-center justify-between my-3  font-medium text-xl ">
          <div>Your Statistics</div>
          <button
            onClick={() => toggleModal(false, "", "", "")}
            className="w-56 h-10 md:h-full  flex justify-center items-center bg-portfolio-button-color bg-opacity-50 dark:bg-carousel-button-color-two dark:bg-opacity-50 rounded-2xl dark:border-carousel-button-color-one dark:border-opacity-20 shadow-lg dark:shadow-border-carousel-button-color-one"
          >
            <div className="font-medium text-base">Add Asset</div>
          </button>
        </div>
        {data && data.length === 0 && !loading && <PortfolioHeader />}
        {loading && (
          <div className="w-full min-h-[20rem] flex justify-center items-center">
            <div className="md:w-5/12 flex justify-center items-center">
              <div className="w-14 h-14">
                <LoadingSpinner />
              </div>
            </div>
          </div>
        )}
        <div className="w-full h-max flex flex-col items-center  justify-center ">
          {data &&
            !loading &&
            data.map((el: any, index, arr: DatePriceObj[]) => (
              <AssetCard
                key={el.id}
                id={el.id}
                date={el.date}
                array={arr}
                toggleModal={toggleModal}
                uid={el.uid}
              />
            ))}
        </div>
      </div>
      <dialog
        className={` ${
          deleteModal
            ? " max-w-7 h-60 p-3  "
            : " w-11/12 md:w-4/5   lg:w-7/12 2xl:w-2/5  h-max min-[580px]:h-[25rem] py-10 relative "
        }   bg-white dark:bg-dark-background backdrop:backdrop-blur-lg rounded-3xl backdrop:delay-1000`}
        ref={modalRef}
      >
        {deleteModal ? (
          <div className="m-1 p-3 flex justify-between items-center flex-col h-28 text-center">
            <div>Are you sure you want to delete this coin?</div>
            <div className="flex justify-center items-center flex-col dark:text-card-text-gray">
              {chosenCoin.name}
              <div className="m-3 h-16 w-16 flex justify-center items-center bg-light-button-color bg-opacity-30 dark:bg-symbol-background rounded-md">
                <Image
                  src={
                    "image" in chosenCoin
                      ? chosenCoin.image.thumb
                      : chosenCoin.large
                  }
                  alt="coin symbol"
                  width={32}
                  height={32}
                />
              </div>
            </div>
            <div className="w-full flex ">
              <div className="w-1/2 flex justify-center items-center">
                <button
                  onClick={() => toggleModal(false, "", "", "")}
                  className=" bg-slate-100 dark:bg-timebar-background-color rounded-2xl h-11 w-11/12 "
                >
                  Cancel
                </button>
              </div>
              <div className="w-1/2 flex justify-center items-center">
                <button
                  onClick={() => deleteAssetCard(chosenCoin.uid)}
                  className=" bg-negative bg-opacity-80 w-11/12 h-11 rounded-2xl text-sm lg:text-base  "
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full justify-center items-center flex flex-col">
            <div className=" absolute top-1 right-1  flex m-3 w-11/12 justify-between">
              <div>Select coin</div>
              <button onClick={() => toggleModal(false, "", "", "")}>
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
            <div className="flex flex-col h-full    min-[580px]:flex-row w-10/12 justify-center items-center">
              {chosenCoin && chosenCoin === exampleAsset ? (
                <div className="m-2 pt-5 w-5/12 min-[580px]:flex  flex-col justify-center  h-full hidden  ">
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
                  <div className=" flex w-full  h-full rounded-3xl   justify-center items-center bg-portfolio-button-color bg-opacity-10  dark:bg-volume-background">
                    <div className="flex flex-row-reverse  min-[580px]:flex-col justify-between w-full  min-[580px]:justify-center items-center ">
                      <div className="m-3 h-16 w-16 flex justify-center items-center bg-light-button-color bg-opacity-30 dark:bg-symbol-background rounded-2xl">
                        <Image
                          src={
                            "image" in chosenCoin
                              ? chosenCoin.image.thumb
                              : chosenCoin.large
                          }
                          alt="coin symbol"
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className=" text-center pl-3 min-[580px]:pl-0 font-bold flex flex-wrap justify-center items-center xl:text-2xl lg:text-sm text-base ">
                        <div className=" whitespace-nowrap xl:text-xl lg:text-lg text-base">
                          {chosenCoin.name}
                        </div>
                        <div className="hidden md:flex xl:text-xl lg:text-lg text-base">
                          ({chosenCoin.symbol.toLocaleUpperCase()})
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className=" min-w-full w-full h-full flex flex-col justify-center min-[580px]:min-w-0  min-[580px]:w-7/12 ">
                <div className=" w-full flex flex-col justify-between">
                  {isAddAsset ? (
                    <div className=" w-full">
                      <Searchbar
                        isPortfolio={true}
                        isSearch={false}
                        liftStateUp={setChosenCoin}
                        modalCloseChecker={modalCloseCheck}
                        setSearchState={setSearchValue}
                        saveAsset={saveAsset}
                      />
                      {errors && errors.id && (
                        <div className=" w-full text-xs text-red-700 text-center pb-1 ">
                          {errors.id}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-20"></div>
                  )}

                  <div className="w-full ">
                    <div className="m-1 py-1 relative flex ">
                      <label
                        htmlFor="amountRef"
                        className="h-12 rounded-xl leading-10 w-full"
                      >
                        <input
                          className="bg-light-button-color bg-opacity-40 dark:bg-dark-button-color w-full rounded-md h-11  pl-2"
                          placeholder="Purchased Amount..."
                          name="amountRef"
                          onFocus={() => setErrors({ ...errors, amount: "" })}
                          value={amountValue}
                          onChange={(e) => setAmountValue(e.target.value)}
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
                          className="bg-light-button-color bg-opacity-40 dark:bg-dark-button-color w-full rounded-md h-11  pl-2"
                          placeholder="Purchase date..."
                          name="dateRef"
                          type="date"
                          onFocus={() => setErrors({ ...errors, date: "" })}
                          value={dateValue}
                          onChange={(e) => setDateValue(e.target.value)}
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
              </div>
            </div>
            <div className=" w-10/12  flex justify-end items-end ">
              <div className=" w-full  md:w-7/12  flex justify-end items-end">
                <div className="w-1/2 flex justify-center items-center">
                  <button
                    onClick={() => toggleModal(false, "", "", "")}
                    className=" bg-slate-100 dark:bg-timebar-background-color mr-2 rounded-2xl h-11 w-full cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
                <div className="w-1/2 flex justify-center items-center">
                  <button
                    onClick={saveAsset}
                    className=" flex justify-center items-center bg-portfolio-button-color bg-opacity-50 dark:bg-carousel-button-color-one dark:bg-opacity-40 ml-2 w-full h-11 rounded-2xl text-sm lg:text-base "
                  >
                    {apiLoading ? (
                      <div className="w-12 h-12">
                        <LoadingSpinner />
                      </div>
                    ) : (
                      "save"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </Wrapper>
  );
}
