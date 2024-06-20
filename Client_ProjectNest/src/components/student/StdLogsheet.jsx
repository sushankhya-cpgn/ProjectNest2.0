import { useEffect, useState } from "react";
import DateBox from "../DateBox";
import axios from "axios";
import { useProject } from "../../contexts/ProjectContext";
import Spinner from "../Spinner";
const BASE_URL = "http://127.0.0.1:8000/api/v2";

export default function StdLogsheet() {
  const { projectDetails } = useProject();
  const { project } = projectDetails;
  const [tasks, setTasks] = useState([]);
  const [isTaskLoading, setIsTaskLoading] = useState(false);

  useEffect(function () {
    async function fetchMyTasks() {
      try {
        setIsTaskLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/project/${project._id}/task`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(res.data.tasks);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsTaskLoading(false);
      }
    }

    fetchMyTasks();
  }, []);

  if (isTaskLoading) {
    return (
      <div className="w-full flex flex-col items-center px-4 gap-5 py-3 justify-center">
        <Spinner />
      </div>
    );
  }

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
            </tr>
          </thead>
          <tbody className="text-gray-500">
            {tasks.map((task) => (
              <tr key={task._id} className="mt-3">
                <td className="py-4 px-4 text-md">
                  {task.assignedTo.firstName + " " + task.assignedTo.lastName}
                </td>
                <td className="py-4 px-4 text-md">{task.task}</td>
                <td className="py-4 px-4 text-md">{task.status}</td>
                <td className="py-4 px-4 text-md">{task.remarks}</td>
                <td className="py-4 px-4 text-md">{task.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
