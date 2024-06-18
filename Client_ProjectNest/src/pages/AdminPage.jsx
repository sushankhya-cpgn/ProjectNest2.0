import React, { useEffect } from "react";
import { useUser } from "../contexts/userContext";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

function AdminPage() {
  const { user, getUser } = useUser();

  if (!user) return <h1>Loading...</h1>;
  console.log(user);
  return (
    <div className="bg-backgroundlight h-full p-2 flex flex-row text-text">
      <div className=" h-full   sticky top-2">
        <NavBar />
      </div>
      <div className="px-4 py-8 md:w-full sm:w-3/5 md:px-10  overflow-scroll">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminPage;
