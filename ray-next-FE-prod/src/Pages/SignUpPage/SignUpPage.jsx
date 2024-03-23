import React from "react";
import { Outlet } from "react-router-dom";

const SignUpPage = () => {
  return (
    <div className="">
      <div className="flex flex-col items-center ">
      
        <Outlet/>
      </div>
    </div>
  );
};

export default SignUpPage;
