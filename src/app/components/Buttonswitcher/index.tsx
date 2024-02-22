"use client";
import React, { useState } from "react";

export const Buttonswitcher = ({
  handleClick,
  isClicked,
  nameArray,
}: {
  handleClick: Function;
  isClicked: boolean;
  nameArray: string[];
}) => {
  return (
    <div className="mt-5 ml-3 w-9/12 sm:w-5/12 md:w-[31.6rem] h-14 rounded-md flex items-center bg-white dark:bg-dark-card cursor-pointer ">
      <div
        onClick={() => handleClick(true)}
        className={
          isClicked
            ? "w-full h-14  flex items-center justify-center bg-carousel-button-color-two bg-opacity-50 rounded-md"
            : "w-full h-14  flex items-center justify-center rounded-md"
        }
      >
        <div className="text-center">{nameArray[0]}</div>
      </div>
      <div
        onClick={() => handleClick(false)}
        className={
          isClicked
            ? "w-full h-14  flex items-center justify-center rounded-md"
            : "w-full h-14  flex items-center justify-center bg-carousel-button-color-two bg-opacity-50 rounded-md"
        }
      >
        <div className="text-center">{nameArray[1]}</div>
      </div>
    </div>
  );
};
