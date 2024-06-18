import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [projectDetails, setProjectDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchProjectData(projectId) {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://127.0.0.1:8000/api/v2/project/my-projects/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProjectDetails(res.data);
    } catch (error) {
      console.error("There was some error loading the data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ProjectContext.Provider
      value={{ projectDetails, isLoading, error, fetchProjectData }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined)
    throw new Error("useProject must be used within a ProjectProvider");
  return context;
}
