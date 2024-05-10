import { useEffect } from "react";
import { useUser } from "../contexts/userContext";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Calendar from "../components/Calendar";

export default function StudentDashboard() {
  const { user, getUser } = useUser();
  useEffect(() => {
    getUser("student");
  }, []);
  if (!user) return <h1>Loading...</h1>;
  return (
    <div className="bg-backgroundlight h-dvh p-2 grid grid-cols-[auto_1fr_auto] text-text">
      <div className="h-full">
        <NavBar />
      </div>
      <div className="px-4 py-8 h-full md:px-10">
        <StudentFeedHeader />
        <Outlet />
      </div>
      <div className="py-8 px-4 w-full">
        <Calendar />
      </div>
    </div>
  );
}

function StudentFeedHeader() {
  return (
    <div className=" text-text  ">
      <div className="flex text-stone-100 justify-between ">
        <button className="bg-accent  px-5 py-3 rounded-xl flex items-center justify-center gap-2">
          <span className="text-xl">+</span>{" "}
          <span className="hidden sm:block sm:text-sm">Create Project</span>
        </button>
        <Profile />
      </div>
      <GreetingMessage />
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

function GreetingMessage() {
  const currentHours = new Date().getHours();
  let greeting;
  if (currentHours < 12) greeting = "Good morning";
  else if (currentHours < 18) greeting = "Good afternoon";
  else greeting = "Good evening";

  return (
    <h1 className="my-6 sm:text-[2.25rem] text-2xl">
      <span className="text-stone-400">{greeting}, </span>John
    </h1>
  );
}
