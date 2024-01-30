import React from 'react';


export const DataCard = ({data} : {data: string[][]}) => {
  return (
    <div className="  bg-coin-card-color bg-opacity-30 dark:bg-purplea rounded-xl max-h-5/6 w-full">
                      <div className="flex flex-col min-[430px]:flex-row justify-between w-full h-1/3  items-center p-3 min-[430px]:p-5">
                        <div className="flex justify-center items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                          <div className="p-2  md:text-base sm:text-sm text-xs font-normal text-light-text-color dark:text-card-text-gray">{data[0][0]}</div>
                        </div>
                        <div className='lg:text-xl md:text-lg sm:text-base text-sm'>{data[0][1]}</div>
                      </div>
                      <div className="flex flex-col min-[430px]:flex-row justify-between w-full h-1/3   items-center p-3 min-[430px]:p-5">
                        <div className="flex justify-center items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                          <div className="p-2  md:text-base sm:text-sm text-xs font-normal text-light-text-color dark:text-card-text-gray">{data[1][0]}</div>
                        </div>
                        <div className='lg:text-xl md:text-lg sm:text-base text-sm'>{data[1][1]}</div>
                      </div>
                      { data[2].length > 0 && 
                      <div className="flex flex-col min-[430px]:flex-row justify-between w-full h-1/3 items-center p-3 min-[430px]:p-5 ">
                        <div className="flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <div className="p-2  md:text-base sm:text-sm text-xs font-normal text-light-text-color dark:text-card-text-gray">{data[2][0]}</div>
                        </div>
                        <div className='lg:text-xl md:text-lg sm:text-base text-sm'>{data[2][1]}</div>
                      </div>}
                    </div>
  )
}
