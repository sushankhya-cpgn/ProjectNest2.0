import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Calendar from "../components/Calendar";
import StudentCreateProjectForm from "../components/student/StudentCreateProjectForm";
import StudentFeedHeader from "../components/student/StudentFeedHeader";
import ProjectCard from "../components/student/ProjectCard";
import StudentProjectPage from "./StudentProjectPage";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/v2";

export default function StudentDashboard() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { projectId } = useParams();
  const { user, getUser } = useUser();
  useEffect(() => {
    async function fetchUser() {
      console.log("isfdf");
      await getUser();
    }
    fetchUser();
  }, []);

  useEffect(function () {
    async function fetchProjects() {
      try {
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

  const [isCreateProjectFormShown, setIsCreateProjectFormShown] =
    useState(false);

  function handleCreateProject() {
    setIsCreateProjectFormShown((curr) => !curr);
  }
  if (!user) return <h1 className="text-text">Loading...</h1>;
  if (projectId) return;
  <StudentProjectPage projects={projects} />;
  return (
    <>
      {isCreateProjectFormShown && (
        <>
          <div
            onClick={() => setIsCreateProjectFormShown(false)}
            className="fixed top-0 bottom-0 left-0 right-0 backdrop-blur-sm z-10"
          ></div>
          <StudentCreateProjectForm />
        </>
      )}
      <div className="bg-backgroundlight text-text">
        <div className="h-dvh grid grid-cols-[auto_1fr_auto]">
          <div className="">
            <NavBar />
          </div>
          <div className="px-4 h-dvh py-8 md:px-10">
            <StudentFeedHeader onCreateProject={handleCreateProject} />
            <Outlet />
          </div>
          <div className=" calendarandprojects flex flex-col">
            <Calendar />
            <ProjectCard projects={projects} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </>
  );
}
