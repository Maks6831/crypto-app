"use client";

import { useTheme } from "next-themes";
import { useAppSelector } from "../GlobalRedux/hooks";
import { numberFormatter } from "../Utils/numberFormatter";
import { ProgressBar } from "../components/Progressbar";
import { Wrapper } from "../components/Wrapper";

export default function Portfolio() {
  const { theme } = useTheme();
  const { symbol } = useAppSelector((state) => state.currencyReducer);
  return (
    <Wrapper>
      <div className="w-full min-h-screen justify-start items-center flex flex-col">
        <div className="w-11/12  h-24 md:h-12 flex flex-col md:flex-row items-center justify-between my-3  font-medium text-xl ">
          <div>Your Statistics</div>
          <button className="w-56 h-10 md:h-full  flex  justify-center items-center dark:bg-carousel-button-color-two dark:bg-opacity-50 rounded-md dark:border-carousel-button-color-one dark:border-opacity-20 shadow-lg dark:shadow-border-carousel-button-color-one">
            <div className="font-medium text-base">Add Asset</div>
          </button>
        </div>
        <div className="w-full min-h-32  flex justify-center ">
          <div className="w-11/12 bg-light-text-color-two h-72 p-3 flex">
            <div className="w-2/12 flex justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <div>Image</div>
                <div className="font-bold text-2xl">Name of coin</div>
              </div>
            </div>
            <div className="w-10/12 p-2">
              <div className="flex w-full h-1/2 flex-col">
                <div className="flex justify-between">
                  <div className="font-medium text-xl">Market Price</div>
                  <div className="w-10 h-10 rounded-sm flex justify-center items-center dark:bg-edit-button-color">
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
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </div>
                </div>
                <div className="w-full  h-1/2 flex justify-between">
                  <div className="flex justify-center items-center flex-col">
                    <div className=" text-sm font-normal dark:text-card-text-gray">
                      current Price
                    </div>
                    <div className="text-positive text-base">$39,504</div>
                  </div>
                  <div className="flex justify-center items-center flex-col">
                    <div className=" text-sm font-normal dark:text-card-text-gray">
                      Price Change 24h
                    </div>
                    <div className="text-positive text-base">
                      {numberFormatter(45406, false, symbol)}
                    </div>
                  </div>
                  <div className="flex justify-center items-center flex-col">
                    <div className=" text-sm font-normal dark:text-card-text-gray">
                      Market Cap vs Volume
                    </div>
                    <div className="w-full">
                      <ProgressBar
                        percentage={40}
                        color="rgba(1, 241, 227, 1)"
                        size="min-w-full h-1.5"
                        backgroundColor="bg-card-text-gray"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center items-center flex-col">
                    <div className=" text-sm font-normal dark:text-card-text-gray">
                      Circ Supply vs Max Supply
                    </div>
                    <div className="text-positive">$56,428</div>
                  </div>
                </div>
              </div>
              <hr></hr>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
