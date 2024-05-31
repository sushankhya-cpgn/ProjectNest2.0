import { useEffect, useState } from "react";
import { useUser } from "../contexts/userContext";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Calendar from "../components/Calendar";
import StudentCreateProjectForm from "../components/student/StudentCreateProjectForm";
import StudentFeedHeader from "../components/student/StudentFeedHeader";
export default function StudentDashboard() {
  const { user, getUser } = useUser();
  useEffect(() => {
    getUser("student");
  }, []);

  const [isCreateProjectFormShown, setIsCreateProjectFormShown] =
    useState(false);

  function handleCreateProject() {
    setIsCreateProjectFormShown((curr) => !curr);
  }
  if (!user) return <h1>Loading...</h1>;
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
          <div className="py-8 px-4 w-full">
            <Calendar />
          </div>
        </div>
      </div>
    </>
  );
}
