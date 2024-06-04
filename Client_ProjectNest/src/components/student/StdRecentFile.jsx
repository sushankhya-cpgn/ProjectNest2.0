import { FaFileAlt } from "react-icons/fa";
export default function StdRecentFile() {
  return (
    <div className="w-80 h-20 rounded-md bg-secondary flex gap-3 p-5 cursor-pointer">
      <div className="section1  text-text">
        <FaFileAlt className="text-4xl" />
      </div>
      <div className="section2 flex flex-col gap-2">
        <div className="row1 flex gap-1 text-text text-base">
          <span>Weekly Result</span>
          <span>Rentnread</span>
        </div>
        <div className="row2 flex gap-2 text-gray-500 text-sm">
          <span>Ravi Pajiyar</span>
          <span>may23,2024</span>
          <span>1.5MB</span>
        </div>
      </div>
    </div>
  );
}
