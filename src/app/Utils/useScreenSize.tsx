// useScreenSize.js
import { useState, useEffect } from 'react';
import { ScreenSize } from '../types/ScreenSize';

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
};