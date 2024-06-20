import Datepicker from "tailwind-datepicker-react";
import { useState } from "react";
import { useProject } from "../../contexts/ProjectContext";
import axios from "axios";

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
  const initialData = {
    project: "",
    members: "",
    remarks: "",
  };
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formData, setFormData] = useState(initialData);
  const [task, setTask] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(true);
  const { projectDetails } = useProject();

  const handleSelectChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleChange = (date) => {
    setSelectedDate(date);
  };

  const handleClose = (state) => {
    setShow(state);
  };

  const handleSubmit = async () => {
    const submitData = {
      assignedTo: formData.members,
      task: task, // Single task input
      dueDate: selectedDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
      remarks: formData.remarks,
    };

    console.log("Submit Data:", submitData);
    console.log("Project ID:", projectDetails.project._id);

    if (!projectDetails.project) {
      console.error("Project details are not available.");
      alert("Project details are not available. Please try again.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token not found. Please log in again.");
        return;
      }

      const response = await axios.post(
        `http://127.0.0.1:8000/api/v2/project/${projectDetails.project._id}/task`,
        submitData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // alert("Task submitted successfully!");
        setIsFormVisible(false); // Hide the form after successful submission
        // Optionally, reset form or handle success
      } else {
        console.error("Error submitting task:", response.data);
        alert("Failed to submit task. Please try again.");
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      alert("An error occurred. Please try again.");
    }
  };

  if (!isFormVisible) {
    return (
      <div className="text-center text-text">Task submitted successfully!</div>
    );
  }

  return (
    <div className="taskform flex flex-col text-base gap-4 mt-4 px-8">
      <div className="section1 flex justify-between">
        <span className="text-text font-medium">Projects</span>
        {/* Assuming this is meant to be filled in a future implementation */}
      </div>
      <div className="section2 flex flex-col p-2 bg-primary rounded-lg gap-1.5">
        <span className="text-text font-medium">Tasks</span>
        <div className="inputs flex flex-col gap-1.5 overflow-auto max-h-[4.5rem]">
          <input
            type="text"
            placeholder="task"
            value={task}
            className="task-input w-full rounded-md px-2 py-0.5 border-none focus:outline-none focus:ring-0"
            onChange={(event) => setTask(event.target.value)}
          />
        </div>
      </div>
      <div className="section3 flex justify-between">
        <span className="text-text font-medium">Members</span>
        <span className="text-text">
          <select
            value={formData.members}
            onChange={(e) => handleSelectChange("members", e.target.value)}
            className="bg-primary border-none rounded-md p-1.5 focus:outline-none focus:ring-0"
          >
            <option value="">member</option>
            {projectDetails?.project?.members.map((member) => (
              <option key={member._id} value={member._id}>
                {member.firstName}
              </option>
            ))}
          </select>
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
      <div className="section5 flex flex-col p-2 bg-primary rounded-lg gap-2">
        <span className="text-text font-medium">Remarks</span>
        <div className="inputs flex flex-col">
          <input
            type="text"
            placeholder="remark"
            value={formData.remarks}
            onChange={(e) => handleSelectChange("remarks", e.target.value)}
            className="rounded-md px-2 py-0.5 border-none focus:outline-none focus:ring-0"
          />
        </div>
      </div>
      <div className="buttons flex justify-end ">
        <button
          className="bg-accent px-5 py-3 rounded-lg flex items-center justify-center gap-2 h-9 text-text"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
