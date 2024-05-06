import { useEffect } from "react";
import { useUser } from "../contexts/userContext";
import NavBar from "../components/NavBar";

export default function StudentDashboard() {
  const { user, getUser } = useUser();
  useEffect(() => {
    getUser("student");
  }, []);
  if (!user) return <h1>Loading...</h1>;
  return (
    <div className="bg-backgroundlight h-screen p-2 ">
      <NavBar />
    </div>
  );
}
