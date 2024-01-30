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
    ["Circulating Supply", "18,734,943 BTC"]
  ]
  
   return <Wrapper>
          <div className="h-screen m-4">
            <div className="flex w-full p-3 h-1/2  ">
              <div className=" w-5/12 m-2 min-h-full flex justify-center  items-center">
                <CoinCard/>
              </div>
              <div className="w-7/12 m-2 min-h-full flex flex-col justify-start">
                <div  className="p-3 min-h-3/5 text-sm  bg-scroll scrollbar  scrollbar-track-transparent  scrollbar-thumb-purplea scrollbar-h-24 overflow-y-scroll">
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
                  <div className="h-full w-1/2  flex justify-center items-center border-2 ">
                    <div className=" bg-purplea rounded-xl h-5/6 w-11/12">
                      <div className="flex justify-between w-full h-1/3 items-center p-5">
                        <div>Max Supply</div>
                        <div>21,000,000 BTC</div>
                      </div>
                      <div className="flex justify-between w-full h-1/3  items-center p-5 ">
                        <div>Circulating Supply</div>
                        <div>18,734,943 BTC</div>
                      </div>
                      <div className="flex justify-between w-full h-1/3   items-center p-5">
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
          </div>
          </Wrapper>
  }