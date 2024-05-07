import { useEffect } from "react";
import { useUser } from "../contexts/userContext";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

export default function StudentDashboard() {
  const { user, getUser } = useUser();
  useEffect(() => {
    getUser("student");
  }, []);
  if (!user) return <h1>Loading...</h1>;
  return (
    <div className="bg-backgroundlight h-screen p-2 flex text-text">
      <NavBar />
      <div className="px-4 py-8 w-3/4 sm:w-3/5 md:px-10">
        <StudentFeedHeader />
        <Outlet />
      </div>
    </div>
  );
}

function StudentFeedHeader() {
  return (
    <div className=" text-text">
      <div className="flex text-stone-100 justify-between ">
        <button className="bg-accent  px-5 py-3 rounded-xl flex items-center justify-center gap-2">
          <span className="text-xl">+</span>{" "}
          <span className="hidden sm:block sm:text-sm">Create Project</span>
        </button>
        <Profile />
      </div>
      <WelcomeMessage />
    </div>
  );
}

function Profile() {
  return (
    <div className="flex items-center justify-center gap-3 ">
      <h2 className="font-semibold">John Doe</h2>
      <img
        className="rounded-full w-12 "
        alt="display"
        src="/default-avatar.png"
      ></img>
    </div>
  );
}

function WelcomeMessage() {
  return (
    <h1 className="my-6 text-[2.25rem]  ">
      <span className="text-stone-400">Good morning, </span>John
    </h1>
  );
}
