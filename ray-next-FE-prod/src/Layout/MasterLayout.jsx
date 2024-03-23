import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import "./layoutStyle.scss";
const MasterLayout = () => {
  return (
    <div className="h-full ">
      <Header />
      <div className="layout   h-auto m-auto">
        <Outlet /> 
      </div>
    </div>
  );
};

export default MasterLayout;
