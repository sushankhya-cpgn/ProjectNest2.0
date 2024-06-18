import React, { useState } from "react";
import CircularProgress from "./CircularProgress";

export default function TaskItem() {
  const initialData = [
    {
      id: 1,
      name: "Ravi Pajiyar",
      project: "ProjectNest",
      dueDate: "2024-05-21",
      remark: "Urgent",
      task: "frontend task complete",
    },
    // Add more task items if needed
  ];

  const [tasks, setTasks] = useState(initialData);

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="w-full">
      {tasks.map((row) => (
        <div
          key={row.id}
          className="flex flex-col items-start bg-secondary rounded-lg p-4 shadow-md cursor-pointer w-full mb-4"
        >
          <div className="uppersection flex w-full">
            <div className="leftsection w-2/5">
              <table>
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left text-md font-semibold text-text flex gap-4">
                      Overdue
                      <span>
                        <CircularProgress />
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 text-md flex items-center gap-4 text-text">
                      <span className="ml-2">{row.task}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="rightsection w-3/5">
              <table>
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left text-md font-semibold text-text">
                      Assignee
                    </th>
                    <th className="py-2 px-4 border-b text-left text-md font-semibold text-text">
                      Project
                    </th>
                    <th className="py-2 px-4 border-b text-left text-md font-semibold text-text">
                      Due Date
                    </th>
                    <th className="py-2 px-4 border-b text-left text-md font-semibold text-text">
                      Remarks
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-500">
                  <tr className="mt-3">
                    <td className="py-2 px-4 text-md">{row.name}</td>
                    <td className="py-2 px-4 text-md">{row.project}</td>
                    <td className="py-2 px-4 text-md">{row.dueDate}</td>
                    <td className="py-2 px-4 text-md">{row.remark}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="buttons flex w-full justify-end">
            <button
              className="text-red-500 mt-2"
              onClick={() => handleDeleteTask(row.id)}
            >
              - Delete task
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
