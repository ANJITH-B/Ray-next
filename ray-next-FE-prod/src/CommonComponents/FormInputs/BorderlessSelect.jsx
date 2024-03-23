import { Select, Tooltip } from "antd";
import React from "react";
import "./formInputStyle.scss";

const BorderlessSelect = (props) => {
  return (
    <div>
      <Select
        className="borderless-select w-full text-base 2xl:text-lg"
        {...props}
        suffixIcon={
          props.error ? (
            <div
              className={`${
                props.error
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0"
              } cursor-pointer `}
            >
              <Tooltip
                trigger={"hover"}
                title={props.error}
                color="white"
                className="error-tooltip"
              >
                <svg
                  width="16"
                  height="16"
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
          ) : (
            <svg
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 1L6.88384 5.11616C6.39773 5.60227 5.60227 5.60227 5.11616 5.11616L1 1"
                stroke="#121212"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )
        }
      />
    </div>
  );
};

export default BorderlessSelect;
