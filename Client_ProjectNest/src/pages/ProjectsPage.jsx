import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import ProjectNav from "../components/supervisor/ProjectNav";
import { useProject } from "../contexts/ProjectContext";

export default function ProjectsPage() {
  const { projectId } = useParams();
  const { projectDetails, isLoading, error, fetchProjectData } = useProject();

  useEffect(() => {
    if (projectId) {
      fetchProjectData(projectId);
    }
  }, [projectId, fetchProjectData]);

  useEffect(() => {
    if (projectDetails) {
      console.log("Fetched Project Details:", projectDetails);
    }
  }, [projectDetails]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!projectDetails) {
    return <div>No project details available</div>;
  }

  return (
    <div className="bg-backgroundlight w-full h-screen p-2 flex gap-3">
      <ProjectNav />
      <Outlet />
    </div>
  );
}
