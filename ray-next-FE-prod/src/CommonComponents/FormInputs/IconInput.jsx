import { Tooltip } from "antd";
import { Field } from "formik";
import React, { useEffect, useState } from "react";

const IconInput = (props) => {
  return (
    <div className="flex items-center gap-3 bg-light-gray rounded-full overflow-hidden focus-within:ring-1	  transition-all duration-300 py-1 px-4 2xl:py-2 2xl:px-6">
      <img src={props.icon} alt="icon" />
      <Field {...props} className=" icon-input bg-transparent h-10 w-full" />
      <div className={`${props.error ? 'pointer-events-auto opacity-100':'pointer-events-none opacity-0'} cursor-pointer`}>
        <Tooltip trigger={'click'} title={props.error} color="white"  className="error-tooltip">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 6V9.75M9 16.5C13.125 16.5 16.5 13.125 16.5 9C16.5 4.875 13.125 1.5 9 1.5C4.875 1.5 1.5 4.875 1.5 9C1.5 13.125 4.875 16.5 9 16.5Z"
            stroke="#F42F2F"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        </Tooltip>
      </div>
    </div>
  );
};

export default IconInput;
