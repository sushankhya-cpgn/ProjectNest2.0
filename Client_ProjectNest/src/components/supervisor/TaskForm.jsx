import DropDown from "./DropDown";
import Datepicker from "tailwind-datepicker-react";
import { useState } from "react";

const options = {
  title: "Pick Date",
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  clearBtnText: "Clear",
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "bg-gray-700 dark:bg-gray-800",
    todayBtn: "text-text ",
    clearBtn:
      "bg-primary text-text border-none hover:bg-slate-600 transition-all duration-200",
    icons:
      "bg-primary text-text hover:bg-slate-600 transition-all duration-200",
    text: "text-text font-normal ",
    disabledText: "bg-text-gray-600",
    input: "",
    inputIcon: "",
    selected: "bg-red-500 text-text",
  },
  icons: {
    prev: () => <span className="text-text font-bold">&larr;</span>,
    next: () => <span className="text-text font-bold">&rarr;</span>,
  },
  datepickerClassNames: "top-12",
  defaultDate: new Date("2024-05-23"),
  language: "en",
  disabledDates: [],
  weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  inputNameProp: "date",
  inputIdProp: "date",
  inputPlaceholderProp: "Select Date",
  inputDateFormatProp: {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
};

export default function TaskForm() {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleChange = (date) => {
    setSelectedDate(date);
  };

  const handleClose = (state) => {
    setShow(state);
  };

  return (
    <div className="taskform flex flex-col text-base gap-4 mt-4 px-8">
      <div className="section1 flex justify-between">
        <span className="text-text font-medium">Projects</span>
        <span className="text-text ">
          <DropDown />
        </span>
      </div>
      <div className="section2 flex flex-col p-2 bg-primary rounded-lg gap-1.5">
        <span className="text-text font-medium">Tasks</span>
        <div className="inputs flex flex-col gap-1.5 ">
          <input
            type="text"
            placeholder="task"
            className="rounded-md px-2 py-0.5 border-none"
          />
          <span className="text-accent cursor-pointer text-2xl  text-center ">
            +
          </span>
        </div>
      </div>
      <div className="section3 flex justify-between">
        <span className="text-text font-medium">Members</span>
        <span className="text-text ">
          <DropDown />
        </span>
      </div>
      <div className="section4 flex justify-between">
        <span className="text-text font-medium">Due date</span>
        <span className="w-3/5">
          <Datepicker
            options={options}
            onChange={handleChange}
            show={show}
            setShow={handleClose}
          />
        </span>
      </div>
      <div className="section5 flex flex-col  p-2 bg-primary rounded-lg gap-2">
        <span className="text-text  font-medium">Remarks</span>
        <div className="inputs flex flex-col">
          <input
            type="text"
            placeholder="remark"
            className="rounded-md px-2 py-0.5"
          />
        </div>
      </div>
      <div className="buttons flex justify-between">
        <button className="bg-accent px-5 py-3 rounded-lg flex items-center justify-center gap-2 h-9 text-text">
          Edit
        </button>
        <button className="bg-accent px-5 py-3 rounded-lg flex items-center justify-center gap-2 h-9 text-text">
          Submit
        </button>
      </div>
    </div>
  );
}
