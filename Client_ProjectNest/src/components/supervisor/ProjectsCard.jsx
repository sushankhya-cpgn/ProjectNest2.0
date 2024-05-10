import React from "react";
import Projects from "./Projects";

export default function ProjectsCard() {
  return (
    <div className="w-64 h-fit  flex flex-col">
      <h1 className="text-text text-lg py-3 font-bold">Projects</h1>
      <div className=" flex flex-col gap-2 ">
        <Projects />
        <Projects />
        <Projects />
      </div>
    </div>
  );
}
