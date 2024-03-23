import React from "react";

const DetialsContainer = ({ children,color }) => {
  return (
    <div className={`min-h-[180px] max-w-[626px] relative rounded-[30px] overflow-hidden ${color} `}>
      <div className="absolute w-full h-full  z-[0] ring-[100px] border-[30px] border-opacity-50 border-white blur-2xl ring-white"></div>
      <div className="py-4 px-6 relative z-[2]"> {children}</div>
    </div>
  );
};

export default DetialsContainer;
