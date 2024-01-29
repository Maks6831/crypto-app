'use client';
import { CoinCard } from "@/app/components/CoinCard";
import { Wrapper } from "@/app/components/Wrapper";
import { UrlContainer } from "../../components/UrlContainer";

export default function Page({ params }: { params: {coinId: string}}) {
  const websiteNames = [
    "www.TechTrailblaze.com",
    "www.EcoHarmonyHub.com",
    "www.WanderlustVoyager.com"
  ];
   return <Wrapper>
            <div className="flex w-full p-3 h-screen ">
              <div className=" w-5/12 m-2 h-1/2 flex justify-center items-center">
                <CoinCard/>
              </div>
              <div className="w-7/12 m-2 h-1/2 flex flex-col justify-start">
                <div  className="p-3 max-h-3/5 text-sm  bg-scroll scrollbar-thin scrollbar-purplea scrollbar-h-24 overflow-y-auto">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla augue ligula, viverra id cursus eu, imperdiet non odio. Phasellus nec dignissim felis, eu accumsan enim. Morbi rutrum justo iaculis lectus viverra sagittis. Quisque nisi tortor, porttitor vel porta quis, elementum in leo. Integer non ligula non velit tincidunt eleifend ac elementum diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc vitae tellus a orci aliquet dictum. Quisque bibendum orci vitae felis porttitor convallis. Suspendisse non molestie nulla, quis malesuada diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean urna tellus, congue ac nisl et, dictum pellentesque neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla augue ligula, viverra id cursus eu, imperdiet non odio. Phasellus nec dignissim felis, eu accumsan enim. Morbi rutrum justo iaculis lectus viverra sagittis. Quisque nisi tortor, porttitor vel porta quis, elementum in leo. Integer non ligula non velit tincidunt eleifend ac elementum diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc vitae tellus a orci aliquet dictum. Quisque bibendum orci vitae felis porttitor convallis. Suspendisse non molestie nulla, quis malesuada diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean urna tellus, congue ac nisl et, dictum pellentesque neque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla augue ligula, viverra id cursus eu, imperdiet non odio. Phasellus nec dignissim felis, eu accumsan enim. Morbi rutrum justo iaculis lectus viverra sagittis. Quisque nisi tortor, porttitor vel porta quis, elementum in leo. Integer non ligula non velit tincidunt eleifend ac elementum diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc vitae tellus a orci aliquet dictum. Quisque bibendum orci vitae felis porttitor convallis. Suspendisse non molestie nulla, quis malesuada diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean urna tellus, congue ac nisl et, dictum pellentesque neque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla augue ligula, viverra id cursus eu, imperdiet non odio. Phasellus nec dignissim felis, eu accumsan enim. Morbi rutrum justo iaculis lectus viverra sagittis. Quisque nisi tortor, porttitor vel porta quis, elementum in leo. Integer non ligula non velit tincidunt eleifend ac elementum diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc vitae tellus a orci aliquet dictum. Quisque bibendum orci vitae felis porttitor convallis. Suspendisse non molestie nulla, quis malesuada diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean urna tellus, congue ac nisl et, dictum pellentesque neque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla augue ligula, viverra id cursus eu, imperdiet non odio. Phasellus nec dignissim felis, eu accumsan enim. Morbi rutrum justo iaculis lectus viverra sagittis. Quisque nisi tortor, porttitor vel porta quis, elementum in leo. Integer non ligula non velit tincidunt eleifend ac elementum diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc vitae tellus a orci aliquet dictum. Quisque bibendum orci vitae felis porttitor convallis. Suspendisse non molestie nulla, quis malesuada diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean urna tellus, congue ac nisl et, dictum pellentesque neque.</p>
                </div>
                <div className="h-2/5 w-full  flex border-2 flex-wrap">
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