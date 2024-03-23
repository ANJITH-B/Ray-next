import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivetRoute = () => {
  const token = JSON.parse(localStorage.getItem("Tokens"));
  return <> {token?.accessToken ? <Outlet /> : <Navigate to="/login" />} </>;
};

export default PrivetRoute;
