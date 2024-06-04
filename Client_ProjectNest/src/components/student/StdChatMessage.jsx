import React from "react";

const StdChatMessage = ({ user, message, classs }) => {
  const messageClass =
    classs === "right" ? "bg-crimson text-white" : "bg-green-200";
  const floatClass =
    classs === "right" ? "float-right text-right" : "float-left text-left";

  return (
    <div
      className={`rounded-lg p-4 my-2 max-w-[70%] clear-both ${messageClass} ${floatClass}`}
    >
      {user ? `${user}: ${message}` : `You: ${message}`}
    </div>
  );
};

export default StdChatMessage;
