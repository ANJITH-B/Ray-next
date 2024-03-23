import React, { useState } from "react";
import lock from "../../Assets/CommonImages/lock1.svg";
import { Field } from "formik";
import { Tooltip } from "antd";

const PasswordInput = ({name,error}) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="flex items-center gap-3 bg-light-gray rounded-full overflow-hidden  focus-within:ring-1	  transition-all duration-300 py-1 px-4 2xl:py-2 2xl:px-6">
        <img src={lock} alt="icon" />
        <Field
          type={show ? "text" : "password"}
          className=" icon-input bg-transparent h-10 w-full"
          placeholder="Password"
          name={name}
        />

        <button type="button" onClick={() => setShow(!show)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5799 11.9999C15.5799 13.9799 13.9799 15.5799 11.9999 15.5799C10.0199 15.5799 8.41992 13.9799 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C13.9799 8.41992 15.5799 10.0199 15.5799 11.9999Z"
              stroke="#969696"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.0001 20.2707C15.5301 20.2707 18.8201 18.1907 21.1101 14.5907C22.0101 13.1807 22.0101 10.8107 21.1101 9.4007C18.8201 5.8007 15.5301 3.7207 12.0001 3.7207C8.47009 3.7207 5.18009 5.8007 2.89009 9.4007C1.99009 10.8107 1.99009 13.1807 2.89009 14.5907C5.18009 18.1907 8.47009 20.2707 12.0001 20.2707Z"
              stroke="#969696"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
       {error && <div className={`${error ? 'pointer-events-auto opacity-100':'pointer-events-none opacity-0'} cursor-pointer`}>
        <Tooltip trigger={'click'} title={error} color="white"  className="error-tooltip">
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
            strokeWinecap="round"
            strokeWinejoin="round"
          />
        </svg>
        </Tooltip>
      </div>}
      </div>
    </div>
  );
};

export default PasswordInput;
