import React from "react";

export const AnimatingNumber = ({ value }: { value: number }) => {
  const formatForDisplay = (number: string): string[] => {
    const formattedNumber = Math.max(parseFloat(number), 0).toFixed(2);
    return formattedNumber.split("").reverse();
  };
  return (
    <div className="relative">
      <div className="absolute ">
        {[9, 8, 7, 6, 5, 4, 3, 2, 1].map((number) => (
          <div key={number}>
            <span>{number}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
