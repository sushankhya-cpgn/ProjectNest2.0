import React, { useState, useEffect } from "react";
import axios from "axios";
import { createColumnHelper } from "@tanstack/react-table";
import CreateTable from "../components/Admin/AddProject/CreateTable";

function ProjectRequests() {
  const [projectreq, setProjectreq] = useState([]);

  useEffect(() => {
    async function fetchProjectReq() {
      const token = localStorage.getItem("token");
      const data = await axios.get(
        "http://127.0.0.1:8000/api/v2/projectreq/proposals",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const supervisor = await axios.get(
        "http://127.0.0.1:8000/api/v2/user?role=supervisor"
      );
      console.log(supervisor);
      setProjectreq(data.data.proposals);
    }
    fetchProjectReq();
  }, []);

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("", {
      id: "S.No",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "S.No",
    }),
    columnHelper.accessor("title", {
      id: "title",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Project Name",
    }),
    columnHelper.accessor("problemStatement", {
      id: "problemStatement",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Problem Statement",
    }),
    columnHelper.accessor("solution", {
      id: "solution",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Solution",
    }),
    columnHelper.accessor("Supervisor", {
      id: "Supervisor",
      cell: (info) => (
        <select className="text-black w-32">
          <option>{info.getValue()}</option>
        </select>
      ),
      header: "Allocate Supervisor",
    }),
    columnHelper.accessor("registered", {
      id: "registered",
      cell: (info) => (
        <div className="flex gap-2">
          <button className="text-black bg-slate-200 w-24">Approve</button>
          <button className="text-black bg-slate-200 w-24">Reject</button>
        </div>
      ),
      header: "Registration Action",
    }),
  ];

  const [columnFilters, setColumnFilters] = useState([]);

  return (
    <div className="w-full">
      <h1 className="text-center text-2xl">Project Requests</h1>
      <CreateTable
        columns={columns}
        data={projectreq}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />
    </div>
  );
}

export default ProjectRequests;
