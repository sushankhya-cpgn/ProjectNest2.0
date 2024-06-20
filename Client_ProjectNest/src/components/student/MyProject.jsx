import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Spinner";
import PersonItem from "./PersonItem";
import TechnologyTag from "./TechnologyTag";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

function MyProject() {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [projects, setProjects] = useState(null);
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        console.log("Token retrieved:", token);

        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/v2/projectreq/my-project-proposal`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Projects fetched successfully");
        setProjects(data.data.projectProposal);
      } catch (err) {
        console.error("Error fetching projects:", err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <div className="h-4/5 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!projects) {
    return (
      <div className=" text-slate-400">
        You have not created any project yet.
      </div>
    );
  }

  async function handleAcceptRequest(person) {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const projectId = projects._id;

      const { data } = await axios.patch(
        `http://127.0.0.1:8000/api/v2/projectreq/${projectId}/accept-join-request`,
        {
          requestorUserId: person._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the local state to reflect the accepted request
      setProjects((prevProjects) => ({
        ...prevProjects,
        joinrequests: prevProjects.joinrequests.filter(
          (request) => request._id !== person._id
        ),
      }));
    } catch (err) {
      console.log(err.message);
    }
  }

  async function handleprojectreq() {
    try {
      const token = localStorage.getItem("token");
      const projectId = projects._id;
      console.log(projectId);
      const { data } = await axios.patch(
        `http://127.0.0.1:8000/api/v2/projectreq/${projectId}/send`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProjects((prevProjects) => ({
        ...prevProjects,
        status: "pending",
      }));
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleRejectRequest(person) {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const projectId = projects._id;

      const { data } = await axios.patch(
        `http://127.0.0.1:8000/api/v2/projectreq/${projectId}/reject-join-request`,
        {
          requestorUserId: person._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the local state to reflect the rejected request
      setProjects((prevProjects) => ({
        ...prevProjects,
        joinrequests: prevProjects.joinrequests.filter(
          (request) => request._id !== person._id
        ),
      }));
    } catch (err) {
      console.log(err.message);
    }
  }

  async function handleSendProposal() {
    try {
      const token = localStorage.getItem("token");
      const projectId = projects._id;

      setIsUploading(true);
      const formData = new FormData();
      formData.append("proposal", file);

      const { data } = await axios.patch(
        `http://127.0.0.1:8000/api/v2/projectreq/${projectId}/proposal-pdf`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log("Proposal sent:", data.data.propsal);

      // Check if the proposal was successful,ly uploaded

      // Update the local state to indicate that the proposal was uploaded
      setProjects((prevProjects) => ({
        ...prevProjects,
        proposalPDF: data.data.propsal,
      }));
    } catch (err) {
      console.error("Error sending proposal:", err.message);
    } finally {
      setIsUploading(false);
    }
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="p-3 pt-0 overflow-scroll flex flex-col gap-4 bg-backgroundlight ">
      <div className="py-3 sticky top-0 flex justify-between items-center">
        <h1 className="text-2xl">{projects.title}</h1>
      </div>
      <div className="flex justify-between">
        <PersonItem
          name={projects.createdBy?.firstName}
          image={projects.createdBy?.photo}
        />
        {projects.techtags && (
          <div className="hidden flex-wrap text-sm md:flex flex-row justify-between items-center gap-2">
            {projects.techtags.map((tag) => (
              <TechnologyTag key={tag} tech={tag} />
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-lg">Problem to solve</h2>
        <p className="text-gray-400 text-sm">{projects.problemStatement}</p>
      </div>

      <div>
        <h2 className="text-lg">Possible solution</h2>
        <p className="text-gray-400 text-sm">
          {projects.solution || "Let's discuss this together!"}
        </p>
      </div>

      <div>
        <h2 className="text-lg">Team Members</h2>
        <p className="text-gray-400 text-sm">
          {projects.teamMembers.map((member) => {
            const fullName = member.firstName + " " + member.lastName + ", ";
            return fullName;
          })}
        </p>
      </div>

      {projects.resources && (
        <div>
          <h2 className="text-lg">Resources</h2>
          <p className="text-gray-400 text-sm">{projects.resources}</p>
        </div>
      )}
      <div>
        <h2>Proposal</h2>

        <>
          <input type="file" onChange={handleFileChange}></input>
          <button
            className="bg-accent/70 transition-all duration-200 ring-2 rounded-md  h-10  w-40 text-white "
            onClick={handleSendProposal}
          >
            {isUploading
              ? "Uploading..."
              : projects.proposalPDF
              ? "Reupload Report"
              : "Upload Report"}
            {/* {} */}
          </button>
        </>
        {projects.proposalPDF && (
          <div>
            <p>{projects.proposalPDF}</p>
            <p className=" text-blue-700">
              {" "}
              <a
                href={`http://127.0.0.1:8000/public/projectproposals/${projects.proposalPDF}`}
                alt="PDF"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Proposal
              </a>
            </p>
          </div>
        )}
      </div>
      <div>
        <h2 className="mb-4">These people are interested in the project:</h2>
        <div>
          <ul className="flex flex-col gap-2 mt-2">
            {projects.joinrequests?.map((person, i) => (
              <li key={i}>
                <div className="flex gap-5">
                  <PersonItem name={person.firstName} image={person.photo} />

                  <button
                    className="text-white bg-slate-600 w-20 hover:bg-slate-500"
                    onClick={() => handleAcceptRequest(person)}
                  >
                    Accept
                  </button>
                  <button
                    className="text-white bg-slate-600 w-20 hover:bg-slate-500"
                    onClick={() => handleRejectRequest(person)}
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MyProject;
