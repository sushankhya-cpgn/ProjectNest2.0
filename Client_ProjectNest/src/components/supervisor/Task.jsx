import React, { useState } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import { IoMdNotifications } from "react-icons/io";
import TaskNotifications from "./TaskNotifications";

export default function Task() {
  const [openTask, setOpenTask] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);

  const handleClick = () => {
    setOpenTask(!openTask);
  };

  const handleClose = () => {
    setOpenTask(false);
  };

  const handleNotiClick = () => {
    setOpenNoti(!openNoti);
  };

  const handleNotiClose = () => {
    setOpenNoti(false);
  };

  return (
    <div className="w-full p-4">
      <div className="flex flex-row text-text justify-between w-full">
        <button
          className="bg-accent px-5 py-3 rounded-xl flex items-center justify-center gap-2 h-12"
          onClick={handleClick}
        >
          <span className="text-xl">+</span>
          <span className="hidden sm:block sm:text-sm">Create Task</span>
        </button>
        <span className="notifications text-accent mr-2">
          <IoMdNotifications
            className="text-2xl cursor-pointer"
            onClick={handleNotiClick}
          />
        </span>
      </div>
      <div className="w-full h-5/6 flex flex-col mt-2 overflow-scroll">
        <h1 className="text-text text-lg py-3 font-bold">Tasks</h1>
        <div className="flex flex-col gap-3 mt-2 overflow-scroll">
          <TaskItem />
        </div>
      </div>
      {openTask && (
        <>
          <div className="fixed inset-0 backdrop-blur-sm"></div>
          <div className="fixed inset-0 flex justify-center items-center">
            <div className="bg-secondary w-1/3 h-4/5 rounded-lg p-6 relative">
              <button
                className="absolute top-2 right-3 text-text font-bold text-xl hover:text-gray-400"
                onClick={handleClose}
              >
                X
              </button>
              {/* Render TaskForm component */}
              <TaskForm />
            </div>
          </div>
        </>
      )}
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
              <TaskNotifications />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
