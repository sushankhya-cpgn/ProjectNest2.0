import React from "react";
import CreateTable from "../components/Admin/AddProject/CreateTable";
import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { USERS } from "../data/projects";

function Archieves() {
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
  ];

  const [data] = useState(() => [...USERS]);
  const [globalFilter, setGlobalFilter] = useState("");
  return (
    <div>
      <CreateTable
        columns={columns}
        data={data}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </div>
  );
}

export default Archieves;
