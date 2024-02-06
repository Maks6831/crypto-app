import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import usePrevious from "@/app/Utils/Hooks/usePrevious";

export const AnimatingNumber = ({ value }: { value: number }) => {
  const formatForDisplay = (number: number): string[] => {
    return parseFloat(Math.max(number, 0).toString())
      .toFixed(2)
      .split("")
      .reverse();
  };

  const DecimalColumn = () => {
    return (
      <div>
        <span>.</span>
      </div>
    );
  };

  const NumberColumn = ({
    digit,
    delta,
  }: {
    digit: string;
    delta: null | string;
  }) => {
    const [position, setPosition] = useState<number | undefined>(0);
    const columnContainer = useRef<HTMLDivElement>(null!);
    const [animationClass, setAnimationClass] = useState<string | null>(null);
    const previousDigit = usePrevious(digit);

    const setColumnToNumber = (number: string) => {
      setPosition(columnContainer.current?.clientHeight * parseInt(number));
      console.log(columnContainer.current.clientHeight);
    };

    useEffect(() => {
      setAnimationClass(previousDigit !== digit ? delta : "");
    }, []);

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
          className={`absolute h-[1000%] left-0 border-2 bottom-0 z-50 w-full ${animationClass} `}
        >
          {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((number) => (
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
  const numberArray = formatForDisplay(value);
  const previousNumber = usePrevious(value);

  let delta: string | null = null;
  if (previousNumber && value > previousNumber) delta = "increase";
  if (previousNumber && value < previousNumber) delta = "decrease";

  useEffect(() => {
    console.log(numberArray);
  }, [numberArray]);
  return (
    <div className="h-full m-auto w-full flex flex-row-reverse  relative text-white">
      {numberArray &&
        numberArray.map((number, index) =>
          number === "." ? (
            <DecimalColumn key={index} />
          ) : (
            <NumberColumn key={index} digit={number} delta={delta} />
          )
        )}
    </div>
  );
};
