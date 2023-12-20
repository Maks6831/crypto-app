import React from 'react';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import { Currencyconverter } from '../CurrencyConverter';
import { Searchbar } from '../Searchbar';


export const Navbar = () => {
  return (
    <nav className='min-width-full flex justify-center item-center h-20'>
      <div className='w-11/12 flex min-h-full justify-between flex-column'>
        <div className='flex justify-center items-center ml-3'>
          <div className='p-2'>
            <svg xmlns="http://www.w3.org/2000/svg" className='dark:text-white' height="1.5em" viewBox="0 0 640 512">
              <path d="M0 241.1C0 161 65 96 145.1 96c38.5 0 75.4 15.3 102.6 42.5L320 210.7l72.2-72.2C419.5 111.3 456.4 96 494.9 96C575 96 640 161 640 241.1v29.7C640 351 575 416 494.9 416c-38.5 0-75.4-15.3-102.6-42.5L320 301.3l-72.2 72.2C220.5 400.7 183.6 416 145.1 416C65 416 0 351 0 270.9V241.1zM274.7 256l-72.2-72.2c-15.2-15.2-35.9-23.8-57.4-23.8C100.3 160 64 196.3 64 241.1v29.7c0 44.8 36.3 81.1 81.1 81.1c21.5 0 42.2-8.5 57.4-23.8L274.7 256zm90.5 0l72.2 72.2c15.2 15.2 35.9 23.8 57.4 23.8c44.8 0 81.1-36.3 81.1-81.1V241.1c0-44.8-36.3-81.1-81.1-81.1c-21.5 0-42.2 8.5-57.4 23.8L365.3 256z"/>
            </svg>
          </div>
          <h1 className='font-semibold text-xl'>Crypto App</h1>
        </div>
        <div className='flex flex-column justify-center items-center'>
          <div className='p-3 flex flex-column m-3'>
            <div className='m-1'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
              </svg>
            </div>
            <div className='pt-0.5'>Home</div>
          </div>
          <div className='p-3 flex flex-column m-3'>
            <div className='m-1'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M3.196 12.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 12.87z" />
                <path d="M3.196 8.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 8.87z" />
                <path d="M10.38 1.103a.75.75 0 00-.76 0l-7.25 4.25a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.76 0l7.25-4.25a.75.75 0 000-1.294l-7.25-4.25z" />
              </svg>
            </div>
            <div className='pt-0.5'>Portfolio</div>
          </div>
        </div>

        <div className='flex flex-column justify-between '>
          <div className='flex items-center justify-center text-light-text-color  dark:text-white'>
            <Searchbar isSearch={true} defaultValue=''/>
          </div>
          <div className='flex justify-center items-center text-light-text-color dark:text-white'>
            <Currencyconverter/>
          </div>
          <div className='flex justify-center items-center text-light-text-color dark:text-white'>
            <ThemeSwitcher/>
          </div>
        </div>
      </div>
    </nav>
  )
}
