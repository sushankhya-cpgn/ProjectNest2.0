import { useEffect, useState } from "react";
import ProjectNav from "../components/supervisor/ProjectNav";
import { Outlet, useParams } from "react-router-dom";

const BASE_URL = "http://localhost:9000";

export default function ProjectsPage() {
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
  return (
    <div className="bg-backgroundlight w-full h-screen p-2 flex  gap-3  ">
      <ProjectNav />
      <Outlet />
    </div>
  );
}
