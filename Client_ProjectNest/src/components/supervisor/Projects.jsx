import React from "react";

const Projects = () => {
  return (
    <div className="bg-secondary rounded-lg p-4 shadow-md h-30">
      <div className="flex items-center">
        <div className="bg-indigo-500 rounded-full p-2 mr-2">
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
        <h3 className="text-lg font-semibold text-gray-200">RentNread</h3>
      </div>
      <p className="mt-2 text-gray-400">Rent and read is book renting webapp</p>
      <p className="mt-1 text-sm text-gray-500">3 months ago</p>
    </div>
  );
};

export default Projects;
