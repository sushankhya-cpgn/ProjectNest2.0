import React from "react";
import { HiMiniLink } from "react-icons/hi2";
import { IoIosSend } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import OverlappingProfiles from "../OverlappingProfiles";

export default function StdGroupChat() {
  return (
    <div className="w-full flex justify-center items-center p-2">
      <div className="  w-full h-full rounded-lg p-6 relative overflow-scroll flex flex-col justify-between">
        <div className="title text-center font-medium text-lg text-gray-200">
          ProjectNest
        </div>
        <div className="header flex justify-between mt-5">
          <OverlappingProfiles />
          <div className="audionvideo flex gap-10 text-accent mx-4">
            <span className="name">
              <IoCall className="text-xl" />
            </span>
            <span className="name">
              <FaVideo className="text-xl" />
            </span>
          </div>
        </div>
        <div className="messagebox w-full h-5/6"></div>
        <div className="footer w-full h-fit flex gap-3">
          <span className="link text-xl cursor-pointer">
            <HiMiniLink className="text-accent font-bold mt-2" />
          </span>
          <input
            type="text"
            placeholder="message"
            className="rounded-md h-9 w-full flex-grow p-2 border-none focus:outline-none focus:ring-0 "
          />
          <button className="bg-accent px-5 py-3 rounded-lg flex items-center justify-center gap-2 h-9 text-text text-xl">
            <IoIosSend />
          </button>
        </div>
      </div>
    </div>
  );
}
