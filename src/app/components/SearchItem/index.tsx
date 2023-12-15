import React, { RefObject, useEffect, useState } from 'react'

export const SearchItem = ({name, index, changeIndex, opacity, keyPress}: {name: string, index: number, changeIndex: React.MouseEventHandler<HTMLDivElement>|Function, opacity: string, keyPress: boolean}) => {
  const [mouseOn, setMouseOn] = useState(false);

  const nextOpacity = keyPress ? `${opacity} cursor-none` : 'hover:bg-opacity-90 bg-opacity-0 ';

  return (
    <div data-index={index} className={`bg-light-button-color ${nextOpacity} rounded-lg p-2 `}>{name}</div>
  )
}
