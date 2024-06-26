"use client";
import { fetchData } from "@/app/GlobalRedux/Features/Data/dataSlice";
import { useAppDispatch, useAppSelector } from "@/app/GlobalRedux/hooks";
import React, { useEffect, useState } from "react";
import { CarouselCard } from "../CarouselCard";
import { MarketData } from "../../types/MarketData";
import { LoadingSpinner } from "../LoadingSpinner";

export const Carousel = ({ isCoinPage }: { isCoinPage: boolean }) => {
  const dispatch = useAppDispatch();
  const { coins, loading } = useAppSelector((state) => state.carousel);
  const { currency } = useAppSelector((state) => state.currencyReducer);
  const [carIndex, setCarIndex] = useState(1);

  const increaseIndex = () => {
    setCarIndex(carIndex + 4);
  };
  const decreaseIndex = () => {
    carIndex !== 1 ? setCarIndex(carIndex - 4) : setCarIndex(1);
  };

  useEffect(() => {
    if (coins.length === 0) {
      dispatch(fetchData(currency));
    }
  }, [currency]);

  return (
    <>
      {loading && (
        <div className="w-full h-20 flex justify-center items-center">
          <div className="w-14 h-14">
            <LoadingSpinner />
          </div>
        </div>
      )}
      {coins.length > 0 && !loading && (
        <div className=" my-2 flex items-center w-full justify-center relative ">
          <div className=" flex items-center w-full justify-center my-2   relative">
            <button
              className="flex justify-center items-center w-8 h-8 md:w-12 md:h-12 rounded-2xl  bg-carousel-button-color-one bg-opacity-30  absolute -left-6 md:-left-10 "
              onClick={decreaseIndex}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className=" w-full flex justify-center items-center">
              {carIndex &&
                coins &&
                coins.map((coin, index) => (
                  <CarouselCard
                    index={index}
                    coinKey={coin.id}
                    symbol={coin.symbol}
                    name={coin.name}
                    id={coin.id}
                    percentageChange={coin.price_change_percentage_24h}
                    currentPrice={coin.current_price}
                    source={coin.image}
                    carIndex={carIndex}
                    key={coin.id}
                    isCoinPage={isCoinPage}
                  />
                ))}
            </div>
            <button
              className=" flex justify-center items-center w-8 h-8 md:w-12 md:h-12 rounded-2xl  bg-carousel-button-color-one bg-opacity-30 absolute -right-6 md:-right-10 "
              onClick={increaseIndex}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
