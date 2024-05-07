import { useEffect } from "react";
import NavBar from "../components/NavBar";
import ProjectsCard from "../components/supervisor/ProjectsCard";
import { useUser } from "../contexts/userContext";
import Menu from "../components/supervisor/Menu";
import Feed from "../components/supervisor/Feed";
import Calendar from "../components/supervisor/Calendar";

export default function SupervisorDashboard() {
  const { user, getUser } = useUser();
  useEffect(() => {
    getUser("supervisor");
  }, []);
  if (!user) return <h1 className="text-text">Loading...</h1>;
  return (
    <div className="bg-backgroundlight h-screen p-2 flex flex-row gap-3">
      <NavBar />
      <div className="menuandfeed w-3/5 h-screen flex flex-col gap-3">
        <Menu />
        <Feed />
      </div>
      <div className="calendarandprojects flex flex-col gap-2 w-80 h-screen">
        <Calendar />
        <ProjectsCard />
      </div>
    </div>
  );
}
