import React from "react";
import { RotatingLines } from "react-loader-spinner";

export const LoadingSpinner = () => {
  return (
    <RotatingLines
      visible={true}
      width="100%"
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
    />
  );
};
