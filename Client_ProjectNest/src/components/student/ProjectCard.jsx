import React from "react";
import Spinner from "../Spinner";
import StudentProject from "./StudentProject";

export default function ProjectCard({ projects, isLoading }) {
  if (isLoading) return <Spinner />;
  return (
    <div className="w-80 h-fit  flex flex-col overflow-scroll px-2">
      <h1 className="text-text text-lg py-3 font-bold sticky">Projects</h1>
      <div className=" flex flex-col gap-2 ">
        {projects.map((project) => (
          <StudentProject project={project} key={project._id} />
        ))}
      </div>
    </div>
  );
}
