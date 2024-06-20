import React, { useState } from "react";
import StdTaskItem from "./StdTaskItem";
import { IoMdNotifications } from "react-icons/io";
import StdTaskNotification from "./StdTaskNotification";

export default function StdTask() {
  const [openNoti, setOpenNoti] = useState(false);

  const handleNotiClick = () => {
    setOpenNoti(!openNoti);
  };

  const handleNotiClose = () => {
    setOpenNoti(false);
  };

  return (
    <div className="w-full p-4">
      <div className="flex flex-row text-text justify-between w-full">
        <span></span>
        <span className="notifications text-accent mr-2">
          <IoMdNotifications
            className="text-2xl cursor-pointer"
            onClick={handleNotiClick}
          />
        </span>
      </div>
      <div className="w-full h-5/6 flex flex-col mt-2 overflow-scroll">
        <h1 className="text-text text-lg py-3 font-bold">
          Tasks Assigned To You
        </h1>
        <div className="flex flex-col gap-3 mt-2">
          <StdTaskItem />
        </div>
      </div>
      {openNoti && (
        <>
          <div className="fixed inset-0 backdrop-blur-sm"></div>
          <div className="fixed inset-0 flex justify-end mr-4 items-center">
            <div className="bg-secondary w-2/5 h-3/4 rounded-lg p-6 relative overflow-scroll">
              <button
                className="absolute top-2 right-3 text-text font-bold text-xl hover:text-gray-400"
                onClick={handleNotiClose}
              >
                X
              </button>
              <StdTaskNotification />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
