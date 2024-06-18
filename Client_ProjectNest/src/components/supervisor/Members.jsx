import React, { useState } from "react";
import Message from "./Message";
import { useProject } from "../../contexts/ProjectContext";

export default function Members() {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { projectDetails, isLoading, error } = useProject();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (
    !projectDetails ||
    !projectDetails.project ||
    !projectDetails.project.members
  ) {
    return <div>No project details available</div>;
  }

  const membersData = [
    ...projectDetails.project.members,
    ...(projectDetails.project.supervisor
      ? [projectDetails.project.supervisor]
      : []),
    // Add more roles here if needed, e.g., evaluators, coordinators
  ];

  return (
    <div className="w-full flex justify-center items-center">
      <div className="memcontainer w-11/12 h-5/6 rounded-lg p-4 relative overflow-scroll">
        <table>
          <thead>
            <tr>
              <th className="py-4 px-4 border-b text-left text-md font-semibold text-text">
                Members
              </th>
              <th className="py-4 px-4 border-b text-left text-md font-semibold text-text">
                Role
              </th>
              <th className="py-4 px-4 border-b text-left text-md font-semibold text-text">
                Expertise
              </th>
              <th className="py-4 px-4 border-b text-left text-md font-semibold text-text">
                Gmail
              </th>
              <th className="py-4 px-4 border-b text-left text-md font-semibold text-text">
                Contact
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-500">
            {membersData.map((member, index) => (
              <tr key={index} className="mt-3">
                <td className="py-4 px-4 text-md">
                  {member.firstName} {member.lastName}
                </td>
                <td className="py-4 px-4 text-md">
                  {member.role || "Student"} {/* Add other roles if needed */}
                </td>
                <td className="py-4 px-4 text-md">
                  {member.skill || "Frontend"}
                </td>
                <td className="py-4 px-4 text-md">{member.email}</td>
                <td className="py-4 px-4 text-md">
                  <button
                    className="bg-accent px-5 py-3 rounded-lg flex items-center justify-center gap-2 h-9 text-text"
                    onClick={handleClick}
                  >
                    Message
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {open && (
        <>
          <div className="fixed inset-0 backdrop-blur-sm"></div>
          <div className="fixed inset-0 flex justify-center items-center">
            <div className="bg-gray-700 dark:bg-gray-800 w-2/5 h-2/3 rounded-lg p-4 relative">
              <button
                className="absolute top-2 right-3 text-text font-bold text-xl hover:text-gray-400"
                onClick={handleClose}
              >
                X
              </button>
              <Message />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
