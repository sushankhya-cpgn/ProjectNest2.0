import { useEffect } from "react";
import NavBar from "../components/NavBar";
import { useUser } from "../contexts/userContext";

export default function SupervisorDashboard() {
  const { user, getUser } = useUser();
  useEffect(() => {
    getUser("supervisor");
  }, []);
  if (!user) return <h1 className="text-text">Loading...</h1>;
  return (
    <div className="bg-backgroundlight h-screen p-2 ">
      <NavBar />
    </div>
  );
}
