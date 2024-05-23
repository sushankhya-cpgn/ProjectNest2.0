import React, { useState } from "react";
import { Link } from "react-router-dom";

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative  mr-1.5">
      <button
        className="flex items-center text-white focus:outline-none"
        onClick={toggleDropdown}
      >
        {/* <img
          src="https://via.placeholder.com/32"
          alt="Profile"
          className="w-8 h-8 rounded-full mr-2"
        />
        <span>Ravi Pajiyar</span> */}
        <svg
          className={`ml-2 h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0  mt-2 w-48  bg-gray-700 rounded-lg shadow-lg z-10">
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
      )}
    </div>
  );
};

export default DropDown;
