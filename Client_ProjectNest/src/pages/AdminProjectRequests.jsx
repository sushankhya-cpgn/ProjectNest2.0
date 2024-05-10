import React, { useState } from "react";
import { USERS } from "../data/projects";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { info } from "autoprefixer";

function ProjectRequests() {
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("", {
      id: "S.No",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "S.No",
    }),
    columnHelper.accessor("projectId", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Project Id",
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
    columnHelper.accessor(" registeredAt", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Registerd At",
    }),
  ];
  const [data] = useState(() => [...USERS]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="w-full ">
      <h1 className="text-center text-2xl">Project Requests</h1>
      <div className="p-2 max-w-5xl mx-auto text-white fill-gray-400">
        <table className="border border-gray-700 w-full text-left">
          <thead className=" bg-accent/60">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className=" capitalize px-3.5 py-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length
              ? table.getRowModel().rows.map((row, i) => (
                  <tr key={row.id} className=" even:bg-gray-800">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className=" px3.5 py-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectRequests;
