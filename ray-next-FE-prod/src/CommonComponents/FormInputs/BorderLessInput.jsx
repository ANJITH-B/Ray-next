import React from "react";
import "./formInputStyle.scss";
import { Tooltip } from "antd";
const BorderLessInput = (props) => {
  return (
    <div className="flex items-center gap-2">
      <input
        {...props}
        type="text"
        className="borderled-input 2xl:text-base text-sm placeholder:text-sm  2xl:placeholder:text-base placeholder:font-normal placeholder:text-black placeholder:opacity-60 font-semibold w-full"
      />
      {props.error ? (
        <div
          className={`${
            props.error
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          } cursor-pointer mr-3`}
        >
          <Tooltip
            trigger={"hover"}
            title={props.error}
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
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Tooltip>
        </div>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.83994 2.4008L3.36661 8.19413C3.15994 8.41413 2.95994 8.84746 2.91994 9.14746L2.67328 11.3075C2.58661 12.0875 3.14661 12.6208 3.91994 12.4875L6.06661 12.1208C6.36661 12.0675 6.78661 11.8475 6.99327 11.6208L12.4666 5.82746C13.4133 4.82746 13.8399 3.68746 12.3666 2.29413C10.8999 0.914129 9.78661 1.4008 8.83994 2.4008Z"
            stroke="#121212"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.92667 3.36719C8.06643 4.26109 8.49907 5.08328 9.15668 5.70469C9.81428 6.32609 10.6596 6.71154 11.56 6.80052M2 14.6672H14"
            stroke="#121212"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};

export default BorderLessInput;
