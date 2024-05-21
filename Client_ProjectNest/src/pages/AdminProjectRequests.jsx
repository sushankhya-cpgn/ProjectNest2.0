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
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Project Name",
    }),
    columnHelper.accessor("Members", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Team Members",
    }),
    columnHelper.accessor("ProjectDescription", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Project Description",
    }),
    columnHelper.accessor("registered", {
      cell: (info) => <span>✅{"      "} ❌</span>,
      header: "Registration Action",
    }),
  ];

  const [data] = useState(() => [...USERS]);
  const [globalFilter, setGlobalFilter] = useState("");

  return (
    <div className="w-full">
      <h1 className="text-center text-2xl">Project Requests</h1>
      <CreateTable
        columns={columns}
        data={data}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </div>
  );
}

export default ProjectRequests;
