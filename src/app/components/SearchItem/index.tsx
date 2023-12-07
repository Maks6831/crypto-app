import React, { RefObject, useState } from 'react'

export const SearchItem = ({name, opacity, index, changeIndex}: {name: string, opacity: string, index: number, changeIndex: React.MouseEventHandler<HTMLDivElement>| undefined}) => {
  const [mouseOn, setMouseOn] = useState(false);

  const ToggleMouse = () => {
    setMouseOn(!mouseOn);
  }

  const changeOpacity = () => { 
    changeIndex
    ToggleMouse();
  }

  return (
    <div data-index={index} onMouseEnter={changeOpacity} onMouseLeave={ToggleMouse} className={`bg-light-button-color ${mouseOn ?'bg-opacity-90' : opacity} rounded-xl`}>{name}</div>
  )
}
