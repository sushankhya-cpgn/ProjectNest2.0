import React, { useState } from "react";
import { USERS } from "../data/projects";
import { createColumnHelper } from "@tanstack/react-table";
import CreateTable from "../components/Admin/AddProject/CreateTable";

function ProjectRequests() {
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("", {
      id: "S.No",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "S.No",
    }),
    columnHelper.accessor("ProjectName", {
      id: "ProjectName",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Project Name",
    }),
    columnHelper.accessor("Members", {
      id: "Members",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Team Members",
    }),
    columnHelper.accessor("ProjectDescription", {
      id: "ProjectDescription",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Project Description",
    }),
    columnHelper.accessor("registered", {
      id: "registered",
      cell: (info) => <span>✅ ❌</span>,
      header: "Registration Action",
    }),
  ];

  const [data] = useState(() => [...USERS]);
  const [columnFilters, setColumnFilters] = useState([]);

  return (
    <div className="w-full">
      <h1 className="text-center text-2xl">Project Requests</h1>
      <CreateTable
        columns={columns}
        data={data}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />
    </div>
  );
}

export default ProjectRequests;
