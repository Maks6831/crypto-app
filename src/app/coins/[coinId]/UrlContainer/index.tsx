import React from 'react'

export const UrlContainer = ({url}: {url:string}) => {
  return (
    <div className='w-max h-3'>
        <div>{url}</div>
    </div>
  )
}
