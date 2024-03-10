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
  const [chosenCoin, setChosenCoin] = useState<Coin | DatePriceObj>(
    exampleAsset
  );
  const [errors, setErrors] = useState<Error>({});
  const [searchValue, setSearchValue] = useState<string>("");
  const [isAddAsset, setIsAddAsset] = useState<boolean>(true);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
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
    id: Yup.string().when("isEdit", {
      is: !isAddAsset,
      then: (schema) =>
        schema.oneOf(
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
    const coinFromLocalData = data.find((el) => el.uid === uid) || exampleAsset;
    if (isEdit) {
      setChosenCoin(coinFromLocalData);
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
    } else {
      deleteModal ? modalRef.current.show() : modalRef.current.showModal();
    }
  };

  const saveAsset = async () => {
    const date = dateRef.current ? dateRef.current?.value : "undefined";
    const amount = amountRef.current ? amountRef.current?.value : "0";
    console.log(chosenCoin);
    const uid = chosenCoin.uid ? chosenCoin.uid : uuidv4();
    const parts = date.split("-");
    const dateCorrectedForAPi = dateConverter(date);
    const isoString = date === "" ? null : new Date(date).toISOString();
    try {
      await validationSchema.validate(
        {
          id: chosenCoin.uid ? chosenCoin.name : searchValue,
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
          uid: uid,
        })
      );
      await dispatch(coinPageData(chosenCoin.id));
      toggleModal(false, "", "", "");
    } catch (error: any) {
      const newErrors: any = {};
      console.log(error.inner);
      error.inner.forEach((err: { path: string | number; message: any }) => {
        newErrors[err.path] = err.message;
        setErrors(newErrors);
      });
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
    if (error) {
      setErrors((prevErrors) => ({ ...prevErrors, date: error }));
    }
  }, [error]);

  useEffect(() => {
    console.log(isAddAsset);
  }, [isAddAsset]);

  return (
    <Wrapper>
      <div className="w-full min-h-screen justify-start items-center flex flex-col">
        <div className="w-11/12  h-24 md:h-12 flex flex-col md:flex-row items-center justify-between my-3  font-medium text-xl ">
          <div>Your Statistics</div>
          <button
            onClick={() => toggleModal(false, "", "", "")}
            className="w-56 h-10 md:h-full  flex justify-center items-center dark:bg-carousel-button-color-two dark:bg-opacity-50 rounded-md dark:border-carousel-button-color-one dark:border-opacity-20 shadow-lg dark:shadow-border-carousel-button-color-one"
          >
            <div className="font-medium text-base">Add Asset</div>
          </button>
        </div>
        <div className="w-full h-max flex flex-col items-center  justify-center ">
          {data &&
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
            : " w-11/12 md:w-4/5  p-3 lg:w-7/12 2xl:w-2/5  h-max min-[580px]:h-[22rem] py-10 "
        }  bg-dark-background backdrop:backdrop-blur-lg rounded-3xl backdrop:delay-1000`}
        ref={modalRef}
      >
        {deleteModal ? (
          <div className="m-1 p-3 flex justify-between items-center flex-col h-28">
            <div>Are you sure you want to delete this coin?</div>
            <div className="flex justify-center items-center flex-col dark:text-card-text-gray">
              {chosenCoin.name}
              <div className="m-3 h-16 w-16 flex justify-center items-center dark:bg-symbol-background rounded-md">
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
                  className=" dark:bg-timebar-background-color rounded-md h-11 w-11/12 "
                >
                  Cancel
                </button>
              </div>
              <div className="w-1/2 flex justify-center items-center">
                <button
                  onClick={() => deleteAssetCard(chosenCoin.uid)}
                  className=" bg-negative bg-opacity-80 w-11/12 h-11 rounded-md text-sm lg:text-base  "
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full justify-center  items-center flex flex-col">
            <div className=" flex m-3 w-11/12 justify-between">
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
                              ? chosenCoin.image.thumb
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
                        <div className="hidden md:flex xl:text-xl lg:text-lg text-base">
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
                          defaultValue={
                            isAddAsset
                              ? ""
                              : data &&
                                data.filter(
                                  (el: { uid: string }) =>
                                    el.uid === chosenCoin.uid
                                )[0].amount
                          }
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
                          defaultValue={
                            isAddAsset
                              ? ""
                              : data &&
                                dateConverter(
                                  data.filter(
                                    (el: { uid: string }) =>
                                      el.uid === chosenCoin.uid
                                  )[0].date
                                )
                          }
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
                      onClick={() => toggleModal(false, "", "", "")}
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
        )}
      </dialog>
    </Wrapper>
  );
}
