import React from 'react';


export const DataCard = ({data} : {data: string[][]}) => {
  return (
    <div className=" border-2 bg-purplea rounded-xl h-5/6 w-11/12">
                      <div className="flex justify-between w-full h-1/3  items-center p-5">
                        <div className="flex justify-center items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                          <div className="p-2">{data[0][0]}</div>
                        </div>
                        <div>{data[0][1]}</div>
                      </div>
                      <div className="flex justify-between w-full h-1/3   items-center p-5">
                      <div className="flex justify-center items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                          <div className="p-2">{data[1][0]}</div>
                        </div>
                        <div>{data[1][1]}</div>
                      </div>
                      <div className="flex justify-between w-full h-1/3 items-center p-5 ">
                      <div className="flex justify-center items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                          <div className="p-2">{data[2][0]}</div>
                        </div>
                        <div>{data[2][1]}</div>
                      </div>
                    </div>
  )
}
