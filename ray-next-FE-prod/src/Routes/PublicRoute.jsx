import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = JSON.parse(localStorage.getItem("Tokens"));
  return <> {!token?.accessToken ? <Outlet /> : <Navigate to={"/"} />} </>;
};

export default PublicRoute;
