import React, { useState } from "react";
import { DatePicker } from "antd";
import "./formInputStyle.scss";
import dayjs from "dayjs";

export const BordedDateRangePicker = ({ onChange, ...rest }) => {
  const accstartdate = JSON.parse(localStorage.getItem("accstartdate"));
  const date = JSON.parse(localStorage.getItem("peroid_date")) ?? [
    accstartdate,
    dayjs().toISOString(),
  ];
  const [value, setValue] = useState(
    date ? [dayjs(date?.[0]), dayjs(date?.[1])] : [dayjs(accstartdate), dayjs()]
  );

  const handleChange = (dates) => {
    setValue(dates);
    if (onChange) {
      onChange(dates);
    }
  };
  const disabledDate = (current) => {
    return (
      (current && current.isBefore(date?.[0], "day")) ||
      (current && current.isAfter(date?.[1], "day"))
    );
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
          className="custom-range-picker-borderd   border-none hover:border-2 px-4"
          disabledDate={disabledDate}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
