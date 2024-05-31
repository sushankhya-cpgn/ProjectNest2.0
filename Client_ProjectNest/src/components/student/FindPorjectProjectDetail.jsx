// import { useParams } from "react-router-dom";
import TechnologyTag from "./TechnologyTag";
import PersonItem from "./PersonItem";
import Button from "../Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Spinner";
function FindPorjectProjectDetail() {
  //fetch the project proposal from backend
  const { id } = useParams();
  const [createdProject, setCreatedProject] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(
    function () {
      async function fetchProject() {
        try {
          setLoading(true);
          setError("");
          const { data } = await axios.get(
            `http://localhost:9000/createdProjects/${id}`
          );

          setCreatedProject(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
      if (id) {
        fetchProject();
      }
    },
    [id]
  );
  const interestedPeopel = [
    {
      name: "Mohit Shahi",
      image: "default-avatar.png",
    },
    {
      name: "Sushankhya Chapagain",
      image: "default-avatar.png",
    },
    {
      name: "Ravi Pajiyar",
      image: "default-avatar.png",
    },
  ];

  function handleJoinRequest() {
    console.log("requestion to join project...");
  }
  if (loading) {
    return (
      <div className="h-4/5 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  if (error) {
    return (
      <div className="h-4/5 flex items-center justify-center">
        Something went wrong, try again later.
      </div>
    );
  }

  return (
    <div className="p-3 pt-0 overflow-auto flex flex-col gap-4">
      <div className="py-3 sticky top-0 bg-backgroundlight flex justify-between items-center">
        <h1 className=" text-2xl">{createdProject.title}</h1>
        <Button onClick={handleJoinRequest}>
          Request <span className="hidden xl:inline">to join</span>
        </Button>
      </div>
      <div className="flex justify-between">
        <PersonItem
          name={createdProject.user.name}
          image={createdProject.user.image}
        />
        {createdProject.techTags && (
          <div className="hidden flex-wrap  text-sm md:flex flex-row justify-between items-center gap-2">
            {createdProject.techTags.map((tag) => (
              <TechnologyTag key={tag} tech={tag} />
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-lg">Problem to solve</h2>
        <p className=" text-gray-400 text-sm">
          {createdProject.problemStatement}
        </p>
      </div>

      <div>
        <h2 className="text-lg">Possible solution</h2>

        <p className=" text-gray-400 text-sm">
          {createdProject.possibleSolution || "Lets discuss this together!"}
        </p>
      </div>
      {createdProject.resources && (
        <div>
          <h2 className="text-lg">Resources</h2>
          <p className=" text-gray-400 text-sm">{createdProject.resources}</p>
        </div>
      )}

      <div>
        <h2 className="mb-4">These people are interested in the project:</h2>
        <div>
          <ul className="flex flex-col gap-2 mt-2">
            {interestedPeopel.map((person, i) => (
              <li key={i}>
                <PersonItem name={person.name} image={person.image} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FindPorjectProjectDetail;
