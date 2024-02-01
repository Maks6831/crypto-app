'use client';
import { CoinCard } from "@/app/components/CoinCard";
import { Wrapper } from "@/app/components/Wrapper";
import { UrlContainer } from "../../components/UrlContainer";
import { DataCard } from "@/app/components/DataCard";
import { useAppDispatch, useAppSelector } from "@/app/GlobalRedux/hooks";
import { useEffect } from "react";
import { coinPageData } from "@/app/GlobalRedux/Features/CoinPage/coinPageSlice";
import { coinPage } from "@/app/types/CoinPageTypes";

export default function Page({ params }: { params: {coinId: string}}) {
  const dispatch  = useAppDispatch();
  const { data } = useAppSelector(state => state.coinPageReducer);
  const description = data.description.en;
 
  const websiteNames = data != coinPage && data.links.blockchain_site.slice(0,3);

  const firstCard = [
    ["Total Volume", "1,192,352 BTC"],
    ["Volume 24h", "$47,714,337,481C"],
    ["Volume/Market", "0.06363"]
  ];

  const secondCard = [
    ["Max Supply", "21,000,000 BTC"],
    ["Circulating Supply", "18,734,943 BTC"],
    ['progressbar', 'progressbar']
  ]

  const thirdCard = [
    ['Market Cap', '$749,864,345,056'],
    ['Fully Diluted Valuation', '$840,523,040,085'],
    []
  ]

  useEffect(()=>{
    dispatch(coinPageData(params.coinId))
  },[])
  useEffect(()=>{
    console.log(data)
  },[data])
  
   return <Wrapper>
          <div className="min-h-screen w-full m-4">
            <div className="flex flex-col md:flex-row justify-center items-center md:justify-start md:items-stretch  w-full p-3 h-1/2 md:max-h-[30rem]  ">
              <div className=" w-full min-[400px]:w-10/12 md:w-5/12 m-2 md:min-h-full  flex justify-center  items-center">
                <CoinCard
                isPortfolio={false}
                />
              </div>
              <div className="w-10/12 md:w-7/12 m-2 min-h-full flex flex-col justify-start">
                <div  className="p-3 m-1 min-h-3/5 max-h-[20rem] text-sm  bg-scroll scrollbar  scrollbar-track-transparent scrollbar-thumb-light-button-color  dark:scrollbar-thumb-purplea scrollbar-h-24 overflow-y-scroll">
                  <p dangerouslySetInnerHTML={{ __html: description }} className="[&_a]:text-carousel-button-color-two"></p>
                </div>
                <div className="  w-full flex flex-wrap content-end items-center justify-center md:justify-start m-1">
                  {websiteNames && 
                  websiteNames.map((el)=> (
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
                    {firstCard &&
                    <DataCard
                      data={firstCard}
                    />
                  }
                  </div>
                  <div className="h-full w-full md:w-1/2 m-2 flex  justify-center items-center  ">
                    {
                      secondCard &&
                      <DataCard
                      data={secondCard}
                      />
                    }
                  </div>
                </div>
                <div className=" w-11/12 md:w-full h-1/2 md:m-3   flex flex-col md:flex-row justify-center items-center">
                  <div className="h-full w-full md:w-1/2 m-2 flex justify-center items-center ">
                    {thirdCard &&
                    <DataCard
                      data={thirdCard}
                    />
                  }
                  </div>
                  <div className="h-full w-full md:w-1/2 m-2  bflex justify-center items-center "></div>
                </div>
              </div>
          </div>
          </Wrapper>
  }