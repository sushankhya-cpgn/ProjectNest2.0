import { createContext, useContext, useEffect, useState } from "react";
import { users } from "../data/users.json";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function getUser(role) {
    const user = users.find((user) => user.role === role);
    setUser(user);
  }
  return (
    <UserContext.Provider value={{ user, isLoading, error, getUser }}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const user = useContext(UserContext);
  if (user === undefined) throw new Error("cannot use user context outside");
  return user;
}

export { UserProvider, useUser };
