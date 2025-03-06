import React from "react";
import { DateRangePicker } from "../../../CommonComponents/FormInputs/DatePickers";
import dayjs from "dayjs";

const DateSelect = () => {
  const date = JSON.parse(localStorage.getItem("peroid_date"));
  const acc_start_date =
    JSON.parse(localStorage.getItem("accstartdate")) ?? dayjs();
  const initialValue = date
    ? [dayjs(date?.[0]), dayjs(date?.[1])]
    : [dayjs(acc_start_date), dayjs()];

  const handleChange = (e) => {
    localStorage.setItem("peroid_date", JSON.stringify(e));
  };

  return (
    <div className="flex items-center gap-4 2xl:gap-6">
      <div>
        <p className="text-dark-color text-xs whitespace-nowrap 2xl:text-base pt-2">
          Current period
        </p>
      </div>
      <div className="max-w-[200px]">
        <DateRangePicker onChange={handleChange} initialValue={initialValue} />
      </div>
    </div>
  );
};

export default DateSelect;
