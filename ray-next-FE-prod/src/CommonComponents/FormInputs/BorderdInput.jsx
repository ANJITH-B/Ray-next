import { Field } from "formik";
import React from "react";
import "./formInputStyle.scss";
import { Tooltip } from "antd";
const BorderdInput = ({
  formik = false,
  value,
  sufixIcon = false,
  error = false,
  errorBorder = false,
  ...rest
}) => {
  return formik ? (
    <div
      className={`${
        sufixIcon ? "pl-3" : "pl-0"
      } h-[48px] border-[1.5px] w-full overflow-hidden  bg-white flex items-center ${
        errorBorder ? "ring-error-color" : ""
      }  focus-within:ring-[2px] focus-within:ring-blue transition-all border-border-gray rounded-xl `}
    >
      {sufixIcon && sufixIcon}
      <Field
        {...rest}
        className=" px-3 2xl:px-4 placeholder:text-[14px] w-full"
      />
       {error && !errorBorder && (
        <div
          className={`${
            error
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          } cursor-pointer mr-1`}
        >
          <Tooltip
            trigger={"hover"}
            title={error}
            color="white"
            className="error-tooltip"
          >
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
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Tooltip>
        </div>
      )}
    </div>
  ) : (
    <div
      className={`${
        sufixIcon ? "pl-3" : "pl-0"
      } h-[48px] border-[1.5px] w-full overflow-hidden  bg-white flex items-center ${
        errorBorder ? "ring-error-color" : ""
      }  focus-within:ring-[2px] focus-within:ring-blue transition-all border-border-gray rounded-xl `}
    >
      {sufixIcon && sufixIcon}
      <input
        {...rest}
      
        value={value}
        className="px-3 2xl:px-4  h-full placeholder:text-[14px] w-full bg-transparent"
      />
      {error && !errorBorder && (
        <div
          className={`${
            error
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          } cursor-pointer mr-1`}
        >
          <Tooltip
            trigger={"hover"}
            title={error}
            color="white"
            className="error-tooltip"
          >
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
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default BorderdInput;
