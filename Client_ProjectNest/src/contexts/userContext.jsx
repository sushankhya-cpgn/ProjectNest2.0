import { createContext, useContext, useEffect, useState } from "react";
import { users } from "../data/users.json";
import axios from "axios";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const login = (user) => {
    setUser(user);
  };

  async function getUser() {
    const token = localStorage.getItem("token");
    console.log(token);
    const res = await axios.get(
      `http://127.0.0.1:8000/api/v2/user/token/${token}`
    );
    setUser(res.data.user);
  }

  return (
    <UserContext.Provider value={{ user, isLoading, error, login, getUser }}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error("cannot use user context outside");
  return context;
}

export { UserProvider, useUser };
