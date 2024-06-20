import TechnologyTag from "./TechnologyTag";
import PersonItem from "./PersonItem";
import Button from "../Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Spinner";
import { useUser } from "../../contexts/userContext";

function FindProjectProjectDetail() {
  const { user, getUser } = useUser();
  const { id } = useParams();
  const [createdProject, setCreatedProject] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [joinLoading, setJoinLoading] = useState(false);
  const [joinError, setJoinError] = useState("");
  const [canSendRequest, setCanSendRequest] = useState(true);
  const [interestedPeople, setInterestedPeople] = useState([]);
  const [isAlreadyInProject, setIsAlreadyInProject] = useState(false);
  const [isProjectMember, setIsProjectMember] = useState(false);

  useEffect(function () {
    if (!user) {
      getUser();
    }
  }, []);
  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/v2/projectreq/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log("Fetched data:", data.data.canSendRequest); // Log the fetched data to inspect its structure

        if (data && data.data) {
          // Adjust based on the actual data structure
          setCanSendRequest(data.data.canSendRequest);
          setIsAlreadyInProject(data.data.alreadyInProject);
          setInterestedPeople([
            ...data.data.project.joinrequests,
            ...data.data.project.teamMembers,
          ]);
          setCreatedProject(data.data.project);

          if (
            data.data.project.teamMembers.find(
              (member) => member._id === user._id
            )
          ) {
            setIsProjectMember(true);
          }
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

  // Update interestedPeople to use the keys firstName and photo

  async function handleJoinRequest() {
    try {
      setJoinLoading(true);
      setJoinError("");
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `http://127.0.0.1:8000/api/v2/projectreq/${id}/send-join-request`,
        {}, // Assuming the PATCH request does not require a body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Join request sent successfully:", response.data);
      setCanSendRequest(false);
    } catch (err) {
      console.log("Join request sent successfully error:", err);

      console.error("Error sending join request:", err.message);
      setJoinError(err.response.data.message);
    } finally {
      setJoinLoading(false);
    }
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
        Something went wrong, try again later. {error}
      </div>
    );
  }

  return (
    <div className="p-3 pt-0 overflow-auto flex flex-col gap-4">
      <div className="py-3 sticky top-0 bg-backgroundlight flex justify-between items-center">
        <h1 className=" text-2xl">{createdProject.title}</h1>
        <Button
          onClick={handleJoinRequest}
          disabled={joinLoading || !canSendRequest || isProjectMember}
        >
          {!isAlreadyInProject &&
            (!canSendRequest
              ? isProjectMember
                ? "Your request was accepted"
                : "Requested"
              : joinLoading
              ? "Requesting"
              : "Request to Join")}
          {isAlreadyInProject && "You are already in a project"}
        </Button>
      </div>
      {joinError && <p className="text-red-500">{joinError}</p>}
      <div className="flex justify-between">
        <PersonItem
          name={
            createdProject.createdBy
              ? createdProject.createdBy.firstName
              : "Unknown"
          }
          image={
            createdProject.createdBy
              ? createdProject.createdBy.photo
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

      {interestedPeople.length > 0 && (
        <div>
          <h2 className="mb-4">These people are interested in the project:</h2>
          <div>
            <ul className="flex flex-col gap-2 mt-2">
              {interestedPeople?.map((person, i) => (
                <li key={i}>
                  <PersonItem
                    name={person.firstName + " " + person.lastName}
                    image={person.photo}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default FindProjectProjectDetail;
