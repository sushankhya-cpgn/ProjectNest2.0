import React from "react";

export default function Members() {
  const data = [
    {
      id: 1,
      name: "Ravi Pajiyar",
      project: "ProjectNest",
      role: "Student",
      skill: "frontend",
      gmail: "pajiyargravi20011@gmail.com",
    },
  ];
  return (
    <div className="w-full flex justify-center items-center">
      <div className="memcontainer bg-secondary w-5/6 h-3/4 rounded-lg p-6 relative">
        <table>
          <thead>
            <tr>
              <th className="py-2 px-4  border-b text-left text-md font-semibold text-text">
                Members
              </th>
              <th className="py-2 px-4  border-b text-left text-md font-semibold text-text">
                Role
              </th>
              <th className="py-2 px-4  border-b text-left text-md font-semibold text-text">
                Expertise
              </th>
              <th className="py-2 px-4  border-b text-left text-md font-semibold text-text">
                Gmail
              </th>
              <th className="py-2 px-4  border-b text-left text-md font-semibold text-text">
                Contact
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-500">
            {data.map((row) => (
              <tr key={row.id} className="mt-3">
                <td className="py-2 px-4  text-md">{row.name}</td>
                <td className="py-2 px-4  text-md">{row.role}</td>
                <td className="py-2 px-4  text-md">{row.skill}</td>
                <td className="py-2 px-4  text-md">{row.gmail}</td>
                <td className="py-2 px-4  text-md">
                  <button className="bg-accent px-5 py-3 rounded-lg flex items-center justify-center gap-2 h-9 text-text">
                    Message
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
