import React from 'react';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import { Currencyconverter } from '../CurrencyConverter';
import { Searchbar } from '../Searchbar';
import { NavbarDropDown } from '../NavBarDropDown';
import { NavLinks } from '../NavLinks';


export const Navbar = () => {
  return (
    <nav className='w-full flex justify-center item-center md:h-20'>
      <div className=' lg:w-11/12 w-full flex min-h-full justify-between flex-column mr-2'>
        <div className='hidden md:flex justify-center items-center md:ml-3'>
          <div className='p-2 '>
            <svg xmlns="http://www.w3.org/2000/svg" className='dark:text-white ' height="1.5em" viewBox="0 0 640 512">
              <path d="M0 241.1C0 161 65 96 145.1 96c38.5 0 75.4 15.3 102.6 42.5L320 210.7l72.2-72.2C419.5 111.3 456.4 96 494.9 96C575 96 640 161 640 241.1v29.7C640 351 575 416 494.9 416c-38.5 0-75.4-15.3-102.6-42.5L320 301.3l-72.2 72.2C220.5 400.7 183.6 416 145.1 416C65 416 0 351 0 270.9V241.1zM274.7 256l-72.2-72.2c-15.2-15.2-35.9-23.8-57.4-23.8C100.3 160 64 196.3 64 241.1v29.7c0 44.8 36.3 81.1 81.1 81.1c21.5 0 42.2-8.5 57.4-23.8L274.7 256zm90.5 0l72.2 72.2c15.2 15.2 35.9 23.8 57.4 23.8c44.8 0 81.1-36.3 81.1-81.1V241.1c0-44.8-36.3-81.1-81.1-81.1c-21.5 0-42.2 8.5-57.4 23.8L365.3 256z"/>
            </svg>
          </div>
          <h1 className='font-semibold text-xl'>Crypto App</h1>
        </div>
        <NavLinks isDropDown={false}/>
        <div className='flex flex-column justify-end sm:w-full  md:w-1/3 '>
          <div className='flex items-center justify-center text-light-text-color  dark:text-white'>
            <Searchbar isSearch={true} defaultValue=''/>
          </div>
          <div className='flex justify-center items-center text-light-text-color dark:text-white'>
            <Currencyconverter/>
          </div>
          <div className=' justify-center items-center text-light-text-color dark:text-white hidden sm:flex'>
            <ThemeSwitcher height={20} width={20}/>
          </div>
        </div>
        <NavbarDropDown/>
      </div>
    </nav>
  )
}
