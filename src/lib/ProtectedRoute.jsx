 
import { Navigate, Outlet } from "react-router-dom"; 
import { useAuth } from "../hooks/auths";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth(); // Assume this hook gets user info including roles

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
