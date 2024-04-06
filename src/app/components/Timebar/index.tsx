"use client";
import { setDays } from "@/app/GlobalRedux/Features/Chartdata/priceSlice";
import { useAppDispatch, useAppSelector } from "@/app/GlobalRedux/hooks";
import React from "react";

export const Timebar = ({ days }: { days: string }) => {
  const dispatch = useAppDispatch();

  const changeTime = (action: string) => {
    if (days !== action) {
      dispatch(setDays(action));
    }
  };

  const getClassName = (day: string) => {
    return days === day
      ? "bg-carousel-button-color-two bg-opacity-40 shadow-carousel-button-color-two dark:shadow-slate-600 "
      : "";
  };

  return (
    <div className=" flex items-center justify-center md:ml-2 mt-2 w-72 h-10 bg-light-button-color bg-opacity-40 dark:bg-timebar-background-color dark:text-white  rounded-2xl">
      <div
        onClick={() => {
          changeTime("1");
        }}
        className={` w-full cursor-pointer h-full rounded-2xl flex justify-center items-center text-light-text-color dark:text-timebar-text-color text-center font-weight-normal text-xs ${getClassName(
          "1"
        )}`}
      >
        <div className="min-w-28">1D</div>
      </div>
      <div
        onClick={() => {
          changeTime("7");
        }}
        className={` w-full cursor-pointer h-full rounded-2xl flex justify-center items-center text-light-text-color dark:text-timebar-text-color text-center font-weight-normal text-xs ${getClassName(
          "7"
        )}`}
      >
        <div className="min-w-28">7D</div>
      </div>
      <div
        onClick={() => {
          changeTime("14");
        }}
        className={` w-full cursor-pointer h-full rounded-2xl flex justify-center items-center text-light-text-color dark:text-timebar-text-color text-center font-weight-normal text-xs ${getClassName(
          "14"
        )}`}
      >
        <div className="min-w-28">14D</div>
      </div>
      <div
        onClick={() => {
          changeTime("31");
        }}
        className={` w-full cursor-pointer h-full rounded-2xl flex justify-center items-center text-light-text-color dark:text-timebar-text-color text-center font-weight-normal text-xs ${getClassName(
          "31"
        )}`}
      >
        <div className="min-w-28">1M</div>
      </div>
      <div
        onClick={() => {
          changeTime("180");
        }}
        className={` w-full cursor-pointer h-full rounded-2xl flex justify-center items-center text-light-text-color dark:text-timebar-text-color text-center font-weight-normal text-xs ${getClassName(
          "180"
        )}`}
      >
        <div className="min-w-28">6M</div>
      </div>
      <div
        onClick={() => {
          changeTime("365");
        }}
        className={` w-full cursor-pointer h-full rounded-2xl flex justify-center items-center text-light-text-color dark:text-timebar-text-color text-center font-weight-normal text-xs ${getClassName(
          "365"
        )}`}
      >
        <div className="min-w-28">1Y</div>
      </div>
    </div>
  );
};
