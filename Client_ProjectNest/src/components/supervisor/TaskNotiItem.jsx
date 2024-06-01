import React from "react";

export default function TaskNotiItem() {
  return (
    <div className="flex flex-col bg-gray-700 dark:bg-gray-800 text-text rounded-md px-4 py-3 gap-2">
      <div className="timencross flex justify-between text-gray-500">
        <span>01:24</span>
        <span className="cursor-pointer">X</span>
      </div>
      <div className="profilencontent flex gap-8">
        <span className="justify-center items-center">
          <img
            src="https://via.placeholder.com/32"
            alt="Profile"
            className="w-9 h-9 rounded-full mr-2"
          />
        </span>
        <div className="namencontent flex flex-col">
          <span>Ravi Pajiyar</span>
          <span className="text-gray-500">frontend task complete</span>
        </div>
      </div>
    </div>
  );
}
