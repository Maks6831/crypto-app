"use client";

import { Wrapper } from "../components/Wrapper";

export default function Portfolio() {
  return (
    <Wrapper>
      <div className="w-11/12 border-2 h-24 md:h-12 flex flex-col md:flex-row items-center justify-between my-2  font-medium text-xl ">
        <div>Your Statistics</div>
        <button className="w-56 h-10 md:h-full border-2 flex  justify-center items-center dark:bg-carousel-button-color-two dark:bg-opacity-50 rounded-md dark:border-carousel-button-color-one dark:border-opacity-20 shadow-lg dark:shadow-border-carousel-button-color-one">
          <div className="font-medium text-base">Add Asset</div>
        </button>
      </div>
    </Wrapper>
  );
}
