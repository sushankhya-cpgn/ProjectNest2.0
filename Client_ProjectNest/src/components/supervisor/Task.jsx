import React, { useState } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

export default function Task() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
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
        <span className="notifications text-text bg-accent h-10">
          Task notifications
        </span>
      </div>
      <div className="w-full h-fit flex flex-col mt-2">
        <h1 className="text-text text-lg py-3 font-bold">Tasks</h1>
        <div className="flex flex-col gap-3 mt-2">
          <TaskItem />
        </div>
      </div>
      {open && (
        <>
          <div className="fixed inset-0 backdrop-blur-sm"></div>
          <div className="fixed inset-0 flex justify-center items-center">
            <div className="bg-secondary w-1/3 h-3/4 rounded-lg p-6 relative">
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
    </div>
  );
}
