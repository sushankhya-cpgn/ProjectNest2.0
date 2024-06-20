import { FaFileAlt } from "react-icons/fa";

const BASE_URL = "http://127.0.0.1:8000";
export default function StdFile({ fileName, fileTitle, projectTitle }) {
  return (
    <a href={`${BASE_URL}/public/projectproposals/${fileName}`} target="_blank">
      <div className="w-60 h-40 rounded-md bg-secondary flex flex-col gap-2 p-5 cursor-pointer">
        <div className="section1 flex gap-6 text-text text-lg">
          <FaFileAlt className="text-4xl" />
          <span>{fileTitle}</span>
        </div>
        <div className="section2 flex gap-4 text-text text-base mt-2">
          {/* <span>Weekly</span> */}
          <span>{projectTitle}</span>
        </div>
        {/* <div className="section3 flex gap-2 text-gray-500 text-sm">
          <span>may23,2024</span>
          <span>good</span>
          <span>1.5MB</span>
        </div> */}
      </div>
    </a>
  );
}
