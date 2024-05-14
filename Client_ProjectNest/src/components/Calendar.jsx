import dayjs from "dayjs";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import generateDate from "../utils/generateDate";
import getMonth from "../utils/getMonth";

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(() => ({
    month: dayjs().month(),
    year: dayjs().year(),
  }));
  const calendar = generateDate(currentMonth.month, currentMonth.year);

  const changeCalendar = function (monthChange) {
    if (monthChange < 0) {
      setCurrentMonth((curr) => ({
        month: (12 + curr.month - 1) % 12,
        year: curr.month === 0 ? curr.year - 1 : curr.year,
      }));
    } else if (monthChange > 0) {
      setCurrentMonth((curr) => ({
        month: (curr.month + 1) % 12,
        year: curr.month === 11 ? curr.year + 1 : curr.year,
      }));
    } else {
      setCurrentMonth({
        month: dayjs().month(),
        year: dayjs().year(),
      });
    }
  };
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  return (
    <div className="w-80 p-2 text-text text-sm py-sm bg-background rounded-lg">
      <div className="flex justify-between px-4 py-3 ">
        <span className="font-semibold ">
          {getMonth(currentMonth.month)}, {currentMonth.year}
        </span>
        <div className="flex gap-6">
          <span
            className="flex justify-center items-center cursor-pointer rounded-md hover:bg-slate-600 transition-all duration-200"
            onClick={() => changeCalendar(-1)}
          >
            <IoIosArrowBack />
          </span>
          <span
            className="cursor-pointer  hover:bg-slate-600 rounded-md px-1 transition-all duration-200"
            onClick={() => changeCalendar(0)}
          >
            Today
          </span>
          <span
            className="flex justify-center items-center cursor-pointer rounded-md hover:bg-slate-600 transition-all duration-200"
            onClick={() => changeCalendar(1)}
          >
            <IoIosArrowForward />
          </span>
        </div>
      </div>
      {/* days */}
      <div className="w-full grid grid-cols-7 text-stone-400 border-stone-700 border-y ">
        {days.map((day, index) => (
          <div className="flex justify-center items-center h-10" key={index}>
            {day}
          </div>
        ))}
      </div>
      {/* dates */}
      <div className="w-full grid grid-cols-7 ">
        {calendar.map(({ date, currentMonth, today }, index) => {
          return (
            <div
              onClick={(e) => console.log(e.target)}
              key={index}
              className={`hover:border hover:border-red-50 rounded-full cursor-pointer flex justify-center items-center  h-10 w-10 ${
                today && "bg-red-500/85  "
              } ${!currentMonth && "text-gray-600"}`}
            >
              {date.date()}
            </div>
          );
        })}
      </div>
    </div>
  );
}
