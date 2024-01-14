'use client';
import { usePathname,  useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export const NavLinks = ({isDropDown}: {isDropDown: boolean}) => {
    const [isHome, setIsHome] = useState(true);
    const pathname = usePathname()
    const router = useRouter();

    const goTo = (param: string) => {
        if(pathname !== param){
            router.push(param);
        }
    }

    useEffect(()=>{
        pathname.includes('portfolio') ? setIsHome(false): setIsHome(true);
    },[pathname])

  return (
    <div className={`${isDropDown ? 'flex flex-col': 'hidden sm:flex'} justify-center items-center`}>
        <div onClick={()=>goTo('/')} className={`${isHome ? ' ' : 'text-opactiy-50 dark:text-opacity-50'} text-purpleb dark:text-white sm:p-3 sm:m-3 md:p-0 md:m-0 lg:p-3 flex flex-column lg:m-3 cursor-pointer`}>
          <div className=' m-1'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
            </svg>
          </div>
          <div className='pt-1 '>Home</div>
        </div>
        <div onClick={()=>goTo('portfolio')} className={`p-3 flex flex-column m-3 ${isHome ? 'text-opacity-50 dark:text-opacity-50' : ' '}  text-purpleb dark:text-white cursor-pointer`}>
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
  )
}
