import { FaFileAlt } from "react-icons/fa";
export default function StdFile() {
  return (
    <div className="w-60 h-40 rounded-md bg-secondary flex flex-col gap-2 p-5 cursor-pointer">
      <div className="section1 flex gap-6 text-text text-lg">
        <FaFileAlt className="text-4xl" />
        <span>rentNread 2023</span>
      </div>
      <div className="section2 flex gap-4 text-text text-base mt-2">
        <span>Weekly</span>
        <span>Ravi Pajiyar</span>
      </div>
      <div className="section3 flex gap-2 text-gray-500 text-sm">
        <span>may23,2024</span>
        <span>good</span>
        <span>1.5MB</span>
      </div>
    </div>
  );
}
