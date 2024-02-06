import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const AnimatingNumber = ({ value }: { value: number }) => {
  const formatForDisplay = (number: string): string[] => {
    const formattedNumber = Math.max(parseFloat(number), 0).toFixed(2);
    return formattedNumber.split("").reverse();
  };

  const DecimalColumn = () => {
    return (
      <div>
        <span>.</span>
      </div>
    );
  };

  const NumberColumn = ({ digit }: { digit: string }) => {
    const [position, setPosition] = useState<number | undefined>(0);
    const columnContainer = useRef<HTMLDivElement>(null!);

    const setColumnToNumber = (number: string) => {
      setPosition(columnContainer.current?.clientHeight * parseInt(number));
      console.log(columnContainer.current.clientHeight);
    };

    useEffect(() => {
      setColumnToNumber(digit);
    }, [digit]);

    return (
      <div
        className="relative h-max w-full border-2 z-50"
        ref={columnContainer}
      >
        <motion.div
          animate={{ y: position }}
          className="absolute h-[1000%] left-0 border-2 bottom-0 z-50 w-full "
        >
          {[9, 8, 7, 6, 5, 4, 3, 2, 1].map((number) => (
            <div key={number} className="h-[10%] w-full">
              <span>{number}</span>
            </div>
          ))}
        </motion.div>
        <span
          className="invisible
        "
        >
          0
        </span>
      </div>
    );
  };
  const numberArray: string[] = value.toString().split("").reverse();
  return (
    <div className="h-full m-auto w-full flex flex-row-reverse  relative text-white">
      {numberArray.map((number, index) =>
        number === "." ? (
          <DecimalColumn key={index} />
        ) : (
          <NumberColumn key={number} digit={number} />
        )
      )}
    </div>
  );
};
