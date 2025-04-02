import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/auths";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, authLoading } = useAuth(); // Assume this hook gets user info including roles

  if (user && !allowedRoles === user.role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
