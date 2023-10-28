import React from 'react'

export const ProgressBar = ({percentage, color} : {percentage : number, color: string}) => {
  return (
    <div className='flex items-center justify-center'>
        <div className='w-12 h-2 rounded-xl bg-zinc-500 m-2 overflow-hidden '>
            <div style={{width: `${percentage}%`, backgroundColor: `${color}`}} className='h-full rounded-xl z-30 overflow-hidden -pl-1 ' ></div>
        </div>
    </div>
  )
}