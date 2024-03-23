import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="	  w-full h-screen flex items-center justify-end  ">
      <div className="bg-login flex-1 h-full bg-no-repeat bg-cover bg-right		">

      </div>
      <div className=" flex-1">

      <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
