import { useTheme } from "next-themes";
import React from "react";
import { RotatingLines } from "react-loader-spinner";

export const LoadingSpinner = () => {
  const { theme } = useTheme();
  return (
    <RotatingLines
      visible={true}
      width="100%"
      strokeColor={theme === "dark" ? "#8152b5" : "#D8BFD8"}
      strokeWidth="1.7"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
    />
  );
};
