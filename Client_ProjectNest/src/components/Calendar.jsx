import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import generateDate from "../utils/generateDate";
import getMonth from "../utils/getMonth";
import axios from "axios";
import Spinner from "./Spinner";
const BASE_URL = "http://127.0.0.1:8000/api/v2";

export default function Calendar() {
  //get events from api call
  const [isEventLoading, setIsEventLoading] = useState(false);
  useEffect(function () {
    async function fetchEvents() {
      try {
        setIsEventLoading(true);
        const res = await axios.get(`${BASE_URL}/event`);
        console.log("events date", res);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsEventLoading(false);
      }
    }
    fetchEvents();
  }, []);
  const eventDates = [dayjs(new Date("2024-06-01")).toDate().toDateString()];
  const [selectedDate, setSelectedDate] = useState(null);

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

  const dateClicked = function (e, date) {
    setSelectedDate(date);

    // console.log(e);
    // if (date.date() >= dayjs().date()) {
    //   console.log("add event");
    // } else {
    //   console.log("cannot add event");
    // }
  };

  const isTodayEvent = eventDates.includes(
    dayjs(new Date()).toDate().toDateString()
  );
  // [${calendarWidth}rem]

  if (isEventLoading) {
    return (
      <div
        className={`w-72 h-72 p-2 text-text text-sm py-sm bg-background rounded-lg hidden lg:block`}
      >
        <Spinner />
      </div>
    );
  }
  return (
    <div
      className={`w-72 h-72 p-2 text-text text-sm py-sm bg-background rounded-lg hidden lg:block`}
    >
      {selectedDate && (
        <AddEvent date={selectedDate} setSelectedDate={setSelectedDate} />
      )}

      {!selectedDate && (
        <>
          {isTodayEvent && (
            <div className="text-center hover:text-accent cursor-pointer">
              Show todays event
            </div>
          )}

          <div className="flex justify-between px-4 py-3 ">
            <span className="font-semibold ">
              {getMonth(currentMonth.month, true)}, {currentMonth.year}
            </span>
            {/* date navigation */}
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
              <div className="flex justify-center items-center h-8" key={index}>
                {day}
              </div>
            ))}
          </div>
          {/* dates */}
          <div className="w-full grid grid-cols-7 ">
            {calendar.map(({ date, currentMonth, today }, index) => {
              return (
                <div
                  onClick={
                    currentMonth
                      ? (e) => {
                          dateClicked(e, date);
                        }
                      : () => {}
                  }
                  key={index}
                  className={`${
                    currentMonth && "hover:border cursor-pointer"
                  } border-red-50 rounded-full  flex justify-center items-center  h-8 w-8 ${
                    today && "bg-red-500/85  "
                  } ${!currentMonth && "text-gray-600 "} ${
                    !isTodayEvent &&
                    eventDates.includes(date.toDate().toDateString()) &&
                    "bg-slate-500"
                  }`}
                >
                  {date.date()}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
function AddEvent({ date, setSelectedDate }) {
  const [isFormShown, setIsFormShown] = useState(false);

  //fetch events with that date from backend - use useEffect
  const events = [
    // {
    //   event: "Proposal Submission",
    // },
  ];

  function handleAddEvent() {
    setIsFormShown((prev) => !prev);
  }

  //add event to the database
  function handleSubmitEvent(e) {
    e.preventDefault();
  }

  const isPastDate = date.isBefore(dayjs(), "day");

  return (
    <>
      <div className={`flex felx-row`}>
        <div
          onClick={() => setSelectedDate(false)}
          className="cursor-pointer flex justify-center "
        >
          <IoIosArrowBack size={22} />
        </div>
      </div>

      <div className="text-base text-center w-full">
        {date.toDate().toDateString()}
      </div>
      <div className="flex flex-row justify-between p-1 items-center">
        <span>Events</span>
        {!isPastDate && (
          <span>
            <button className="text-lg" onClick={() => handleAddEvent()}>
              {isFormShown ? "-" : "+"}
            </button>
          </span>
        )}
      </div>
      {isFormShown && (
        <form
          className="flex flex-row justify-between px-5 w-full gap-4"
          onSubmit={handleSubmitEvent}
        >
          <input className="py-1 px-2 outline-none text-whitef w-full bg-slate-600 rounded-md"></input>
          <button
            type="submit"
            className="bg-inherit border-2 border-slate-600 hover:border-slate-500 rounded-lg py-1 px-2 text-white/80 transition-all duration-200"
          >
            Add
          </button>
        </form>
      )}

      {events.length > 0 ? (
        <div className="flex flex-col gap-2 mt-2">
          {events.map(({ event }, i) => (
            <div key={i}>{event}</div>
          ))}
        </div>
      ) : (
        <div className="text-center text-stone-600 p-2">
          No events for this date
        </div>
      )}
    </>
  );
}
