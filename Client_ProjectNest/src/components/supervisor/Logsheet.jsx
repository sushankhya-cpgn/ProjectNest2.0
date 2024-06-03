import React, { useState } from "react";
import DateBox from "../DateBox";

export default function Logsheet() {
  const initialData = [
    {
      id: 1,
      name: "Mohit Shahi",
      task: "frontend task ui complete",
      status: "",
      remarks: "do it urgent",
      grade: "",
      attendance: "",
    },
    {
      id: 2,
      name: "Ravi Pajiyar",
      task: "frontend task ui complete",
      status: "",
      remarks: "do it urgent",
      grade: "",
      attendance: "",
    },
    {
      id: 3,
      name: "Sushankhya Chapagain",
      task: "frontend task ui complete",
      status: "",
      remarks: "do it urgent",
      grade: "",
      attendance: "",
    },
    {
      id: 4,
      name: "Arun Bhandari",
      task: "frontend task ui complete",
      status: "",
      remarks: "do it urgent",
      grade: "",
      attendance: "",
    },
  ];

  const statusOptions = ["progress", "completed"];
  const gradeOptions = [
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D",
    "E",
    "F",
  ];
  const attendanceOptions = ["present", "absent"];

  const [data, setData] = useState(initialData);

  const handleSelectChange = (id, field, value) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  return (
    <div className="w-full flex flex-col  items-center px-4 gap-5 py-3">
      <div className="datebox">
        <DateBox />
      </div>
      <div className="memcontainer w-full h-3/4 rounded-lg p-4 relative overflow-scroll">
        <table>
          <thead>
            <tr>
              <th className="py-4 px-4 border-b text-left text-md font-semibold text-text">
                Students
              </th>
              <th className="py-4 px-4 border-b text-left text-md font-semibold text-text">
                Task
              </th>
              <th className="py-4 px-4 border-b text-left text-md font-semibold text-text">
                Task status
              </th>
              <th className="py-4 px-4 border-b text-left text-md font-semibold text-text">
                Remarks
              </th>
              <th className="py-4 px-4 border-b text-left text-md font-semibold text-text">
                Grade
              </th>
              <th className="py-4 px-4 border-b text-left text-md font-semibold text-text">
                Attendance
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-500">
            {data.map((row) => (
              <tr key={row.id} className="mt-3">
                <td className="py-4 px-4 text-md">{row.name}</td>
                <td className="py-4 px-4 text-md">{row.task}</td>
                <td className="py-4 px-4 text-md">
                  <select
                    value={row.status}
                    onChange={(e) =>
                      handleSelectChange(row.id, "status", e.target.value)
                    }
                    className="bg-primary border-none rounded-md p-1.5 focus:outline-none focus:ring-0"
                  >
                    <option value="">status</option>
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-4 px-4 text-md">{row.remarks}</td>
                <td className="py-4 px-4 text-md">
                  <select
                    value={row.grade}
                    onChange={(e) =>
                      handleSelectChange(row.id, "grade", e.target.value)
                    }
                    className="bg-primary border-none rounded-md p-1.5 focus:outline-none focus:ring-0"
                  >
                    <option value="">grade</option>
                    {gradeOptions.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-4 px-4 text-md">
                  <select
                    value={row.attendance}
                    onChange={(e) =>
                      handleSelectChange(row.id, "attendance", e.target.value)
                    }
                    className="bg-primary border-none rounded-md p-1.5 focus:outline-none focus:ring-0"
                  >
                    <option value="">attendance</option>
                    {attendanceOptions.map((attendance) => (
                      <option key={attendance} value={attendance}>
                        {attendance}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="nextnprevbtn w-full flex justify-between">
        <button className="bg-accent px-5 py-3 rounded-lg flex items-center justify-center gap-2 h-9 text-text">
          Previous
        </button>
        <button className="bg-accent px-5 py-3 rounded-lg flex items-center justify-center gap-2 h-9 text-text">
          Next
        </button>
      </div>
    </div>
  );
}
