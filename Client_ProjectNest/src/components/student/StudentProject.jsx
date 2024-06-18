import React from "react";
import { NavLink } from "react-router-dom";

const StudentProject = ({ project }) => {
  return (
    <NavLink
      to={`/app/student/project/${project._id}`}
      className="bg-secondary rounded-lg p-4 shadow-md cursor-pointer"
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
        <div className="flex gap-8">
          <h3 className="text-lg flex justify-center items-center font-semibold text-text">
            {project.title}
          </h3>
          <h3 className=" text-white flex justify-center items-center p-2 bg-accent rounded-full text-sm font-semibold">
            {project.semester}
            {project.semester === 1
              ? "st"
              : project.semester === 2
              ? "nd"
              : project.semester === 3
              ? "rd"
              : "th"}
          </h3>
        </div>
      </div>
      <div className="mt-2">
        <p className=" text-gray-400">
          Supervisor:{" "}
          {`${project.supervisor.firstName} ${project.supervisor.lastName}`}
        </p>
        <p className="mt-2 text-gray-400">
          Created on: {new Date(project.createdAt).toLocaleDateString()}
        </p>
      </div>
    </NavLink>
  );
};

export default StudentProject;
