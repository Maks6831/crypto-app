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
      className=" h-20 mb-3  gap-4 cursor-pointer  w-full  first:rounded-l-3xl "
    >
      <td className=" bg-white dark:bg-dark-card  p-3 rounded-l-3xl hidden xl:table-cell ">
        <span className="flex flex-row items-center justify-center">
          {number}
        </span>
      </td>
      <td className=" bg-white p-1  dark:bg-dark-card  h-full rounded-l-3xl xl:rounded-none">
        <div className="   w-full h-full flex justify-around sm:justify-start items-center  whitespac">
          <div className="  h-7 w-7 m-2 relative ">
            <Image src={image} alt={name} layout="fill" objectFit="contain" />
          </div>
          <div className="flex flex-col items-start md:flex-row-reverse  md:justify-end md:items-center  bg-white dark:bg-dark-card  h-full w-1/2 md:w-full ">
            <div className=" md:flex text-sm md:text-base">
              <div className="hidden md:flex">&nbsp;</div>(
              {symbol.toUpperCase()})
            </div>
            <div className=" text-xs md:text-base ">{name}</div>
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
          className="flex md:hidden flex-row justify-center items-center text-xs whitespace-nowrap "
        >
          {numberFormatter(change7d, true, "")}
        </span>
      </td>
      <td
        className=" bg-white dark:bg-dark-card   hidden xl:table-cell  px-2 "
        style={{ color: `${colorChange(change1h, theme)}` }}
      >
        <span className="flex flex-row justify-center items-center whitespace-nowrap">
          {numberFormatter(change1h, true, "")}
        </span>
      </td>
      <td
        className=" bg-white dark:bg-dark-card  hidden xl:table-cell  px-2"
        style={{ color: `${colorChange(change24h, theme)}` }}
      >
        <span className="flex flex-row justify-center items-center whitespace-nowrap">
          {numberFormatter(change24h, true, "")}
        </span>
      </td>
      <td
        className=" bg-white dark:bg-dark-card hidden md:table-cell  h-full px-2  "
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
        change1h={change7d}
        isFirst={true}
      />
      <TableBar
        number={number}
        numerator={circulating}
        denominator={totalSupply}
        change1h={change7d}
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
