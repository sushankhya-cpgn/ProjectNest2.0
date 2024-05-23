import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import ProjectsCard from "../components/supervisor/ProjectsCard";
import { useUser } from "../contexts/userContext";
import Menu from "../components/supervisor/Menu";
import { Outlet } from "react-router-dom";
import Calendar from "../components/Calendar";
import ProjectsPage from "./ProjectsPage";

const BASE_URL = "http://localhost:9000";

export default function SupervisorDashboard() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { projectId } = useParams();

  useEffect(function () {
    async function fetchProjects() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/projects`);
        const data = await res.json();
        setProjects(data);
      } catch {
        alert("There was some error loading the data.. ");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjects();
  }, []);
  const { user, getUser } = useUser();
  useEffect(() => {
    getUser("supervisor");
  }, []);
  if (!user) return <h1 className="text-text">Loading...</h1>;
  if (projectId) return <ProjectsPage projects={projects} />;
  return (
    <div className="bg-backgroundlight w-full h-screen  flex  gap-3">
      <NavBar />
      <div className="menuandfeed w-2/3 px-4 py-8 h-screen flex flex-col gap-3">
        <Menu />
        <Outlet />
      </div>
      <div className=" calendarandprojects flex flex-col">
        <Calendar />
        <ProjectsCard projects={projects} isLoading={isLoading} />
      </div>
    </div>
  );
}
