import React from "react";
import Projects from "./Projects";

export default function ProjectsCard() {
  return (
    <div className="w-50 h-90 mt-40 bg-primary flex flex-col">
      <h1 className="text-text text-lg">Projects</h1>
      <div className="flex flex-col gap-2 overflow-auto">
        <Projects />
        <Projects />
        <Projects />
      </div>
    </div>
  );
}
