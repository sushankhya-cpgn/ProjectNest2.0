import React, { useState } from "react";

export default function InterestedPerson({ name, image, onRemove }) {
  const [status, setStatus] = useState("pending");

  const handleAccept = () => {
    setStatus("accepted");
  };

  const handleDecline = () => {
    onRemove(name);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="box1 flex gap-4 items-center">
        <img className="rounded-full w-8" alt="display" src={`/${image}`} />
        <span>{name}</span>
      </div>
      {status === "pending" ? (
        <div className="box2 flex gap-5">
          <button
            className="bg-accent px-3 py-3 rounded-lg flex items-center justify-center gap-2 h-9 text-text"
            onClick={handleAccept}
          >
            Accept
          </button>
          <button
            className="bg-accent px-3 py-3 rounded-lg flex items-center justify-center gap-2 h-9 text-text"
            onClick={handleDecline}
          >
            Decline
          </button>
        </div>
      ) : (
        <span>Accepted</span>
      )}
    </div>
  );
}
