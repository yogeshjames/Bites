import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "./UserContext";

const ProtectedRoute = ({ element, ...rest }) => {
  const { user, loading } = useUser(); 
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return element; // Render the passed element
};

export default ProtectedRoute;