import React from "react";
import { useState } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

export default function Task() {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className="w-full p-4">
      <div className="flex flex-row text-text  justify-between w-full">
        <button
          className="bg-accent  px-5 py-3 rounded-xl flex items-center justify-center gap-2 h-12"
          onClick={handleClick}
        >
          <span className="text-xl">+</span>{" "}
          <span className="hidden sm:block sm:text-sm">Create Task</span>
        </button>
        <span className="notifications text-text bg-accent h-10">
          Task due notifications
        </span>
      </div>
      <div className="w-full h-fit  flex flex-col mt-2">
        <h1 className="text-text text-lg py-3 font-bold">Tasks</h1>
        <div className=" flex flex-col gap-3 mt-2">
          <TaskItem />
        </div>
      </div>
      <TaskForm />
    </div>
  );
}
