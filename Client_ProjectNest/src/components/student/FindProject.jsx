import { FiSearch } from "react-icons/fi";
import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProjectDetailCard from "./ProjectDetailCard";
import Spinner from "../Spinner";

function FindProject() {
  const { id } = useParams();
  const [allProjects, setAllProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);

  const token = localStorage.getItem("token");
  console.log("Token retrieved:", token);

  function onSearch(e) {
    setSearchTerm(e.target.value);
    const search = e.target.value.toLowerCase().trim();
    setProjects(
      allProjects.filter((proj) =>
        `${proj.title} ${proj.techtags ? proj.techtags.join(" ") : ""}`
          .toLowerCase()
          .includes(search)
      )
    );
  }

  useEffect(() => {
    async function fetchProjects() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/v2/projectreq`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Projects fetched successfully");
        console.log(data);
        setAllProjects(data.data.projectsProposals);
        setProjects(data.data.projectsProposals);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err.message);
        setIsLoading(false);
      }
    }
    fetchProjects();
  }, [token]);

  if (isLoading) {
    return (
      <div className="h-4/5 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="h-4/5 flex flex-col gap-2">
      <div className="flex justify-between mb-2">
        <h3 className="text-lg">Find projects that need your skills</h3>
        {!id && (
          <div className="relative">
            <div className="absolute left-2 top-1/2 -translate-y-1/2">
              <FiSearch className=" text-gray-500" size={18} />
            </div>
            <input
              value={searchTerm}
              onChange={onSearch}
              placeholder="Search title, tags..."
              className="text-gray-300 text-sm bg-background focus:outline-none focus:ring-slate-500 transition-all duration-300 ring-1 ring-slate-800 rounded-lg py-1 px-2 pl-8"
            />
          </div>
        )}
      </div>
      {id ? (
        <Outlet />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 overflow-auto">
          {projects && projects.length > 0 ? (
            projects.map((project) => (
              <ProjectDetailCard
                key={project._id}
                id={project._id}
                tags={project.techtags || []} // Provide an empty array if techtags is undefined
                user={
                  project.createdBy ? project.createdBy.firstName : "Unknown"
                } // Handle case where createdBy is undefined
                description={project.problemStatement}
                title={project.title}
              />
            ))
          ) : (
            <div>No projects found.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default FindProject;
