"use client";
import {
  changeAmount,
  tableData,
} from "@/app/GlobalRedux/Features/Tabledata/TableSlice";
import { useAppDispatch, useAppSelector } from "@/app/GlobalRedux/hooks";
import React, { useEffect, useState } from "react";
import { TableElement } from "../TableElement";
import { TableHeader } from "../TableHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingSpinner } from "../LoadingSpinner";

export const Cointable = () => {
  const dispatch = useAppDispatch();
  const { currency } = useAppSelector((state) => state.currencyReducer);
  const { coins, amount, loading } = useAppSelector(
    (state) => state.tableReducer
  );
  const [dataLength, setDataLength] = useState(0);

  const onScroll = () => {
    const newAmount = +amount + 30;
    const amountStringified = newAmount.toString();
    dispatch(tableData({ currency, amount: amountStringified }));
    dispatch(changeAmount(amountStringified));
  };

  useEffect(() => {
    dispatch(tableData({ currency, amount }));
  }, []);

  useEffect(() => {
    setDataLength(coins.length);
  }, [coins]);

  return (
    <>
      {loading && coins.length === 0 && (
        <div className="w-full h-20">
          <div className="w-14 h-14">
            <LoadingSpinner />
          </div>
        </div>
      )}
      {coins.length > 0 && (
        <div className="flex justify-center items-center w-full ">
          <InfiniteScroll
            dataLength={dataLength}
            next={onScroll}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            <table className="w-full mx-auto border-separate border-spacing-y-3">
              <TableHeader />
              <tbody className="w-full">
                {coins &&
                  coins.map((coin, index) => (
                    <TableElement
                      key={coin.id}
                      id={coin.id}
                      number={coin.market_cap_rank}
                      name={coin.name}
                      image={coin.image}
                      symbol={coin.symbol}
                      price={coin.current_price}
                      change1h={coin.price_change_percentage_1h_in_currency}
                      change24h={coin.price_change_percentage_24h}
                      change7d={coin.price_change_percentage_7d_in_currency}
                      volume24h={coin.total_volume}
                      marketCap={coin.market_cap}
                      circulating={coin.circulating_supply}
                      totalSupply={coin.total_supply}
                      sparkline={coin.sparkline_in_7d.price}
                    />
                  ))}
              </tbody>
            </table>
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};
