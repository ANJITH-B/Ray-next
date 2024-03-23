import React from "react";
import { DatePicker } from "antd";
import "./formInputStyle.scss";
export const BordedDateRangePicker = ({ type = "month",...rest }) => {
  return (
    <div>
      <div>
        <DatePicker.RangePicker
      
        {...rest}

       
        format='MMM-YYYY'
          suffixIcon={
            <svg
              width="10"
              height="6"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.88 1L7.99 5.89C7.4125 6.4675 6.4675 6.4675 5.89 5.89L1 1"
                stroke="#121212"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          className="custom-range-picker-borderd   border-none hover:border-2 px-4"
          picker={type}
        />
      </div>
    </div>
  );
};
