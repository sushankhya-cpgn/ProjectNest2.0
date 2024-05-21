import React from "react";
import TaskItem from "./TaskItem";

export default function Task() {
  return (
    <div className="w-full ">
      <div className="flex flex-row text-text  justify-between w-full p-4">
        <button className="bg-accent  px-5 py-3 rounded-xl flex items-center justify-center gap-2 h-12">
          <span className="text-xl">+</span>{" "}
          <span className="hidden sm:block sm:text-sm">Create Task</span>
        </button>
        <span className="notifications text-text bg-accent h-10">
          Task due notifications
        </span>
      </div>
      <div className="w-80 h-fit  flex flex-col">
        <h1 className="text-text text-lg py-3 font-bold">Tasks</h1>
        <div className=" flex flex-col gap-2 "></div>
      </div>
    </div>
  );
}
