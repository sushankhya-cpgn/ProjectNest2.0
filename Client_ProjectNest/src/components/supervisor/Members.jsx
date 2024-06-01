import React, { useState } from "react";
import Message from "./Message";

export default function Members() {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const data = [
    {
      id: 1,
      name: "Mohit shahi",
      project: "ProjectNest",
      role: "Student",
      skill: "frontend",
      gmail: "pajiyargravi20011@gmail.com",
    },
    {
      id: 2,
      name: "Ravi Pajiyar",
      project: "ProjectNest",
      role: "Student",
      skill: "frontend",
      gmail: "pajiyargravi20011@gmail.com",
    },
    {
      id: 3,
      name: "Sushankhya Chapagain",
      project: "ProjectNest",
      role: "Student",
      skill: "frontend",
      gmail: "pajiyargravi20011@gmail.com",
    },
    {
      id: 4,
      name: "Arun Bhandari",
      project: "ProjectNest",
      role: "Student",
      skill: "frontend",
      gmail: "pajiyargravi20011@gmail.com",
    },
    {
      id: 5,
      name: "Amrit dahal",
      project: "ProjectNest",
      role: "Supervisor",
      skill: "frontend",
      gmail: "pajiyargravi20011@gmail.com",
    },
    {
      id: 6,
      name: "Sudan Jha",
      project: "ProjectNest",
      role: "Evaluator",
      skill: "frontend",
      gmail: "pajiyargravi20011@gmail.com",
    },
    {
      id: 7,
      name: "Dhiraj Shrestha",
      project: "ProjectNest",
      role: "Coordinator",
      skill: "frontend",
      gmail: "pajiyargravi20011@gmail.com",
    },
  ];
  return (
    <div className="w-full flex justify-center items-center">
      <div className="memcontainer bg-secondary w-11/12 h-5/6 rounded-lg p-4 relative overflow-scroll">
        <table>
          <thead>
            <tr>
              <th className="py-4 px-4  border-b text-left text-md font-semibold text-text">
                Members
              </th>
              <th className="py-4 px-4  border-b text-left text-md font-semibold text-text">
                Role
              </th>
              <th className="py-4 px-4  border-b text-left text-md font-semibold text-text">
                Expertise
              </th>
              <th className="py-4 px-4  border-b text-left text-md font-semibold text-text">
                Gmail
              </th>
              <th className="py-4 px-4  border-b text-left text-md font-semibold text-text">
                Contact
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-500">
            {data.map((row) => (
              <tr key={row.id} className="mt-3">
                <td className="py-4 px-4  text-md">{row.name}</td>
                <td className="py-4 px-4  text-md">{row.role}</td>
                <td className="py-4 px-4  text-md">{row.skill}</td>
                <td className="py-4 px-4  text-md">{row.gmail}</td>
                <td className="py-4 px-4  text-md">
                  <button
                    className="bg-accent px-5 py-3 rounded-lg flex items-center justify-center gap-2 h-9 text-text"
                    onClick={handleClick}
                  >
                    Message
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {open && (
        <>
          <div className="fixed inset-0 backdrop-blur-sm"></div>
          <div className="fixed inset-0 flex justify-center items-center">
            <div className="bg-gray-700 dark:bg-gray-800 w-2/5 h-2/3 rounded-lg p-4 relative">
              <button
                className="absolute top-2 right-3 text-text font-bold text-xl hover:text-gray-400"
                onClick={handleClose}
              >
                X
              </button>
              {/* Render TaskForm component */}

              <Message />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
