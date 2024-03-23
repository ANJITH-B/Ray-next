import React from "react";
import { Toaster } from "react-hot-toast";

const CustomToast = () => {
  return (
    <Toaster
      toastOptions={{
        error: { className: "text-xs font-semibold text-error bg-[primary]" },
        success: { className: "text-xs font-semibold text-status bg-[primary]" },
        duration:3000
      }}
      reverseOrder={false}
      containerClassName="z-[999999]"
      
    />
  );
};

export default CustomToast;
