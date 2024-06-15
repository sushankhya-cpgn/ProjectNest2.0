import TechnologyTag from "./TechnologyTag";
import PersonItem from "./PersonItem";
import Button from "../Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Spinner";

function FindProjectProjectDetail() {
  // Fetch the project proposal from backend
  const { id } = useParams();
  console.log(id);
  const [createdProject, setCreatedProject] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");
        console.log("Token retrieved:", token);

        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/v2/projectreq/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Fetched data:", data); // Log the fetched data to inspect its structure

        if (data && data.data) {
          // Adjust based on the actual data structure
          setCreatedProject(data.data);
        } else {
          setError("Invalid data structure");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchProject();
    }
  }, [id]);

  const interestedPeople = [
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
    console.log("Requesting to join project...");
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
          name={
            createdProject.createdBy
              ? createdProject.createdBy.firstName
              : "Unknown"
          }
          image={
            createdProject.createdBy
              ? createdProject.createdBy.image
              : "default-avatar.png"
          }
        />
        {createdProject.techtags && (
          <div className="hidden flex-wrap text-sm md:flex flex-row justify-between items-center gap-2">
            {createdProject.techtags.map((tag) => (
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
          {createdProject.solution || "Let's discuss this together!"}
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
            {interestedPeople.map((person, i) => (
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

export default FindProjectProjectDetail;
