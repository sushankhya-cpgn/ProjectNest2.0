import React, { useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="relative  mr-1.5">
      <button className="flex items-center text-white focus:outline-none">
        <img
          src="https://via.placeholder.com/32"
          alt="Profile"
          className="w-8 h-8 rounded-full mr-2"
        />
        <span>Ravi Pajiyar</span>
      </button>

      {/* {isOpen && (
        <div className="absolute right-0  mt-2 w-48  bg-secondary rounded-lg shadow-lg z-10">
          <div className="py-1">
            <Link
              to="/profile"
              className="block px-4 py-2 text-sm text-text hover:bg-accent rounded-md"
            >
              Profile
            </Link>
            <Link
              to="/settings"
              className="block px-4 py-2 text-sm text-text hover:bg-accent rounded-md"
            >
              Settings
            </Link>
            <Link
              to="/logout"
              className="block px-4 py-2 text-sm text-text hover:bg-accent rounded-md"
            >
              Logout
            </Link>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Profile;
