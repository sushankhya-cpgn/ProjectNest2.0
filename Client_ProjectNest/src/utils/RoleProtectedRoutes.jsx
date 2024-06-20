import { useEffect } from "react";
import { useUser } from "../contexts/userContext";
import { Outlet, Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import Error404Page from "../pages/Error404Page";

export default function RoleProtectedRoutes({ role }) {
  const { user, getUser } = useUser();
  useEffect(function () {
    if (!user) {
      getUser();
    }
  }, []);

  if (!user) {
    return (
      <div className="w-screen h-screen bg-backgroundlight flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return user.role === role ? <Outlet /> : <Error404Page />;
}
