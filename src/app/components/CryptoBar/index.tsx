import React from "react";
import Image from "next/image";
import { ProgressBar } from "../Progressbar";

export const Cryptobar = ({
  currency,
  percentage,
  color,
}: {
  currency: any;
  percentage: number;
  color: string;
}) => {
  return (
    <div className="flex justify-center items-center">
      <div>{currency}</div>

      <div>
        <ProgressBar
          percentage={percentage}
          color={color}
          size={"w-20 h-1 "}
          backgroundColor={"bg-zinc-500"}
        />
      </div>
    </div>
  );
};
