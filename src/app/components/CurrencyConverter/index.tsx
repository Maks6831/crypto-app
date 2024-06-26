"use client";
import React, { useEffect, useRef, useState } from "react";
import { Currencydropdown } from "../CurrencyDropdown";
import { useAppSelector } from "@/app/GlobalRedux/hooks";

export const Currencyconverter = () => {
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { currency } = useAppSelector((state) => state.currencyReducer);
  const [displayCurr, setDisplayCurr] = useState("");

  const openDropdown = (e: any) => {
    e.nativeEvent.stopImmediatePropagation();
    setDropdown(!dropdown);
  };

  useEffect(() => {
    switch (currency) {
      case "gbp":
        setDisplayCurr("£ GBP");
        break;
      case "eur":
        setDisplayCurr("€ EUR");
        break;
      case "usd":
        setDisplayCurr("$ USD");
        break;
      default:
        setDisplayCurr("$ USD");
    }
  }, [currency]);

  useEffect(() => {
    const handClickOutside = (e: any) => {
      if (!ref?.current?.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handClickOutside);
  }, [ref]);

  return (
    <div
      onClick={(e) => openDropdown(e)}
      className="relative h-8 w-[4.8rem]  cursor-pointer bg-opacity-40 flex flex-column items-center justify-between m-1 p-2 bg-light-button-color rounded-xl dark:bg-dark-button-color dark:bg-opacity-100"
    >
      <div className="text-sm whitespace-nowrap ">{displayCurr}</div>
      <div>
        {dropdown ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
              clip-rule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <div ref={ref}>{dropdown && <Currencydropdown />}</div>
    </div>
  );
};
