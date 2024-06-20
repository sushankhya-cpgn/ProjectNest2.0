import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateTable from "../components/Admin/AddProject/CreateTable";
import { createColumnHelper } from "@tanstack/react-table";
import Spinner from "../components/Spinner";

function AdminProjectDetails() {
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("", {
      id: "S.No",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "S.No",
    }),
    columnHelper.accessor("title", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Project Name",
    }),
    columnHelper.accessor("semester", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Semester",
    }),

    columnHelper.accessor("supervisor", {
      cell: (info) => (
        <span>{`${info.getValue().firstName} ${
          info.getValue().lastName
        }  `}</span>
      ),
      header: "Supervisor",
    }),
  ];

  const [projects, setProjects] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      try {
        const projectResponse = await axios.get(
          "http://127.0.0.1:8000/api/v2/project",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const supervisorResponse = await axios.get(
          "http://127.0.0.1:8000/api/v2/user?role=supervisor",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProjects(projectResponse.data.data.projects);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen bg-backgroundlight flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full h-screen bg-backgroundlight flex items-center justify-center">
        <h1>Something went wrong</h1>
      </div>
    );
  }

  return (
    <div>
      <CreateTable
        columns={columns}
        data={projects}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />
    </div>
  );
}

export default AdminProjectDetails;
