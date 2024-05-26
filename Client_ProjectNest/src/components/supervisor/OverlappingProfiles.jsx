import React from "react";

const OverlappingProfiles = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative flex -space-x-4 px-2">
        <img
          className="w-10 h-10 rounded-full border-2 border-white shadow-lg"
          src="https://via.placeholder.com/150"
          alt="Profile 1"
        />
        <img
          className="w-10 h-10 rounded-full border-2 border-white shadow-lg"
          src="https://via.placeholder.com/150"
          alt="Profile 2"
        />
        <img
          className="w-10 h-10 rounded-full border-2 border-white shadow-lg"
          src="https://via.placeholder.com/150"
          alt="Profile 3"
        />
      </div>
    </div>
  );
};

export default OverlappingProfiles;
