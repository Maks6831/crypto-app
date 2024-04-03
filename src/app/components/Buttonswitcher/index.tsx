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
    <div className="mt-5  w-9/12 sm:w-5/12 md:w-[14.6rem] h-10 rounded-2xl flex items-center bg-white dark:bg-dark-card cursor-pointer ">
      <div
        onClick={() => handleClick(true)}
        className={
          isClicked
            ? "w-full h-10  flex items-center justify-center bg-carousel-button-color-two bg-opacity-50 rounded-2xl"
            : "w-full h-10  flex items-center justify-center rounded-2xl"
        }
      >
        <div className="text-center">{nameArray[0]}</div>
      </div>
      <div
        onClick={() => handleClick(false)}
        className={
          isClicked
            ? "w-full h-10  flex items-center justify-center rounded-2xl"
            : "w-full h-10  flex items-center justify-center bg-carousel-button-color-two bg-opacity-50 rounded-2xl"
        }
      >
        <div className="text-center">{nameArray[1]}</div>
      </div>
    </div>
  );
};
