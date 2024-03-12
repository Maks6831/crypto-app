import React from "react";

export const PortfolioHeader = () => {
  return (
    <div className="flex flex-col justify-center items-center  w-full">
      <div className=" text-xl md:text-3xl font-semibold m-2 p-3 ">
        Welcome to My Portfolio
      </div>
      <p className=" m-2 p-2 w-5/6 text-justify md:text-base text-sm">
        Manage your crypto assets with ease! Whether you&lsquo;re a seasoned
        trader or just getting started in the exciting world of
        cryptocurrencies, this portfolio tool is designed to help you keep track
        of your investments effortlessly. You can add your coins by simply
        clicking on the Add Asset button above.
      </p>
    </div>
  );
};
