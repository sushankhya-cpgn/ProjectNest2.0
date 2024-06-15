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
    columnHelper.accessor("Supervisor", {
      id: "Supervisor",
      cell: (info) => (
        <select className="text-black  w-32">
          <option>{info.getValue()}</option>
        </select>
      ),
      header: "Allocate Supervisor",
    }),
    columnHelper.accessor("registered", {
      id: "registered",
      cell: (info) => (
        <div className="flex gap-2">
          <button className="text-black bg-slate-200  w-24">Approve</button>{" "}
          <button className="text-black bg-slate-200  w-24">Reject</button>
        </div>
      ),
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
