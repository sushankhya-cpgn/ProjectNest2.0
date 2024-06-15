import { FiSearch } from "react-icons/fi";
// import ProjectDetailCard from "./ProjectDetailCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Spinner";
import Button from "../Button";
import PersonItem from "./PersonItem";
import TechnologyTag from "./TechnologyTag";

function MyProject() {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState(null);
  // const [allProjects, setAllProjects] = useState([]);

  console.log(projects);

  // function onSearch(e) {
  //   setSearchTerm(e.target.value);
  //   const search = e.target.value.toLowerCase().trim();
  //   setProjects(
  //     allProjects.filter((proj) =>
  //       `${proj.title} ${proj.techtags.join(" ")}`
  //         .toLowerCase()
  //         .includes(search)
  //     )
  //   );
  // }

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
        console.log(data);
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
    return <div>No projects found.</div>;
  }

  return (
    <div className="p-3 pt-0 overflow-auto flex flex-col gap-4">
      <div className="py-3 sticky top-0 bg-backgroundlight flex justify-between items-center">
        <h1 className=" text-2xl">{projects.title}</h1>
        <Button onClick={() => {}}>
          Request <span className="hidden xl:inline">to join</span>
        </Button>
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
        <p className=" text-gray-400 text-sm">{projects.problemStatement}</p>
      </div>

      <div>
        <h2 className="text-lg">Possible solution</h2>
        <p className=" text-gray-400 text-sm">
          {projects.solution || "Let's discuss this together!"}
        </p>
      </div>

      {projects.resources && (
        <div>
          <h2 className="text-lg">Resources</h2>
          <p className=" text-gray-400 text-sm">{projects.resources}</p>
        </div>
      )}

      <div>
        <h2 className="mb-4">These people are interested in the project:</h2>
        <div>
          <ul className="flex flex-col gap-2 mt-2">
            {projects.joinrequests?.map((person, i) => (
              <li key={i}>
                <PersonItem name={person.firstName} image={person.photo} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MyProject;
