import React, { useState, useEffect } from "react";
import CircularProgress from "./CircularProgress";
import { useProject } from "../../contexts/ProjectContext";

export default function TaskItem() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");
  const { projectDetails } = useProject();
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/v2/project/${projectDetails.project._id}/task?status=progress`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        setTasks(data.tasks); // Adjust this line based on the structure of the API response
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Format: DD/MM/YYYY
  };

  return (
    <div className="w-full ">
      {tasks.map((row) => (
        <div
          key={row._id}
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
                    <td className="py-2 px-4 text-md">
                      {row.assignedTo.firstName}
                    </td>
                    <td className="py-2 px-4 text-md">
                      {projectDetails.project.title}
                    </td>
                    <td className="py-2 px-4 text-md">
                      {formatDate(row.dueDate)}
                    </td>
                    <td className="py-2 px-4 text-md">{row.remarks}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
