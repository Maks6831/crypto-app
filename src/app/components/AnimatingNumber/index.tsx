import {
  MotionValue,
  animationControls,
  motion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";

const fontSize = 20;
const padding = 10;
const height = fontSize + padding;

export const AnimatingNumber = ({ value }: { value: string }) => {
  const stringValue = value.toString();
  const integerPart = Math.floor(parseFloat(value));
  const decimalPart = stringValue.includes(".")
    ? stringValue.split(".")[1]
    : "";

  return (
    <div
      style={{ fontSize }}
      className="flex  overflow-hidden justify-center item-start rounded  leading-7 "
    >
      {integerPart
        .toString()
        .split("")
        .map((number, index) => (
          <Digit
            key={index}
            index={index}
            place={
              1 *
              Math.pow(10, integerPart.toString().split("").length - index - 1)
            }
            num={parseFloat(value)}
          />
        ))}
      {decimalPart && <DecimalColumn />}
      {decimalPart
        .toString()
        .split("")
        .map((number, index) => (
          <Digit
            key={index}
            index={index}
            place={Math.pow(10, -index - 1)}
            num={parseFloat(value)}
          />
        ))}
    </div>
  );
};

function Digit({
  place,
  num,
  index,
}: {
  index: number;
  place: number;
  num: number;
}) {
  let valueRoundedToPlace =
    Math.floor(num / place) === 0 ? num / place : Math.floor(num / place);
  let animatedValue = useSpring(valueRoundedToPlace, {
    stiffness: 500,
    damping: 50,
  });

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div className="relative flex justify-center items-center w-[1ch] font-bold py-3 text-lg sm:text-xl md:text-2xl lg:text-3xl  leading-7 text-light-text-color-three dark:text-white tabular-nums">
      {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}
const DecimalColumn = () => {
  return (
    <div className="relative flex justify-center items-center py-3   w-[0.5ch] font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl leading-7 text-light-text-color-three dark:text-white tabular-nums ">
      <span className="absolute inset-0 flex items-center   justify-center">
        .
      </span>
    </div>
  );
};

function Number({ mv, number }: { mv: MotionValue; number: number }) {
  let y = useTransform(mv, (latest) => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;

    let memo = offset * height;

    if (offset > 5) {
      memo -= 10 * height;
    }

    return memo;
  });

  return (
    <motion.span
      style={{ y }}
      className="absolute inset-0 flex items-center   justify-center"
    >
      {number}
    </motion.span>
  );
}
