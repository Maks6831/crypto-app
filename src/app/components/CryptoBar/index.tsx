import React from 'react'
import Image from 'next/image';
import { ProgressBar } from '../Progressbar';

export const Cryptobar = ({currency, percentage, color}: {currency: any, percentage: number, color: string}) => {
  return (
    <div className='flex justify-center items-center'>
                    <div className=' ml-1 h-6 w-6'>
                        <Image
                            src={currency}
                            alt={currency}
                            style={{
                                width: '100%',
                                height: '100%'
                            }}
                        />
                    </div>
                    <div>
                        <ProgressBar 
                            percentage={percentage}
                            color={color}
                            size={'w-12 h-2 '}
                            backgroundColor={'bg-zinc-500'}
                        />
                    </div>
                </div>  
  )
}
