import React from "react";
import { DatePicker } from "antd";
import moment from "moment";
import "./formInputStyle.scss";

export const DateRangePicker = ({ type = "month", ...rest }) => {
  const storedDate = JSON.parse(localStorage.getItem('accstartdate')) ?? false
  const isDate = storedDate ? moment(storedDate) : null;

  console.log("Stored Date:", storedDate);
  console.log("Is Date:", isDate);

  const disabledDate = (current) => {
    console.log("Current Date:", current);
    if (type === "day") {
      console.log("Day Picker");
      return isDate && current && current.isBefore(isDate, 'day');
    } else {
      console.log("Month Picker");
      return isDate && current && current.isBefore(isDate, 'month');
    }
  };

  return (
    <div>
      <div>
        <DatePicker.RangePicker
          {...rest}
          format="MMM-YYYY"
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
          className="custom-range-picker border-none hover:border-2 px-4"
          picker={type}
          disabledDate={disabledDate}
        />
      </div>
    </div>
  );
};
