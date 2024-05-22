import React from "react";
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Link, useLocation } from "react-router-dom";

const CreateTable = ({ columns, data, globalFilter, setGlobalFilter }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
  });

  const location = useLocation();
  const path = location.pathname.slice(location.pathname.lastIndexOf("/"));

  return (
    <div className="w-full">
      <div className="p-2 max-w-5xl mx-auto text-white">
        <div className="flex justify-between">
          <input
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(String(e.target.value))}
            placeholder="Search In Table"
            type="text"
            className="p-2 bg-transparent outline-none border-b-2 w-1/5 focus:w-1/3 duration-300 border-accent/60 mb-4"
          />
          <div className="w-2/6">
            <span className="mr-5">Filter by</span>
            <select className="bg-slate-300 outline-none text-blue-950 w-200 h-10">
              <option>Project Name</option>
              <option>Team Member Name</option>
              <option>Project Description</option>
            </select>
          </div>
        </div>
        <table className="border border-gray-700 w-full text-left mt-3">
          <thead className="bg-accent/60">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="capitalize px-3.5 py-2">
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
              ? table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="even:bg-gray-800 hover:bg-slate-600 cursor-pointer"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-3.5 py-2">
                        {path === "/projectdetails" && (
                          <Link to={`projectdetail/${row.id}`}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Link>
                        )}
                        {path === "/projectrequests" &&
                          flexRender(
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
        <div className="flex items-center justify-end mt-2 gap-2">
          <select
            value={table.getState().pagination.pageIndex + 1}
            className="text-black bg-slate-300 w-10 text-center outline-none"
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
          >
            {Array.from({ length: table.getPageCount() }, (_, i) => i).map(
              (i) => (
                <option key={i}>{i + 1}</option>
              )
            )}
          </select>
          <button
            className="p-1 border boreder-gray-300 px-2 disabled:opacity-30"
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="p-1 border boreder-gray-300 px-2 disabled:opacity-30"
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreateTable;
