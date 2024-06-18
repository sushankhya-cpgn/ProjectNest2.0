import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/userContext";

const Profile = () => {
  const { user, getUser } = useUser();

  if (!user) {
    getUser();
  }
  return (
    <div className="relative  mr-1.5">
      <button className="flex items-center text-white focus:outline-none">
        <img
          src="/default-user-photo.jpg"
          alt="Profile"
          className="w-8 h-8 rounded-full mr-2"
        />
        <span>{`${user.firstName} ${user.lastName}`}</span>
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
