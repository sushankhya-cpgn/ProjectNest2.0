import React from "react";
import { useUser } from "../../contexts/userContext";

export default function WelcomeMessage() {
  const { user, getUser } = useUser();
  if (!user) {
    getUser();
  }
  return (
    <h1 className="my-2 text-[2rem]  ">
      <span className="text-stone-400">Good morning, </span>
      {user.firstName}
    </h1>
  );
}
