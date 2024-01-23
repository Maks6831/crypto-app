import React, { ReactComponentElement } from 'react'

export const Wrapper = ({children} : any) => {
  return (
    <div style={{maxWidth: '1240px'}} className='flex justify-center items-center'>{children}</div>
  )
}
