import React from 'react'

export const ProgressBar = ({percentage, color, size, backgroundColor} : {percentage : number, color: string, size: string, backgroundColor: string}) => {
  return (
    <div className='  w-full h-full flex items-center justify-center'>
        <div className={`${size} rounded-xl ${backgroundColor} m-2 overflow-hidden `}>
            <div style={{width: `${percentage}%`, backgroundColor: `${color}`}} className='h-full rounded-xl z-30 overflow-hidden -pl-1 ' ></div>
        </div>
    </div>
  )
}