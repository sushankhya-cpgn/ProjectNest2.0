import axios from "axios";
import { useState } from "react";
import { useProject } from "../../contexts/ProjectContext";

export default function StdDocForm() {
  const { projectDetails, fetchProjectData } = useProject();
  const { project } = projectDetails;
  const documentOptions = ["Report", "Proposal"];
  const [file, setFile] = useState();
  const [documentType, setDocumentType] = useState(documentOptions[0]);

  const handleSelectChange = (e) => {
    setDocumentType(e.target.value);
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  async function handleSendFile() {
    try {
      const token = localStorage.getItem("token");
      const projectId = project._id;

      const formData = new FormData();
      formData.append(documentType.toLocaleLowerCase(), file);

      const { data } = await axios.patch(
        `http://127.0.0.1:8000/api/v2/project/${projectId}/${documentType.toLowerCase()}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log(
      //   `${documentType} sent:`,
      //   data.data[documentType.toLocaleLowerCase()]
      // );
      fetchProjectData(project._id);

      // Check if the proposal was successful,ly uploaded
    } catch (err) {
      console.error("Error sending proposal:", err.message);
    }
  }

  return (
    <div className="taskform flex flex-col text-base gap-4 mt-4 px-8">
      <div className="section2 flex justify-between">
        <span className="text-text font-medium">Result Type</span>

        <span className="text-text">
          <select
            value={documentType}
            onChange={handleSelectChange}
            className="bg-primary border-none rounded-md p-1.5 focus:outline-none focus:ring-0"
          >
            {documentOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </span>
      </div>

      <div className="section5 flex flex-col p-2 bg-primary rounded-lg gap-2">
        <span className="text-text font-medium">Document</span>
        <div className="inputs flex flex-col">
          <input
            type="file"
            className="rounded-md px-2 py-0.5 border-none focus:outline-none focus:ring-0"
            onChange={handleFileChange}
          />
        </div>
      </div>
      <div className="buttons flex justify-between">
        <button
          className="bg-accent px-5 py-3 rounded-lg flex items-center justify-center gap-2 h-9 text-text"
          onClick={handleSendFile}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
