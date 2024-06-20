import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import StdProjectNav from "../components/student/StdProjectNav";
import { useProject } from "../contexts/ProjectContext";
import Spinner from "../components/Spinner";
import Error404Page from "./Error404Page";

export default function StudentProjectPage() {
  const { projectId } = useParams();
  const { projectDetails, isLoading, error, fetchProjectData } = useProject();

  useEffect(() => {
    if (projectId) {
      fetchProjectData(projectId);
    }
  }, [projectId]);

  useEffect(() => {
    if (projectDetails) {
      console.log("Fetched Project Details:", projectDetails);
    }
  }, [projectDetails]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen bg-backgroundlight flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <Error404Page />;
  }

  if (!projectDetails) {
    return (
      <div className="w-screen h-screen bg-backgroundlight flex items-center justify-center">
        <div>
          <h1 className=" text-slate-400 text-xl">No Project Available</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-backgroundlight w-full h-screen p-2 flex gap-3">
      <StdProjectNav />
      <Outlet />
    </div>
  );
}
