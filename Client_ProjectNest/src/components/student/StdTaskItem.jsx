import React, { useEffect, useState } from "react";
import CircularProgress from "./CircularProgress";
import axios from "axios";
import { useProject } from "../../contexts/ProjectContext";
import { useUser } from "../../contexts/userContext";
import Spinner from "../Spinner";

const BASE_URL = "http://127.0.0.1:8000/api/v2";

export default function StdTaskItem() {
  const { projectDetails } = useProject();
  const { project } = projectDetails;
  const { user, getUser } = useUser();
  const [tasks, setTasks] = useState([]);
  const [isTaskLoading, setIsTaskLoading] = useState(false);

  useEffect(function () {
    if (!user) {
      getUser();
    }
  }, []);
  useEffect(function () {
    async function fetchMyTasks() {
      try {
        setIsTaskLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${BASE_URL}/project/${project._id}/my-task`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks(res.data.myTasks);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsTaskLoading(false);
      }
    }

    fetchMyTasks();
  }, []);

  if (isTaskLoading) {
    return (
      <div className="">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="w-full">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="flex flex-col items-start bg-secondary rounded-lg p-4 shadow-md cursor-pointer w-full mb-4"
        >
          <div className="uppersection flex w-full">
            <div className="leftsection w-2/5">
              <table>
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left text-md font-semibold text-text flex gap-4">
                      Overdue{" "}
                      <span>
                        <CircularProgress />
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 text-md flex items-center gap-4 text-text">
                      <span className="ml-2">{task.task}</span>
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
                      Assigned On
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
                      {user.firstName + " " + user.lastName}{" "}
                    </td>
                    <td className="py-2 px-4 text-md">{project.title}</td>
                    <td className="py-2 px-4 text-md">
                      {new Date(task.createdAt).toDateString()}
                    </td>
                    <td className="py-2 px-4 text-md">
                      {new Date(task.dueDate).toDateString()}
                    </td>
                    <td className="py-2 px-4 text-md">{task.remarks}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="buttons flex w-full justify-end"></div>
        </div>
      ))}
    </div>
  );
}
