import React from "react";
import { Select } from "antd";

const { Option } = Select;

const WarehouseSelect = ({ warehouses, onSelect, loading }) => {
  return (
    <Select
      showSearch
      placeholder="Select warehouse"
      loading={loading}
      optionFilterProp="children"
      onChange={onSelect}
      filterOption={(input, option) =>
        option?.children?.[0]?.props?.children
          ?.toLowerCase()
          .includes(input?.toLowerCase()) ||
        option?.children?.[1]?.props?.children
          ?.toLowerCase()
          .includes(input?.toLowerCase())
      }
      className="flex items-center overflow-hidden w-64 border border-gray rounded-full h-[40px] 2xl:h-[56px] bg-white text-gray-700 custom-select"
    >
      {warehouses?.map((warehouse) => (
        <Option key={warehouse._id} value={warehouse._id}>
          <div className="font-bold">{warehouse?.name}</div>
          <div className="text-gray-500 text-sm">
            {warehouse?.warehouseCode}
          </div>
        </Option>
      ))}
    </Select>
  );
};

export default WarehouseSelect;
