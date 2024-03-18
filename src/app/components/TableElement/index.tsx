"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { ProgressBar } from "../Progressbar";
import { moneyConverter } from "@/app/Utils/moneyConverter";
import { useAppSelector } from "@/app/GlobalRedux/hooks";
import { TableBar } from "../TableBar";
import { useTheme } from "next-themes";
import { Sparkline } from "../Sparkline";
import { numberFormatter } from "@/app/Utils/numberFormatter";
import { colorChange } from "@/app/Utils/colorChange";
import { useRouter } from "next/navigation";

export const TableElement = ({
  number,
  name,
  image,
  symbol,
  price,
  change1h,
  change24h,
  change7d,
  sparkline,
  volume24h,
  marketCap,
  circulating,
  totalSupply,
  id,
}: {
  number: number;
  name: string;
  image: string;
  symbol: string;
  price: number;
  change1h: number;
  change24h: number;
  change7d: number;
  sparkline: number[];
  volume24h: number;
  marketCap: number;
  circulating: number;
  totalSupply: number;
  id: string;
}) => {
  const { theme } = useTheme();
  const reduxSymbol = useAppSelector((state) => state.currencyReducer.symbol);
  const router = useRouter();

  const goToPage = () => router.push(`coins/${id}`);

  return (
    <tr
      onClick={goToPage}
      className=" h-20 mb-3  gap-4 cursor-pointer  w-full  first:rounded-l-xl "
    >
      <td className=" bg-white dark:bg-dark-card  p-5 rounded-l-xl hidden xl:table-cell ">
        <span className="flex flex-row items-center justify-center">
          {number}
        </span>
      </td>
      <td className=" bg-white dark:bg-dark-card  h-full     rounded-l-xl">
        <div className="   w-36 md:w-full h-full flex justify-around sm:justify-start items-center ">
          <div className="  h-6 w-6 m-2  ">
            <Image
              src={image}
              alt={name}
              width={24}
              height={24}
              style={{
                width: "24px",
                height: "24px",
              }}
            />
          </div>
          <div className="md:flex md:flex-row-reverse md:justify-end bg-white dark:bg-dark-card  h-full w-1/2 md:w-full ">
            <div className=" text-sm md:text-base">
              &nbsp;({symbol.toUpperCase()})
            </div>
            <div className=" text-xs md:text-base">{name}</div>
          </div>
        </div>
      </td>
      <td className=" bg-white dark:bg-dark-card md:p-5">
        <span className="flex flex-row items-center justify-center text-sm ">
          {reduxSymbol}
          {price.toFixed(2)}
        </span>
        <span
          style={{ color: `${colorChange(change7d, theme)}` }}
          className="flex md:hidden flex-row justify-center items-center text-xs whitespace-nowrap"
        >
          {numberFormatter(change7d, true, "")}
        </span>
      </td>
      <td
        className=" bg-white dark:bg-dark-card   hidden xl:table-cell "
        style={{ color: `${colorChange(change1h, theme)}` }}
      >
        <span className="flex flex-row justify-center items-center whitespace-nowrap">
          {numberFormatter(change1h, true, "")}
        </span>
      </td>
      <td
        className=" bg-white dark:bg-dark-card  hidden xl:table-cell"
        style={{ color: `${colorChange(change24h, theme)}` }}
      >
        <span className="flex flex-row justify-center items-center whitespace-nowrap">
          {numberFormatter(change24h, true, "")}
        </span>
      </td>
      <td
        className=" bg-white dark:bg-dark-card hidden md:table-cell  h-full  "
        style={{ color: `${colorChange(change7d, theme)}` }}
      >
        <span className="flex flex-row justify-center items-center whitespace-nowrap">
          {numberFormatter(change7d, true, "")}
        </span>
      </td>
      <TableBar
        number={number}
        numerator={volume24h}
        denominator={marketCap}
        change1h={change1h}
        isFirst={true}
      />
      <TableBar
        number={number}
        numerator={circulating}
        denominator={totalSupply}
        change1h={change1h}
        isFirst={false}
      />
      <Sparkline
        sparklineData={sparkline}
        change7d={change7d}
        number={number}
      />
    </tr>
  );
};
