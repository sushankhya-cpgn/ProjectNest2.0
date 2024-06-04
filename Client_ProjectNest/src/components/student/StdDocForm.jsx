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

export default function StdDocForm() {
  const initialData = [
    {
      id: 1,
      name: "",
      type: "",
      members: "",
    },
  ];
  const projectOptions = ["rentNread"];
  const memberOptions = [
    "Ravi Pajiyar",
    "Mohit Shahi",
    "Arun Bhandari",
    "Sushankhya Chapa",
  ];
  const resultOptions = ["Weekly", "Final"];
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState(initialData);
  const [inputs, setInputs] = useState([""]);

  const handleSelectChange = (id, field, value) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

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
        {data.map((row) => (
          <span className="text-text" key={row.id}>
            <select
              value={row.name}
              onChange={(e) =>
                handleSelectChange(row.id, "name", e.target.value)
              }
              className="bg-primary border-none rounded-md p-1.5 focus:outline-none focus:ring-0"
            >
              <option value="">project</option>
              {projectOptions.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </span>
        ))}
      </div>
      <div className="section2 flex justify-between">
        <span className="text-text font-medium">Result Type</span>
        {data.map((row) => (
          <span className="text-text" key={row.id}>
            <select
              value={row.type}
              onChange={(e) =>
                handleSelectChange(row.id, "type", e.target.value)
              }
              className="bg-primary border-none rounded-md p-1.5 focus:outline-none focus:ring-0"
            >
              <option value="">result</option>
              {resultOptions.map((result) => (
                <option key={result} value={result}>
                  {result}
                </option>
              ))}
            </select>
          </span>
        ))}
      </div>
      <div className="section3 flex justify-between">
        <span className="text-text font-medium">Members</span>
        {data.map((row) => (
          <span className="text-text" key={row.id}>
            <select
              value={row.members}
              onChange={(e) =>
                handleSelectChange(row.id, "members", e.target.value)
              }
              className="bg-primary border-none rounded-md p-1.5 focus:outline-none focus:ring-0"
            >
              <option value="">member</option>
              {memberOptions.map((members) => (
                <option key={members} value={members}>
                  {members}
                </option>
              ))}
            </select>
          </span>
        ))}
      </div>
      <div className="section4 flex justify-between">
        <span className="text-text font-medium">Created on</span>
        <span className="w-3/5">
          <Datepicker
            options={options}
            onChange={handleChange}
            show={show}
            setShow={handleClose}
          />
        </span>
      </div>
      <div className="section5 flex flex-col p-2 bg-primary rounded-lg gap-2">
        <span className="text-text font-medium">Result</span>
        <div className="inputs flex flex-col">
          <input
            type="file"
            className="rounded-md px-2 py-0.5 border-none focus:outline-none focus:ring-0"
          />
        </div>
      </div>
      <div className="section6 flex flex-col p-2 bg-primary rounded-lg gap-2">
        <span className="text-text font-medium">Remarks</span>
        <div className="inputs flex flex-col">
          <input
            type="text"
            placeholder="remark"
            className="rounded-md px-2 py-0.5 border-none focus:outline-none focus:ring-0"
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
