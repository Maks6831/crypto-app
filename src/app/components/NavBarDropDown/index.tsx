'use client';
import React from 'react';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';

export const NavbarDropDown = () => {
  return (
    <div className='sm:hidden flex justify-end items-center'>
          <div className='m-4 relative'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"/>
            </svg>
            <div className='absolute -left-11 top-7 rounded-xl bg-opacity-75 bg-light-button-color flex justify-center  p-1 w-20 z-50 dark:bg-dark-button-color flex-col'>
                <div className='pb-2'>Home</div>
                <div className='pb-2'>Portfolio</div>
                <div className='pb-2'>
                    <ThemeSwitcher/>
                </div>
            </div>
          </div>
        </div>
  )
}
