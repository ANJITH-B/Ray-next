import { Select } from "antd";
import React from "react";
import "./formInputStyle.scss";
const ChartDateSelect = () => {
  return (
    <div>
      {" "}
      <Select
      className="chart-date w-44"
        defaultValue="lucy"
        
        // onChange={handleChange}
        options={[
          { value: "jack", label: "Jack" },
          { value: "lucy", label: "Lucy" },
          { value: "Yiminghe", label: "yiminghe" },
          { value: "disabled", label: "Disabled", disabled: true },
        ]}
      />
    </div>
  );
};

export default ChartDateSelect;
