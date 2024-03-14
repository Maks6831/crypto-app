"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { searchData } from "@/app/GlobalRedux/Features/SearchData/searchSlice";
import { useAppDispatch, useAppSelector } from "@/app/GlobalRedux/hooks";
import { SearchItem } from "../SearchItem";
import { useDebounce } from "@/app/Utils/Hooks/useDebounce";
import { useRouter } from "next/navigation";
import { changeArray } from "@/app/GlobalRedux/Features/ConverterCoins/ConvertSlice";
import { SearchBarProps } from "@/app/types/SearchBarType";

export const Searchbar = (props: SearchBarProps) => {
  const defaultValue = props.isPortfolio ? "" : props.defaultValue;
  const isSearch = props.isSearch;
  const isPortfolio = props.isPortfolio;
  const modalCloseCheck = props.isPortfolio ? props.modalCloseChecker : false;
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(
    (state) => state.searchReducer
  );
  const { coins } = useAppSelector((state) => state.converterReducer);
  const [searchInput, setSearchInput] = useState<string>(defaultValue);
  const [dropDown, setDropDown] = useState(false);
  const refOne = useRef<HTMLDivElement>(null!);
  const resultContainer = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [keyPress, setKeyPress] = useState(false);
  const router = useRouter();
  const [focus, setFocus] = useState(false);
  const debouncedSearch = useDebounce(searchInput, 1000);
  const rightData =
    !loading && !error && data.length > 0 && searchInput !== "" && focus;
  const dropDownCheck = dropDown;
  const displayLoading = loading && focus && !error && searchInput !== "";
  const throwError = error && searchInput !== "";

  const handleDropDown = (value: boolean) => {
    value ? setFocus(true) : setFocus(false);
  };

  const changeIndex = (event: any) => {
    event.nativeEvent.stopImmediatePropagation();
    if (!keyPress) {
      const { target } = event;
      const index = (target as any).dataset.index;
      setFocusedIndex(parseInt(index || 0));
    }
    setKeyPress(false);
  };

  const searchCoin = () => {
    if (data[focusedIndex]) {
      setSearchInput("");
      handleDropDown(false);
      router.push(`/coins/${data[focusedIndex].id}`);
      setFocusedIndex(-1);
    }
  };

  const setValue = () => {
    const coin = data[focusedIndex];
    if (!isSearch && !isPortfolio) {
      const index = coins.findIndex((obj) => obj.name === defaultValue);
      const coinArray = [...coins];
      coinArray[index] = coin;
      dispatch(changeArray(coinArray));
    }
    if (isPortfolio) {
      if (data.length > 0) {
        !coin ? props.liftStateUp(data[0]) : props.liftStateUp(coin);
      } else {
        props.saveAsset();
      }
    }
    setSearchInput(coin ? coin.name : data[0].name);
    setDropDown(false);
    handleDropDown(false);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    const { key } = e;
    setKeyPress(true);
    if (key === "ArrowDown" && rightData) {
      const nextIndexCount = (focusedIndex + 1) % data.length;
      setFocusedIndex(nextIndexCount);
    }
    if (key === "ArrowUp" && rightData) {
      const nextIndexCount = (focusedIndex + data.length - 1) % data.length;
      setFocusedIndex(nextIndexCount);
    }
    if (key === "Enter") {
      isSearch ? searchCoin() : setValue();
    }
  };

  const useHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.nativeEvent.stopImmediatePropagation();
    const { value } = event.target;
    setSearchInput(value);
    value !== "" && data.length > 0 ? setDropDown(true) : setDropDown(false);
  };

  useEffect(() => {
    if (searchInput) {
      dispatch(searchData(debouncedSearch));
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (resultContainer.current) {
      resultContainer.current.scrollIntoView({ block: "nearest" });
    }
  }, [focusedIndex]);

  useEffect(() => {
    setSearchInput("");
  }, [modalCloseCheck]);

  useEffect(() => {
    if (props.isPortfolio) {
      props.setSearchState(searchInput);
    }
  }, [searchInput, props]);
  return (
    <div
      key={defaultValue}
      tabIndex={1}
      onKeyDown={handleKeyDown}
      className={`relative ${
        isSearch ? "m-2 h-full" : isPortfolio ? "m-1 py-1" : "md:m-2"
      } flex`}
      onFocus={() => handleDropDown(true)}
      onBlur={() => handleDropDown(false)}
    >
      {isSearch ? (
        <div className="absolute left-2 top-3 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      ) : (
        <></>
      )}
      <label
        className={`rounded-xl leading-10 ${
          isSearch ? "w-89 h-full " : " h-12 w-full"
        }`}
      >
        <input
          className={`${
            isSearch
              ? " h-12 pl-8 w-89 bg-light-button-color bg-opacity-40 rounded-xl dark:bg-dark-button-color dark:bg-opacity-100  "
              : isPortfolio
              ? " bg-light-button-color bg-opacity-40 dark:bg-dark-button-color w-full rounded-md h-11  pl-2"
              : " w-full dark:bg-inherit text-base md:text-2xl h-12 "
          } ouline-none  `}
          placeholder={
            isSearch ? "Search..." : isPortfolio ? "Select Coin..." : ""
          }
          type="text"
          value={searchInput}
          onChange={useHandleChange}
        />
      </label>
      {throwError && (
        <div className="absolute left-0 top-14 bg-light-button-color w-full rounded-xl bg-opacity-60  ">
          Error {error}
        </div>
      )}
      {displayLoading && (
        <div
          className={`p-2 left-0 top-14 z-50  bg-light-button-color w-full rounded-xl bg-opacity-60  absolute ${
            isSearch ? "top-14" : "top-16"
          }`}
        >
          Loading...
        </div>
      )}
      {rightData && (
        <div
          ref={refOne}
          className="  p-2 absolute left-0 top-14 bg-light-button-color  bg-scroll bg-opacity-60 scrollbar-track-transparent scrollbar-track-rounded-xl scrollbar scrollbar-h-24 scrollbar-thumb-light-button-color scroll-smooth scrollbar-thumb-rounded-xl  w-full rounded-xl z-50 dark:bg-dark-button-color  max-h-44 overflow-x-hidden overflow-y-auto m-1  "
        >
          {data.map((element, index) => (
            <div
              data-index={index}
              onMouseEnter={changeIndex}
              className=" cursor-pointer"
              onMouseDown={isSearch ? searchCoin : setValue}
              key={element.id}
              ref={index === focusedIndex ? resultContainer : null}
            >
              <SearchItem
                key={element.id}
                name={element.name}
                opacity={
                  index === focusedIndex ? "bg-opacity-90" : "bg-opacity-0"
                }
                index={index}
                keyPress={keyPress}
                changeIndex={changeIndex}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
