import NavBar from "../components/NavBar";
import ProjectsCard from "../components/supervisor/ProjectsCard";

export default function SupervisorDashboard() {
  return (
    <div className="bg-backgroundlight h-screen p-2 flex flex-row justify-between">
      <NavBar />
      <ProjectsCard />
    </div>
  );
}
