"use client";
import React, { useEffect } from "react";
import { ProgressBar } from "../Progressbar";
import { useTheme } from "next-themes";
import { useAppSelector } from "@/app/GlobalRedux/hooks";
import { LoadingSpinner } from "../LoadingSpinner";

export const DataCard = ({
  data,
  isProgress,
}: {
  data: (string | number)[][];
  isProgress: boolean;
}) => {
  const { theme } = useTheme();
  const { loading } = useAppSelector((state) => state.coinPageReducer);

  return (
    <div className=" dark:shadow-lg bg-white dark:bg-opacity-30 dark:bg-purplea rounded-3xl max-h-5/6 w-full">
      {loading ? (
        <div className="w-full h-full flex min-h-[10rem] justify-center items-center">
          <div className="h-14 w-14">
            <LoadingSpinner />
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col min-[430px]:flex-row justify-between w-full h-1/3  items-center p-3 min-[430px]:p-5">
            <div className="flex justify-center items-center">
              <div className="p-2  md:text-base sm:text-sm text-xs font-normal text-light-text-color dark:text-card-text-gray">
                {data[0][0]}
              </div>
            </div>
            <div className="lg:text-xl md:text-lg sm:text-base text-sm">
              {data[0][1]}
            </div>
          </div>
          <div className="flex flex-col min-[430px]:flex-row justify-between w-full h-1/3   items-center p-3 min-[430px]:p-5">
            <div className="flex justify-center items-center">
              <div className="p-2  md:text-base sm:text-sm text-xs font-normal text-light-text-color dark:text-card-text-gray">
                {data[1][0]}
              </div>
            </div>
            <div className="lg:text-xl md:text-lg sm:text-base text-sm">
              {data[1][1]}
            </div>
          </div>
          {isProgress && typeof data[2][1] === "number" ? (
            <div>
              <div className=" flex flex-col justify-between w-full items-center md:items-start max-h-1/3 start p-4   ">
                <div className="flex px-2.5 items-center justify-between w-full ">
                  <div className="   md:text-base sm:text-sm text-xs font-normal text-opacity-90 text-light-text-color dark:text-coin-page-progress">
                    Circulating/Max{" "}
                  </div>
                  <div className=" md:text-base sm:text-sm text-xs font-normal text-light-blue dark:text-coin-page-progress-two">
                    {data[2][1].toFixed(2)}%
                  </div>
                </div>
                {theme && (
                  <ProgressBar
                    percentage={+data[2][1]}
                    color={
                      theme === "dark" ? "rgb(212,119,12)" : "rgb(99, 143, 254)"
                    }
                    size="min-w-full h-2"
                    backgroundColor={
                      theme === "dark"
                        ? "bg-coin-page-progress-two"
                        : "bg-blue-100"
                    }
                  />
                )}
              </div>
            </div>
          ) : (
            data[2].length > 0 && (
              <div className="flex flex-col min-[430px]:flex-row justify-between w-full h-1/3 items-center p-3 min-[430px]:p-5 ">
                <div className="flex justify-center items-center">
                  <div className="p-2  md:text-base sm:text-sm text-xs font-normal text-light-text-color dark:text-card-text-gray">
                    {data[2][0]}
                  </div>
                </div>
                <div className="lg:text-xl md:text-lg sm:text-base text-sm">
                  {data[2][1]}
                </div>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};
