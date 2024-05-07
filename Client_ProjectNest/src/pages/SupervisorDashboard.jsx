import { useEffect } from "react";
import NavBar from "../components/NavBar";
import ProjectsCard from "../components/supervisor/ProjectsCard";
import { useUser } from "../contexts/userContext";
import Menu from "../components/supervisor/Menu";
import { Outlet } from "react-router-dom";
import Calendar from "../components/supervisor/Calendar";

export default function SupervisorDashboard() {
  const { user, getUser } = useUser();
  useEffect(() => {
    getUser("supervisor");
  }, []);
  if (!user) return <h1 className="text-text">Loading...</h1>;
  return (
    <div className="bg-backgroundlight w-full h-screen p-2 flex  gap-3">
      <NavBar />
      <div className="menuandfeed w-2/3 px-4 py-8 h-screen flex flex-col gap-3">
        <Menu />
        <Outlet />
      </div>
      <div className=" calendarandprojects flex flex-col">
        <Calendar />
        <ProjectsCard />
      </div>
    </div>
  );
}
