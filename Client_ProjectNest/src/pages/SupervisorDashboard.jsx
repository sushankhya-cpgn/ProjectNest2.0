import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import ProjectsCard from "../components/supervisor/ProjectsCard";
import { useUser } from "../contexts/userContext";
import Menu from "../components/supervisor/Menu";
import { Outlet } from "react-router-dom";
import Calendar from "../components/Calendar";
import ProjectsPage from "./ProjectsPage";
import axios from "axios";
import Spinner from "../components/Spinner";

const BASE_URL = "http://127.0.0.1:8000/api/v2";

export default function SupervisorDashboard() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { projectId } = useParams();
  const { user, getUser } = useUser();
  useEffect(() => {
    async function fetchUser() {
      await getUser();
    }
    fetchUser();
  }, []);
  useEffect(function () {
    async function fetchProjects() {
      try {
        console.log("projects");
        const token = localStorage.getItem("token");
        setIsLoading(true);
        const res = await axios.get(`${BASE_URL}/project/my-projects`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProjects([...res.data.projects]);
      } catch {
        // alert("There was some error loading the data.. ");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjects();
  }, []);
  console.log(projects);
  if (!user) {
    return (
      <div className="bg-backgroundlight w-full h-screen  flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
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
