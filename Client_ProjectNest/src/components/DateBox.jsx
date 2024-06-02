import React from "react";
import dayjs from "dayjs";

export default function DateBox() {
  const currentDate = dayjs().format("MMMM D, YYYY");
  return (
    <div className="bg-gray-700 dark:bg-gray-800 p-3 rounded-lg shadow-lg">
      <span className="text-xl font-semibold text-text">
        For the Due date: {currentDate}
      </span>
    </div>
  );
}
