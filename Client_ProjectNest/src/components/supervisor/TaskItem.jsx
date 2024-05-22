import React from "react";
import CircularProgress from "./CircularProgress";

export default function TaskItem() {
  const data = [
    {
      id: 1,
      name: "Ravi Pajiyar",
      project: "ProjectNest",
      dueDate: "2024-05-21",
      remark: "Urgent",
      task: "frontend task complete",
    },
  ];
  return (
    <div className="flex flex-col items-start bg-secondary rounded-lg p-4 shadow-md cursor-pointer w-full">
      <div className="uppersection flex w-full">
        <div className="leftsection w-2/5">
          <table>
            <thead>
              <tr>
                <th className="py-2 px-4  border-b text-left text-md font-semibold text-text flex gap-4">
                  Overdue{" "}
                  <span>
                    <CircularProgress />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id}>
                  <td className="py-2 px-4 text-md flex items-center gap-4 text-text">
                    <input type="checkbox" />
                    <span className="ml-2">{row.task}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rightsection">
          <table className="">
            <thead>
              <tr>
                <th className="py-2 px-4  border-b text-left text-md font-semibold text-text">
                  Assignee
                </th>
                <th className="py-2 px-4  border-b text-left text-md font-semibold text-text">
                  Project
                </th>
                <th className="py-2 px-4  border-b text-left text-md font-semibold text-text">
                  Due Date
                </th>
                <th className="py-2 px-4  border-b text-left text-md font-semibold text-text">
                  Remarks
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-500">
              {data.map((row) => (
                <tr key={row.id} className="mt-3">
                  <td className="py-2 px-4  text-md">{row.name}</td>
                  <td className="py-2 px-4  text-md">{row.project}</td>
                  <td className="py-2 px-4  text-md">{row.dueDate}</td>
                  <td className="py-2 px-4  text-md">{row.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="buttons flex justify-between w-full">
        <button className="text-accent mt-2 ">+ Add task</button>
        <button className="text-red-500 mt-2 ">- Delete task</button>
      </div>
    </div>
  );
}
