"use client";
import { CoinCard } from "@/app/components/CoinCard";
import { Wrapper } from "@/app/components/Wrapper";
import { UrlContainer } from "../../components/UrlContainer";
import { DataCard } from "@/app/components/DataCard";
import { useAppDispatch, useAppSelector } from "@/app/GlobalRedux/hooks";
import { useEffect, useRef, useState } from "react";
import { coinPageData } from "@/app/GlobalRedux/Features/CoinPage/coinPageSlice";
import { coinPage, dummyData, isProgressData } from "@/app/types/CoinPageTypes";
import { moneyConverter } from "@/app/Utils/moneyConverter";
import { extractUrl } from "@/app/Utils/addressFormatter";
import { Pricegraph } from "@/app/components/Pricegraph";
import { priceChart } from "@/app/GlobalRedux/Features/Chartdata/priceSlice";
import { CoinInfoContainer } from "@/app/components/CoinInfoContainer";
import { Buttonswitcher } from "@/app/components/Buttonswitcher";
import { Timebar } from "@/app/components/Timebar";
import { Carousel } from "@/app/components/Carousel";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";

export default function Page({ params }: { params: { coinId: string } }) {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.coinPageReducer);
  const { currency, symbol } = useAppSelector((state) => state.currencyReducer);
  const [currentPrice, setCurrentPrice] = useState(0);
  const amountRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const { days, prices, labels, labelsTwo, market_caps } = useAppSelector(
    (state) => state.priceChart
  );
  const loadingGraph = useAppSelector((state) => state.priceChart.loading);
  const [isPrice, setIsPrice] = useState(true);
  const dataChecker = data !== coinPage;
  const rightCoinData = data && !loading;
  const displayGraphData =
    prices.length > 0 &&
    labels.length > 0 &&
    labelsTwo.length > 0 &&
    market_caps.length > 0 &&
    !loadingGraph;
  const description = data.description.en;
  const websiteNames = dataChecker && data.links.blockchain_site.slice(0, 3);
  const {
    total_volume,
    market_cap,
    total_supply,
    circulating_supply,
    fully_diluted_valuation,
  } = data.market_data;
  const volumeOverMarket: number = dataChecker
    ? (circulating_supply / total_supply) * 100
    : 0;

  const firstCard = dataChecker && [
    ["Volume 24h", symbol + moneyConverter(total_volume[currency], 2, false)],
    ["Market Cap Rank", data.market_cap_rank],
    [
      "Volume/Market",
      (total_volume[currency] / market_cap[currency]).toPrecision(3),
    ],
  ];

  const secondCard: isProgressData = dataChecker
    ? [
        ["Total Supply", total_supply.toLocaleString()],
        ["Circulating Supply", circulating_supply.toLocaleString()],
        ["Circulating/Max", volumeOverMarket],
      ]
    : dummyData;

  const thirdCard = dataChecker && [
    ["Market Cap", symbol + moneyConverter(market_cap[currency], 2, false)],
    [
      "Fully Diluted Valuation",
      symbol + moneyConverter(fully_diluted_valuation[currency], 2, false),
    ],
    [],
  ];

  useEffect(() => {
    dispatch(coinPageData(params.coinId));
  }, []);

  useEffect(() => {
    dispatch(priceChart({ currency, coinId: params.coinId, days: days }));
  }, [currency, days]);

  return (
    <Wrapper>
      {dataChecker && (
        <div className="min-h-screen w-full ">
          <div className="flex flex-col md:flex-row justify-center items-center md:justify-start md:items-stretch   w-full p-3 h-1/2 md:max-h-[30rem]  ">
            <div className=" w-full min-[400px]:w-10/12  md:w-5/12 m-2 md:min-h-full  flex justify-center  items-center">
              <CoinCard isPortfolio={false} />
            </div>
            <div className="w-10/12  md:w-7/12 m-2 min-h-full flex flex-col justify-start">
              {loading && (
                <div className="w-full min-h-[20rem] flex justify-center items-center">
                  <div className="h-14 w-14">
                    <LoadingSpinner />
                  </div>
                </div>
              )}
              {rightCoinData && (
                <>
                  <div className=" p-2 m-3 min-h-3/5 max-h-[20rem] text-sm  hover:scrollbar  scrollbar-track-transparent   scrollbar-thumb-light-button-color  dark:scrollbar-thumb-purplea scrollbar-h-24 overflow-y-hidden  hover:overflow-y-auto">
                    <p
                      dangerouslySetInnerHTML={{ __html: description }}
                      className="[&_a]:text-carousel-button-color-two text-justify "
                    ></p>
                    {!description && (
                      <p className="[&_a]:text-carousel-button-color-two text-justify ">
                        There is currently no Information on this Coin. Please
                        refer to{" "}
                        <a className="" href={data.links.homepage[0]}>
                          {extractUrl(data.links.homepage[0])}
                        </a>
                      </p>
                    )}
                  </div>
                  <div className="  w-full flex flex-wrap content-end items-center justify-center md:justify-start m-1">
                    {websiteNames &&
                      websiteNames.map((el: string) => (
                        <UrlContainer key={el} url={el} />
                      ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center h-full ">
            <div className=" w-full  px-6 h-full m-2 flex justify-center items-center md:items-start flex-col">
              <Buttonswitcher
                handleClick={setIsPrice}
                isClicked={isPrice}
                nameArray={["Price", "Market Caps"]}
              />
            </div>
            <div className="flex w-full h-full px-5">
              <div className=" overflow-hidden sm:min-w-80 m-3 px-3 pb-1  md:p-6   bg-white-color rounded-xl  h-[20rem]  w-full md:h-[25rem] flex justify-center items-end relative dark:bg-light-text-color-two ">
                {loadingGraph && (
                  <div className="w-full h-full flex justify-center items-center">
                    <div className="h-14 w-14">
                      <LoadingSpinner />
                    </div>
                  </div>
                )}
                {displayGraphData && (
                  <>
                    <CoinInfoContainer
                      isPrice={isPrice}
                      isCoinPage={true}
                      currentPrice={currentPrice}
                    />
                    <div className=" h-full w-full flex items-end">
                      {isPrice ? (
                        <div className=" h-5/6  md:h-full  w-full">
                          <Pricegraph
                            isLine={true}
                            prices={prices}
                            labels={labels}
                            days={days}
                            isCoinPage={true}
                            handleHover={setCurrentPrice}
                          />
                        </div>
                      ) : (
                        <div className=" h-5/6  md:h-full  w-full">
                          <Pricegraph
                            isLine={false}
                            market_caps={market_caps}
                            labelsTwo={labelsTwo}
                            days={days}
                            isCoinPage={true}
                          />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div>
              <Timebar days={days} />
            </div>
            <div className="sm:px-10 mt-3 flex justify-center items-center  overflow-hiddem w-full">
              <Carousel isCoinPage={true} />
            </div>
          </div>
          <div className=" m-3   section flex flex-col justify-start items-center  min-h-[28rem]">
            <div className=" w-11/12 md:w-full h-max  flex flex-col justify-center items-center md:flex-row ">
              <div className="h-full w-full md:w-1/2 m-2 flex justify-center items-center ">
                {firstCard && dataChecker && (
                  <DataCard data={firstCard} isProgress={false} />
                )}
              </div>
              <div className="h-full w-full md:w-1/2 m-2 flex  justify-center items-center  ">
                {secondCard && (
                  <DataCard
                    data={secondCard as isProgressData}
                    isProgress={true}
                  />
                )}
              </div>
            </div>
            <div className=" w-11/12 md:w-full h-1/2 md:m-3   flex flex-col md:flex-row justify-center items-center">
              <div className="h-full w-full md:w-1/2 m-2 flex justify-center items-center ">
                {thirdCard && <DataCard data={thirdCard} isProgress={false} />}
              </div>
              <div className="h-full w-full md:w-1/2 m-2  bflex justify-center items-center "></div>
            </div>
            <div className="w-full"></div>
          </div>
        </div>
      )}
    </Wrapper>
  );
}
