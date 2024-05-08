import React, { useEffect } from "react";
import { useUser } from "../contexts/userContext";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

function AdminPage() {
  const { user, getUser } = useUser();
  useEffect(() => {
    getUser("admin");
  }, [getUser]);
  if (!user) return <h1>Loading...</h1>;
  console.log(user);
  return (
    <div className="bg-backgroundlight h-screen p-2">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default AdminPage;
