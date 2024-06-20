import React, { useState, useEffect } from "react";
import { useProject } from "../../contexts/ProjectContext";
import axios from "axios";

export default function Logsheet() {
  const [data, setData] = useState([]);
  const [updatedRows, setUpdatedRows] = useState([]);
  const token = localStorage.getItem("token");
  const { projectDetails } = useProject();

  const statusOptions = ["progress", "completed"];
  const gradeOptions = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-"];

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/v2/project/666d45930a01aa9c53493ff3/task?status=progress",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const fetchedData = await response.json();
        console.log("Fetched data:", fetchedData);

        // Transform fetched data to match the initial data structure
        const transformedData = fetchedData.tasks.map((task, index) => ({
          id: index + 1,
          taskId: task._id,
          name: task.assignedTo?.firstName || "Unknown", // Add a check for assignedTo
          task: task.task,
          status: task.status || "",
          remarks: task.remarks || "",
          grade: "",
        }));

        setData(transformedData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [token]);

  const handleSelectChange = (id, field, value) => {
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleUpdate = async (id) => {
    const rowData = data.find((row) => row.id === id);
    console.log("Updated row data:", rowData);

    try {
      const updateData = {
        taskId: rowData.taskId,
        status: rowData.status,
        grade: rowData.grade,
      };

      // const requestBodyString = JSON.stringify(requestBody);
      // console.log(requestBodyString);

      const response = await axios.patch(
        `http://127.0.0.1:8000/api/v2/project/${projectDetails.project._id}/task/review`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // body: requestBodyString,
        }
      );
      console.log(response);
      // const result = await response.json();
      // console.log("Update response:", result);

      // Update the data state to reflect the changes
      setData((prevData) =>
        prevData.map((row) =>
          row.id === id
            ? { ...row, status: rowData.status, grade: rowData.grade }
            : row
        )
      );

      // Add the id to the updatedRows state
      setUpdatedRows((prev) => [...prev, id]);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center px-4 gap-5 py-3">
      <div className="logsheet bg-gray-700 dark:bg-gray-800 px-6 py-3 rounded-lg shadow-lg">
        <span className="text-xl font-semibold text-text">Logsheet</span>
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
                Actions
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
                  <button
                    className={`bg-accent text-white px-3 py-1 rounded ${
                      updatedRows.includes(row.id) ? "opacity-50" : ""
                    }`}
                    onClick={() => handleUpdate(row.id)}
                  >
                    {updatedRows.includes(row.id) ? "Updated" : "Update"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
