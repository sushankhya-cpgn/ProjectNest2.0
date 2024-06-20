import { useEffect } from "react";
import { useUser } from "../contexts/userContext";
import { Outlet, Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function RoleProtectedRoutes({ role }) {
  const { user, getUser } = useUser();
  useEffect(function () {
    if (!user) {
      getUser();
    }
  }, []);

  if (!user) {
    return <Spinner />;
  }

  return user.role === role ? <Outlet /> : <Navigate to="/error" />;
}
