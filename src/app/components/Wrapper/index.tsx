import React, { ReactComponentElement } from 'react'

export const Wrapper = ({children} : any) => {
  return (
    <div style={{maxWidth: '1300px'}} className='flex justify-center items-center w-full '>{children}</div>
  )
}
