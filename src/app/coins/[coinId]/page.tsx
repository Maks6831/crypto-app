'use client';
import { CoinCard } from "@/app/components/CoinCard";
import { Wrapper } from "@/app/components/Wrapper";
import { UrlContainer } from "../../components/UrlContainer";
import { DataCard } from "@/app/components/DataCard";

export default function Page({ params }: { params: {coinId: string}}) {
  const websiteNames = [
    "www.TechTrailblaze.com",
    "www.EcoHarmonyHub.com",
    "www.WanderlustVoyager.com"
  ];
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
  
   return <Wrapper>
          <div className="min-h-screen w-full m-4">
            <div className="flex flex-col md:flex-row justify-center items-center md:justify-start md:items-stretch border-2 w-full p-3 h-1/2 md:max-h-[30rem]  ">
              <div className=" w-10/12 md:w-5/12 m-2 md:min-h-full  flex justify-center  items-center">
                <CoinCard/>
              </div>
              <div className="w-10/12 md:w-7/12 m-2 min-h-full flex flex-col justify-start">
                <div  className="p-3 min-h-3/5 max-h-[20rem] text-sm  bg-scroll scrollbar  scrollbar-track-transparent  scrollbar-thumb-purplea scrollbar-h-24 overflow-y-scroll">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla augue ligula, viverra id cursus eu, imperdiet non odio. Phasellus nec dignissim felis, eu accumsan enim. Morbi rutrum justo iaculis lectus viverra  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla augue ligula, viverra id cursus eu, imperdiet non odio. Phasellus nec dignissim felis, eu accumsan enim. Morbi rutrum justo iaculis lectus viverra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla augue ligula, viverra id cursus eu, imperdiet non odio. Phasellus nec dignissim felis, eu accumsan enim. Morbi rutrum justo iaculis lectus viverra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla augue ligula, viverra id cursus eu, imperdiet non odio. Phasellus nec dignissim felis, eu accumsan enim. Morbi rutrum justo iaculis lectus viverra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla augue ligula, viverra id cursus eu, imperdiet non odio. Phasellus nec dignissim felis, eu accumsan enim. Morbi rutrum justo iaculis lectus viverra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla augue ligula, viverra id cursus eu, imperdiet non odio. Phasellus nec dignissim felis, eu accumsan enim. Morbi rutrum justo iaculis lectus viverra </p>
                </div>
                <div className="h-1/5 m-1 w-full flex flex-wrap content-end items-center">
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
            <div className="card m-2 section  h-[40rem]">
                <div className="w-full h-1/2  flex ">
                  <div className="h-full w-1/2  flex justify-center items-center ">
                    {firstCard &&
                    <DataCard
                      data={firstCard}
                    />
                  }
                  </div>
                  <div className="h-full w-1/2  flex justify-center items-center  ">
                    {
                      secondCard &&
                      <DataCard
                      data={secondCard}
                      />
                    }
                  </div>
                </div>
                <div className="w-full h-1/2  flex ">
                  <div className="h-full w-1/2  flex justify-center items-start ">
                    {thirdCard &&
                    <DataCard
                      data={thirdCard}
                    />
                  }
                  </div>
                </div>
              </div>
          </div>
          </Wrapper>
  }