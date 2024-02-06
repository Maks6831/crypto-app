"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { searchData } from "@/app/GlobalRedux/Features/SearchData/searchSlice";
import { useAppDispatch, useAppSelector } from "@/app/GlobalRedux/hooks";
import { SearchItem } from "../SearchItem";
import { useDebounce } from "@/app/Utils/Hooks/useDebounce";
import { useRouter } from "next/navigation";
import { changeArray } from "@/app/GlobalRedux/Features/ConverterCoins/ConvertSlice";

export const Searchbar = ({
  isSearch,
  defaultValue,
}: {
  isSearch: boolean;
  defaultValue: string;
}) => {
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

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const changeIndex = (event: any) => {
    if (!keyPress) {
      const { target } = event;
      const index = (target as any).dataset.index;
      setFocusedIndex(parseInt(index || 0));
    }
    setKeyPress(false);
  };

  const searchCoin = () => {
    setDropDown(false);
    router.push(`/coins/${data[focusedIndex].id}`);
  };

  const setValue = () => {
    const coin = data[focusedIndex]; // working
    const index = coins.findIndex((obj) => obj.name === defaultValue); // what is default value?
    let coinArray = [...coins];
    coinArray[index] = coin;
    dispatch(changeArray(coinArray));
    setSearchInput(coin.name);
    setDropDown(false);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    const { key } = e;
    setKeyPress(true);
    if (key === "ArrowDown") {
      const nextIndexCount = (focusedIndex + 1) % data.length;
      setFocusedIndex(nextIndexCount);
    }
    if (key === "ArrowUp") {
      const nextIndexCount = (focusedIndex + data.length - 1) % data.length;
      setFocusedIndex(nextIndexCount);
    }
    if (key === "Enter") {
      isSearch ? searchCoin() : setValue();
    }
  };

  const useHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchInput(value);
    value !== "" && data.length > 0 ? setDropDown(true) : setDropDown(false);
  };

  const debouncedSearch = useDebounce(searchInput, 1000);
  const rightData = !loading && !error && data.length > 0 && dropDown;
  const dropDownCheck = dropDown;
  const displayLoading = loading && focus && searchInput !== "";
  const throwError = error && searchInput !== "";

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!refOne?.current?.contains(event.target)) {
        setDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [refOne]);

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

  return (
    <div
      key={defaultValue}
      tabIndex={1}
      onKeyDown={handleKeyDown}
      className={`relative ${isSearch ? "m-2" : "md:m-2"}  flex`}
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
        className={`h-12 rounded-xl leading-10 ${isSearch ? "w-89" : "w-full"}`}
      >
        <input
          className={
            isSearch
              ? " h-12 pl-8 w-89 bg-light-button-color bg-opacity-40  rounded-xl dark:bg-dark-button-color dark:bg-opacity-100 outline-none"
              : "h-12 outline-none w-full dark:bg-inherit text-base md:text-2xl"
          }
          placeholder={isSearch ? "Search..." : ""}
          type="text"
          value={searchInput}
          onChange={useHandleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </label>
      {throwError && (
        <div className="absolute left-0 top-14 bg-light-button-color w-full rounded-xl bg-opacity-60  ">
          Error {error}
        </div>
      )}
      {displayLoading && (
        <div
          className={`p-2 left-0 top-14 bg-light-button-color w-full rounded-xl bg-opacity-60  absolute ${
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
              onClick={isSearch ? searchCoin : setValue}
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
