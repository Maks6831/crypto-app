'use client';
import { CoinCard } from "@/app/components/CoinCard";
import { Wrapper } from "@/app/components/Wrapper";
import { UrlContainer } from "../../components/UrlContainer";
import { DataCard } from "@/app/components/DataCard";
import { useAppDispatch, useAppSelector } from "@/app/GlobalRedux/hooks";
import { useEffect } from "react";
import { coinPageData } from "@/app/GlobalRedux/Features/CoinPage/coinPageSlice";
import { coinPage, dummyData, isProgressData } from "@/app/types/CoinPageTypes";
import { moneyConverter } from "@/app/Utils/moneyConverter";

export default function Page({ params }: { params: {coinId: string}}) {
  const dispatch  = useAppDispatch();
  const { data } = useAppSelector(state => state.coinPageReducer);
  const { currency, symbol } = useAppSelector(state => state.currencyReducer);
  const dataChecker = data !== coinPage;
  const description = data.description.en;
  const websiteNames = dataChecker && data.links.blockchain_site.slice(0,3);
  const {total_volume, market_cap, total_supply, circulating_supply, fully_diluted_valuation} = data.market_data;
  const volumeOverMarket: number = dataChecker ? (circulating_supply/total_supply) * 100 : 0

  const firstCard =  dataChecker && [
    ["Volume 24h", symbol + moneyConverter(total_volume[currency], 2)],
    [ "Market Cap Rank", data.market_cap_rank],
    ["Volume/Market",  (total_volume[currency] / market_cap[currency]).toPrecision(3) ]
  ];


  const secondCard : isProgressData = dataChecker ? [
    ["Total Supply", total_supply.toLocaleString()],
    ["Circulating Supply", circulating_supply.toLocaleString()],
    ['Circulating/Max',  volumeOverMarket]
  ] : dummyData

  const thirdCard = dataChecker && [
    ['Market Cap', symbol + moneyConverter(market_cap[currency],2)],
    ['Fully Diluted Valuation', symbol + moneyConverter(fully_diluted_valuation[currency],2)],
    []
  ]

  useEffect(()=>{
    dispatch(coinPageData(params.coinId))
  },[])
  
   return <Wrapper>
          <div className="min-h-screen w-full m-4">
            <div className="flex flex-col md:flex-row justify-center items-center md:justify-start md:items-stretch  w-full p-3 h-1/2 md:max-h-[30rem]  ">
              <div className=" w-full min-[400px]:w-10/12 md:w-5/12 m-2 md:min-h-full  flex justify-center  items-center">
                <CoinCard
                isPortfolio={false}
                />
              </div>
              <div className="w-10/12 md:w-7/12 m-2 min-h-full flex flex-col justify-start">
                <div  className=" p-2 m-3 min-h-3/5 max-h-[20rem] text-sm  hover:scrollbar  scrollbar-track-transparent   scrollbar-thumb-light-button-color  dark:scrollbar-thumb-purplea scrollbar-h-24 overflow-y-hidden  hover:overflow-y-auto">
                  <p  dangerouslySetInnerHTML={{ __html: description }} className="[&_a]:text-carousel-button-color-two text-justify "></p>
                </div>
                <div className="  w-full flex flex-wrap content-end items-center justify-center md:justify-start m-1">
                  {websiteNames && 
                  websiteNames.map((el:string)=> (
                    <UrlContainer
                    key={el}
                    url={el} 
                    />
                  ))

                  }
                </div>
              </div>
            </div>
            <div className="card m-2 section flex flex-col justify-start items-center  min-h-[40rem]">
                <div className=" w-11/12 md:w-full h-max  flex flex-col justify-center items-center md:flex-row ">
                  <div className="h-full w-full md:w-1/2 m-2 flex justify-center items-center ">
                    {firstCard && dataChecker &&
                    <DataCard
                      data={firstCard}
                      isProgress={false}
                    />
                  }
                  </div>
                  <div className="h-full w-full md:w-1/2 m-2 flex  justify-center items-center  ">
                    {
                      secondCard &&
                      <DataCard
                      data={secondCard as isProgressData}
                      isProgress={true}
                      />
                    }
                  </div>
                </div>
                <div className=" w-11/12 md:w-full h-1/2 md:m-3   flex flex-col md:flex-row justify-center items-center">
                  <div className="h-full w-full md:w-1/2 m-2 flex justify-center items-center ">
                    {thirdCard &&
                    <DataCard
                      data={thirdCard}
                      isProgress={false}
                    />
                  }
                  </div>
                  <div className="h-full w-full md:w-1/2 m-2  bflex justify-center items-center "></div>
                </div>
              </div>
          </div>
          </Wrapper>
  }