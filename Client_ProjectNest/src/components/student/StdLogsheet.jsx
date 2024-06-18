import DateBox from "../DateBox";

export default function StdLogsheet() {
  const initialData = [
    {
      id: 1,
      name: "Mohit Shahi",
      task: "frontend task ui complete",
      status: "completed",
      remarks: "do it urgent",
      grade: "A",
    },
    {
      id: 2,
      name: "Ravi Pajiyar",
      task: "frontend task ui complete",
      status: "inprogress",
      remarks: "do it urgent",
      grade: "B+",
    },
    {
      id: 3,
      name: "Sushankhya Chapagain",
      task: "frontend task ui complete",
      status: "inprogress",
      remarks: "do it urgent",
      grade: "A-",
    },
    {
      id: 4,
      name: "Arun Bhandari",
      task: "frontend task ui complete",
      status: "completed",
      remarks: "do it urgent",
      grade: "A",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center px-4 gap-5 py-3">
      <div className="datebox">
        <DateBox />
      </div>
      <div className="memcontainer w-full h-3/4 rounded-lg p-4 relative overflow-scroll">
        <table>
          <thead>
            <tr>
              <th className="py-4 px-4 border-b text-left text-md font-semibold text-text">
                Students
              </th>
              <th className="py-4 px-4 border-b text-left text-md font-semibold text-text">
                Task
              </th>
              <th className="py-4 px-4 border-b text-left text-md font-semibold text-text">
                Task status
              </th>
              <th className="py-4 px-4 border-b text-left text-md font-semibold text-text">
                Remarks
              </th>
              <th className="py-4 px-4 border-b text-left text-md font-semibold text-text">
                Grade
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-500">
            {initialData.map((row) => (
              <tr key={row.id} className="mt-3">
                <td className="py-4 px-4 text-md">{row.name}</td>
                <td className="py-4 px-4 text-md">{row.task}</td>
                <td className="py-4 px-4 text-md">{row.status}</td>
                <td className="py-4 px-4 text-md">{row.remarks}</td>
                <td className="py-4 px-4 text-md">{row.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="nextnprevbtn w-full flex justify-between">
        <button className="bg-accent px-5 py-3 rounded-lg flex items-center justify-center gap-2 h-9 text-text">
          Previous
        </button>
        <button className="bg-accent px-5 py-3 rounded-lg flex items-center justify-center gap-2 h-9 text-text">
          Next
        </button>
      </div>
    </div>
  );
}
