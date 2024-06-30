import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthService";

const ProtectedRoute = ({ children }) => {
  let { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
