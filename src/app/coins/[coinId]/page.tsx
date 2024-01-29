'use client';
import { CoinCard } from "@/app/components/CoinCard";
import { Wrapper } from "@/app/components/Wrapper";
import { UrlContainer } from "./UrlContainer";

export default function Page({ params }: { params: {coinId: string}}) {
  const websiteNames = [
    "www.TechTrailblaze.com",
    "www.EcoHarmonyHub.com",
    "www.WanderlustVoyager.com"
  ];
   return <Wrapper>
            <div className="border-2 flex w-full p-3 h-screen ">
              <div className="border-2 w-5/12 m-2 h-1/2 flex justify-center items-center">
                <CoinCard/>
              </div>
              <div className="border-2 w-7/12 m-2 h-1/2 flex flex-col justify-between">
                <div className="p-3 h-5/6 text-sm overflow-y-hidden">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla augue ligula, viverra id cursus eu, imperdiet non odio. Phasellus nec dignissim felis, eu accumsan enim. Morbi rutrum justo iaculis lectus viverra sagittis. Quisque nisi tortor, porttitor vel porta quis, elementum in leo. Integer non ligula non velit tincidunt eleifend ac elementum diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc vitae tellus a orci aliquet dictum. Quisque bibendum orci vitae felis porttitor convallis. Suspendisse non molestie nulla, quis malesuada diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean urna tellus, congue ac nisl et, dictum pellentesque neque.</p>
                </div>
                <div className="h-1/6 w-full border-2 flex ">
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
          </Wrapper>
  }