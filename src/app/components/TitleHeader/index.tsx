"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const TitleHeader = ({ isNavbar }: { isNavbar: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      onClick={() => isNavbar && pathname !== "/" && router.push("/")}
      className={` ${
        isNavbar ? " hidden md:flex cursor-pointer " : " flex md:hidden p-3"
      } justify-center items-center  `}
    >
      <div className="pr-2 dark:text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`font-normal ${
            isNavbar ? "text-l" : "text-2xl"
          } dark:fill-white`}
          height="1.5em"
          viewBox="0 0 640 512"
        >
          <path d="M0 241.1C0 161 65 96 145.1 96c38.5 0 75.4 15.3 102.6 42.5L320 210.7l72.2-72.2C419.5 111.3 456.4 96 494.9 96C575 96 640 161 640 241.1v29.7C640 351 575 416 494.9 416c-38.5 0-75.4-15.3-102.6-42.5L320 301.3l-72.2 72.2C220.5 400.7 183.6 416 145.1 416C65 416 0 351 0 270.9V241.1zM274.7 256l-72.2-72.2c-15.2-15.2-35.9-23.8-57.4-23.8C100.3 160 64 196.3 64 241.1v29.7c0 44.8 36.3 81.1 81.1 81.1c21.5 0 42.2-8.5 57.4-23.8L274.7 256zm90.5 0l72.2 72.2c15.2 15.2 35.9 23.8 57.4 23.8c44.8 0 81.1-36.3 81.1-81.1V241.1c0-44.8-36.3-81.1-81.1-81.1c-21.5 0-42.2 8.5-57.4 23.8L365.3 256z" />
        </svg>
      </div>
      <h1 className={`font-semibold ${isNavbar ? "text-lg" : "text-4xl"}`}>
        Coin Flow
      </h1>
    </div>
  );
};
