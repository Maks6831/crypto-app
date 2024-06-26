import React from "react";
import { extractUrl } from "@/app/Utils/addressFormatter";

export const UrlContainer = ({ url }: { url: string }) => {
  return (
    <a
      href={url}
      className=" cursor-pointer w-max md:text-base text-sm px-3 py-2  h-max p-1 m-1 flex justify-center items-center bg-light-button-color shadow-lg dark:bg-purplea rounded-2xl"
    >
      <div className="overflow-x-hidden">{extractUrl(url)}</div>
      <div className="p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6"
          />
        </svg>
      </div>
    </a>
  );
};
