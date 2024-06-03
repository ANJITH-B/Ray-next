import { Select, Tooltip } from "antd";
import { Option } from "antd/es/mentions";
import React from "react";
import "./formInputStyle.scss";
const BorderdSelect = ({ items=null, addOption, setAddOption, ...rest }) => {
  return (
    <div className="h-[48px] border-[1.5px] w-full overflow-hidden bg-white flex items-center gap-3  focus-within:ring-[2px] focus-within:ring-blue transition-all border-border-gray rounded-xl ">
      <Select
        dropdownStyle={{ zIndex: 999999 }}
         onSearch={(e)=>console.log(e)}
        {...rest}
        suffixIcon={
          rest.error ? (
            <div
              className={`${
                rest.error
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0"
              } cursor-pointer `}
            >
              <Tooltip
                trigger={"hover"}
                title={rest.error}
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
        placeholder={()=><p>sdsd</p>}
        bordered={false}
        // defaultValue={'unit'}
        className="borderd-select flex items-center w-full"
        {...rest}
      >
        {items?.map((item) => {
          return <Option  value={item?.value}>{item?.label}</Option>;
        })}
        {addOption && <Option disabled value={''}><button onClick={()=>setAddOption(true)} className="w-full bg-blue text-white min-w-[2rem]  border-border-gray rounded-md">Create Account</button></Option>}
      </Select>
    </div>
  );
};

export default BorderdSelect;
