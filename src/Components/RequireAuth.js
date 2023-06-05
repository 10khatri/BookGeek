import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
export function RequireAuth({ children }) {
  const { isLoggedIn } = React.useContext(AuthContext);
  const location = useLocation();
  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}
