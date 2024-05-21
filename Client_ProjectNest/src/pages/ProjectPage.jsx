import React from "react";
import { useParams } from "react-router-dom";

function ProjectPage() {
  const { projectID } = useParams();

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
      <div className="bg-gray-800 rounded-xl shadow-lg p-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Project Details
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700 rounded-lg p-6">
            <h2 className="text-lg font-bold text-white mb-2">Project ID</h2>
            <p className="text-white">{projectID}</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-6">
            <h2 className="text-lg font-bold text-white mb-2">Project Name</h2>
            <p className="text-white">Will fetch from backend</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-6">
            <h2 className="text-lg font-bold text-white mb-2">Team Members</h2>
            <p className="text-white">Will fetch from backend</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-6">
            <h2 className="text-lg font-bold text-white mb-2">Description</h2>
            <p className="text-white">Will fetch from backend</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-6 md:col-span-2">
            <h2 className="text-lg font-bold text-white mb-2">Supervisor</h2>
            <p className="text-white">Will fetch from backend</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
