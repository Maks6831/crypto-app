import React, { RefObject } from 'react'

export const SearchItem = ({name, opacity}: {name: string, opacity: string}) => {
  return (
    <div className={`bg-light-button-color ${opacity} rounded-xl`}>{name}</div>
  )
}
