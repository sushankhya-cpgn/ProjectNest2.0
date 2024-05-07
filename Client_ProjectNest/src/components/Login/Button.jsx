import React from "react";
import { Link } from "react-router-dom";

export function Button() {
  return (
    <Link to="/app/admin">
      <button className=" bg-blue-500 h-10 w-11/12 text-white rounded-lg border-none hover:bg-blue-600 ">
        Sign In
      </button>
    </Link>
  );
}
