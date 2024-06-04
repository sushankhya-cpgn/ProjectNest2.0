import React from "react";
import { NavLink } from "react-router-dom";

const StudentProject = ({ project }) => {
  console.log(project);
  return (
    <NavLink
      to={`/app/student/project/${project.id}`}
      className="bg-secondary rounded-lg p-4 shadow-md h-24 cursor-pointer"
    >
      <div className="flex items-center">
        <div className="bg-indigo-500 rounded-full p-1 mr-2">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
            />
          </svg>
        </div>
        <div className="namendate flex gap-6">
          <h3 className="text-lg font-semibold text-text">
            {project.projectName}
          </h3>
          <p className="mt-2 text-gray-400">{project.date_created}</p>
        </div>
      </div>
      <div className="descnmem flex justify-between mt-2">
        <p className=" text-gray-400">{project.desc}</p>
        <h3 className="mem_num text-white bg-accent rounded-full flex items-center justify-center w-8 h-8 text-sm font-semibold">
          {project.mem_num}
        </h3>
      </div>
    </NavLink>
  );
};

export default StudentProject;
