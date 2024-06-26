import React from "react";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";
import { Currencyconverter } from "../CurrencyConverter";
import { Searchbar } from "../Searchbar";
import { NavbarDropDown } from "../NavBarDropDown";
import { NavLinks } from "../NavLinks";
import { TitleHeader } from "../TitleHeader";
import { Wrapper } from "../Wrapper";

export const Navbar = () => {
  return (
    <nav className="w-full max-w-[1300px] flex items-center h-12 ">
      <div className=" w-full flex  items-center justify-between  px-4 md:px-16 ">
        <div className="flex w-1/2 justify-start  md:pr-4 ">
          <TitleHeader isNavbar={true} />
          <div className="">
            <NavLinks isDropDown={false} />
          </div>
        </div>
        <div className="  flex flex-column items-center h-full  justify-end sm:w-full  md:w-1/3 ">
          <div className="flex items-center justify-center h-full text-light-text-color  dark:text-white">
            <Searchbar isSearch={true} defaultValue="" isPortfolio={false} />
          </div>
          <div className="flex justify-center items-center text-light-text-color dark:text-white">
            <Currencyconverter />
          </div>
          <div className=" justify-center items-center text-light-text-color dark:text-white hidden sm:flex">
            <ThemeSwitcher height={20} width={20} />
          </div>
        </div>
        <NavbarDropDown />
      </div>
    </nav>
  );
};
