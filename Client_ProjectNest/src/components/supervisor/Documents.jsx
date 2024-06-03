import React, { useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { FaSortAmountUp } from "react-icons/fa";
import DocForm from "./DocForm";
import File from "./File";
import RecentFile from "./RecentFile";

export default function Documents() {
  const [openNew, setOpenNew] = useState(false);

  const handleClick = () => {
    setOpenNew(!openNew);
  };

  const handleClose = () => {
    setOpenNew(false);
  };
  return (
    <div className="w-full flex justify-center items-center p-2">
      <div className="w-full h-full rounded-lg p-6 relative overflow-scroll flex flex-col gap-3">
        <div className="heading text-text font-semibold text-xl">Documents</div>
        <div className="w-full border-[0.5px] border-gray-300 "></div>
        <div className="buttons flex gap-6 mt-3">
          <button
            className="bg-accent px-5 py-3 rounded-lg flex items-center justify-center gap-3 h-10 text-text"
            onClick={handleClick}
          >
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
          <span className="text-text font-semibold text-xl">Files</span>
          <div className="boxes flex gap-5 overflow-y-scroll whitespace-nowrap">
            <File />
            <File />
            <File />
          </div>
        </div>
        <div className="recent flex flex-col gap-3 mt-5">
          <span className="text-text font-semibold text-xl">Recent</span>
          <div className="boxes flex gap-5">
            <RecentFile />
            <RecentFile />
          </div>
        </div>
      </div>
      {openNew && (
        <>
          <div className="fixed inset-0 backdrop-blur-sm"></div>
          <div className="fixed inset-0 flex justify-center items-center">
            <div className="bg-secondary w-1/3 h-5/6 rounded-lg p-6 relative">
              <button
                className="absolute top-2 right-3 text-text font-bold text-xl hover:text-gray-400"
                onClick={handleClose}
              >
                X
              </button>
              <DocForm />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
