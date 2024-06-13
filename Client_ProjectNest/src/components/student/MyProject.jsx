import { FiSearch } from "react-icons/fi";
import { Outlet, useParams } from "react-router-dom";
import ProjectDetailCard from "./ProjectDetailCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Spinner";

function MyProject() {
  const { id } = useParams();
  const [allProjects, setAllProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);

  function onSearch(e) {
    setSearchTerm(e.target.value);
    // if (e.target.value.length < 2) return;

    const search = e.target.value.toLowerCase().trim();
    //search here
    setProjects(
      allProjects.filter((proj) =>
        `${proj.title} ${proj.techTags.join(" ")}`
          .toLowerCase()
          .includes(search)
      )
    );
  }

  useEffect(function () {
    async function fetchProject() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `http://localhost:9000/createdProjects`
        );
        setAllProjects(data);
        setProjects(data);
      } catch (err) {
        new Error(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProject();
  }, []);

  if (isLoading)
    return (
      <div className="h-4/5 flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="h-4/5 flex flex-col gap-2 ">
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
              className=" text-gray-300 text-sm bg-background focus:outline-none focus:ring-slate-500 transition-all duration-300 ring-1 ring-slate-800 rounded-lg py-1 px-2 pl-8"
            />
          </div>
        )}
      </div>
      {id ? (
        <Outlet />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 overflow-auto">
          {projects.map((project) => (
            <ProjectDetailCard
              key={project.id}
              id={project.id}
              tags={project.techTags}
              user={project.user}
              description={project.description}
              title={project.title}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyProject;
