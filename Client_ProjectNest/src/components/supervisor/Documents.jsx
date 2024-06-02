import React from "react";
import { FaFilter } from "react-icons/fa6";
import { FaSortAmountUp } from "react-icons/fa";

export default function Documents() {
  return (
    <div className="w-full flex justify-center items-center p-2">
      <div className="w-full h-full rounded-lg p-6 relative overflow-scroll flex flex-col gap-3">
        <div className="heading text-text font-semibold text-xl">Documents</div>
        <div className="w-full border-[0.5px] border-gray-300 "></div>
        <div className="buttons flex gap-6 mt-2">
          <button className="bg-accent px-5 py-3 rounded-lg flex items-center justify-center gap-3 h-10 text-text">
            <span className="text-xl">+</span>
            <span className="hidden sm:block sm:text-sm">New</span>
          </button>
          <button className="bg-secondary px-5 py-3 rounded-lg flex items-center justify-center gap-3 h-10 text-text">
            <span className="text-xl">
              <FaFilter />
            </span>
            <span className="hidden sm:block sm:text-sm">Filters</span>
          </button>
          <button className="bg-secondary px-5 py-3 rounded-lg flex items-center justify-center gap-3 h-10 text-text">
            <span className="text-xl">
              <FaSortAmountUp />
            </span>
            <span className="hidden sm:block sm:text-sm">Sort By</span>
          </button>
        </div>
        <div className="folders flex flex-col gap-3 mt-5">
          <span className="text-text font-semibold text-xl">Folders</span>
          <div className="boxes flex gap-5">
            <div className="w-40 h-40 rounded-md bg-secondary text-text"></div>
            <div className="w-40 h-40 rounded-md bg-secondary text-text"></div>
            <div className="w-40 h-40 rounded-md bg-secondary text-text"></div>
            <div className="w-40 h-40 rounded-md bg-secondary text-text"></div>
            <div className="w-40 h-40 rounded-md bg-secondary text-text"></div>
          </div>
        </div>
        <div className="recent flex flex-col gap-3 mt-5">
          <span className="text-text font-semibold text-xl">Recent</span>
          <div className="boxes flex gap-5">
            <div className="w-44 h-20 rounded-md bg-secondary text-text"></div>
            <div className="w-44 h-20 rounded-md bg-secondary text-text"></div>
            <div className="w-44 h-20 rounded-md bg-secondary text-text"></div>
            <div className="w-44 h-20 rounded-md bg-secondary text-text"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
