"use client";
import { useEffect, useState } from "react";
import { Buttonswitcher } from "./components/Buttonswitcher";
import { Carousel } from "./components/Carousel";
import { CoinInfoContainer } from "./components/CoinInfoContainer";
import { Cointable } from "./components/Cointable";
import { Pricegraph } from "./components/Pricegraph";
import { Timebar } from "./components/Timebar";
import "./globals.css";
import { HomeConverter } from "./components/HomeConverter";
import { useAppDispatch, useAppSelector } from "./GlobalRedux/hooks";
import { priceChart } from "./GlobalRedux/Features/Chartdata/priceSlice";
import { TitleHeader } from "./components/TitleHeader";
import { Wrapper } from "./components/Wrapper";
import { LoadingSpinner } from "./components/LoadingSpinner";

export default function Home() {
  const [isCoin, setisCoin] = useState(true);
  const { prices, labels, labelsTwo, market_caps, days, loading } =
    useAppSelector((state) => state.priceChart);
  const { currency, symbol } = useAppSelector((state) => state.currencyReducer);
  const { coin } = useAppSelector((state) => state.coinReducer);
  const dispatch = useAppDispatch();
  const [currentPrice, setCurrentPrice] = useState(0);
  const displayGraphData =
    prices.length > 0 &&
    labels.length > 0 &&
    labelsTwo.length > 0 &&
    market_caps.length > 0 &&
    !loading;

  const setCoin = (value: boolean) => {
    setisCoin(value);
  };

  useEffect(() => {
    dispatch(priceChart({ currency, coinId: coin, days: days }));
  }, [coin, currency, days]);

  return (
    <div className="flex justify-center items-center w-full  ">
      <Wrapper>
        <div className="  w-full  min-h-screen flex flex-col items-center">
          <Wrapper>
            <div className="w-11/12 flex flex-col items-center">
              <TitleHeader isNavbar={false} />

              <div className=" w-full h-full px-1  flex justify-center items-center md:items-start flex-col">
                <Buttonswitcher
                  handleClick={setCoin}
                  isClicked={isCoin}
                  nameArray={["Coins", "Converter"]}
                />
              </div>
            </div>
          </Wrapper>
          {isCoin ? (
            <>
              <div className="px-4 md:px-[2rem] flex justify-center items-center  overflow-hiddem w-full">
                <Carousel isCoinPage={false} />
              </div>
              <Wrapper>
                <div className="flex flex-col sm:flex-row h-[28rem] sm:h-60 md:h-80 lg:h-[25rem] w-11/12 justify-center items-center m-2 ">
                  <div className=" overflow-hidden sm:min-w-80  m-2 px-3 pb-1 md:p-6 bg-white-color rounded-3xl h-60   md:h-80 w-full md:w-1/2 lg:h-[25rem] flex justify-center items-end relative dark:bg-light-text-color-two ">
                    {loading && (
                      <div className="w-full h-full flex justify-center items-center">
                        <div className="h-14 w-14">
                          <LoadingSpinner />
                        </div>
                      </div>
                    )}
                    {displayGraphData && (
                      <>
                        <CoinInfoContainer
                          isPrice={true}
                          isCoinPage={false}
                          currentPrice={currentPrice}
                        />
                        <div className="h-1/2 md:h-max w-full flex items-end">
                          <Pricegraph
                            isLine={true}
                            prices={prices}
                            labels={labels}
                            days={days}
                            isCoinPage={false}
                            handleHover={setCurrentPrice}
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <div className=" overflow-hidden min-w-80   m-2 px-3 pb-1 md:p-6 bg-white-color rounded-3xl h-60  md:h-80   lg:h-[25rem] w-full md:w-1/2 flex justify-center items-end relative dark:bg-volume-background">
                    {loading && (
                      <div className="w-full h-full flex justify-center items-center">
                        <div className="h-14 w-14">
                          <LoadingSpinner />
                        </div>
                      </div>
                    )}
                    {displayGraphData && (
                      <>
                        <div className="hidden lg:flex absolute  lg:right-4 top-2 z-50">
                          <Timebar days={days} />
                        </div>
                        <CoinInfoContainer
                          isPrice={false}
                          isCoinPage={false}
                          currentPrice={currentPrice}
                        />
                        <div className="h-1/2 md:h-max w-full flex items-end ">
                          <Pricegraph
                            isLine={false}
                            market_caps={market_caps}
                            labelsTwo={labelsTwo}
                            days={days}
                            isCoinPage={false}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Wrapper>
              <div className="flex lg:hidden">
                <Timebar days={days} />
              </div>
            </>
          ) : (
            <>
              <Wrapper>
                <HomeConverter />
              </Wrapper>
            </>
          )}
          <Wrapper>
            <Cointable />
          </Wrapper>
        </div>
      </Wrapper>
    </div>
  );
}
