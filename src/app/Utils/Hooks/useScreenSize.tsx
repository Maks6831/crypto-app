// useScreenSize.js
import { useState, useEffect } from "react";
import { ScreenSize } from "../../types/ScreenSize";

export const useScreenSize = () => {
  const isClient = typeof window == "object";
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};
