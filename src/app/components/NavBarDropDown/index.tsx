"use client";
import React, { useEffect, useRef, useState } from "react";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";
import { NavLinks } from "../NavLinks";

export const NavbarDropDown = () => {
  const [dropDown, setDropDown] = useState(false);
  const ref = useRef<HTMLDivElement>(null!);

  const toggleDropDown = (e: any) => {
    e.nativeEvent.stopImmediatePropagation();
    setDropDown(!dropDown);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!ref?.current?.contains(event.target)) {
        setDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [ref]);

  return (
    <div className={`sm:hidden flex justify-end items-center`}>
      <div
        onClick={(e) => toggleDropDown(e)}
        ref={ref}
        className="sm:m-4 md:m-4 relative"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
        {dropDown && (
          <div className="absolute  right-0 top-9 rounded-xl bg-opacity-75 bg-light-button-color flex justify-center items-center  p-1 w-28 z-50 dark:bg-dark-button-color flex-col">
            <NavLinks isDropDown={true} />
            <div className=" flex justify-center items-center h-6">
              <ThemeSwitcher height={12} width={18} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
