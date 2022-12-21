import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PublicOutlet = () => {
  const isLoggedIn = useAuth();

  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default PublicOutlet;
