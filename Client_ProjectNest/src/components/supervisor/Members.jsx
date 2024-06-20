import { useProject } from "../../contexts/ProjectContext";

export default function Members() {
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
    // Add more roles here if needed, e.g., evaluators, coordinators
  ];

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {/* <h1>{projectDetails.project.title} members</h1> */}
      <div className="logsheet bg-gray-700 dark:bg-gray-800 px-6 py-3 rounded-lg shadow-lg">
        <span className="text-xl font-semibold text-text">
          {projectDetails.project.title} members
        </span>
      </div>
      <div className="memcontainer w-11/12 h-5/6 rounded-lg p-4 relative overflow-scroll justify-center flex ">
        <table className="h-1/2">
          <thead>
            <tr>
              <th className="py-4 px-4 border-b text-left text-md font-semibold text-text">
                Members
              </th>
              <th className="py-4 px-4 border-b text-left text-md font-semibold text-text">
                Role
              </th>
              <th className="py-4 px-4 border-b text-left text-md font-semibold text-text">
                Gmail
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-500 ">
            {membersData.map((member, index) => (
              <tr key={index} className="mt-3">
                <td className="py-4 px-4 text-md">
                  {member.firstName} {member.lastName}
                </td>
                <td className="py-4 px-4 text-md">
                  Student{/* Add other roles if needed */}
                </td>
                <td className="py-4 px-4 text-md">{member.email}</td>
              </tr>
            ))}
            <tr className="mt-3">
              <td className="py-4 px-4 text-md">
                {projectDetails.project.supervisor.firstName}{" "}
                {projectDetails.project.supervisor.lastName}
              </td>
              <td className="py-4 px-4 text-md">
                Supervisor{/* Add other roles if needed */}
              </td>
              <td className="py-4 px-4 text-md">
                {projectDetails.project.supervisor.email}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
