import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import StdProjectNav from "../components/student/StdProjectNav";

const BASE_URL = "http://localhost:9000";

export default function StudentProjectPage() {
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    function () {
      async function fetchProjectData() {
        try {
          setIsLoading(true);
          const res = await fetch(`${BASE_URL}/projects/${projectId}`);
          const data = await res.json();
          setProjectDetails(data);
        } catch {
          // alert("There was some error loading the data.. ");
        } finally {
          setIsLoading(false);
        }
      }
      fetchProjectData();
    },
    [projectId]
  );
  console.log(projectDetails);
  return (
    <div className="bg-backgroundlight w-full h-screen p-2 flex  gap-3  ">
      <StdProjectNav />
      <Outlet />
    </div>
  );
}
