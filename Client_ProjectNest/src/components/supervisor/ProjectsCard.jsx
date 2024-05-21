import React from "react";
import Projects from "./Projects";
import Spinner from "../Spinner";

export default function ProjectsCard({ projects, isLoading }) {
  if (isLoading) return <Spinner />;
  return (
    <div className="w-80 h-fit  flex flex-col">
      <h1 className="text-text text-lg py-3 font-bold">Projects</h1>
      <div className=" flex flex-col gap-2 ">
        {projects.map((project) => (
          <Projects project={project} key={project.id} />
        ))}
      </div>
    </div>
  );
}
