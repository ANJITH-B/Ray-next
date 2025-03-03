// import React from "react";
// import { Select } from "antd";

// const { Option } = Select;

// const WarehouseSelect = ({ warehouses, onSelect, loading }) => {
//     return (
//         <Select
//             showSearch
//             placeholder="Select warehouse"
//             loading={loading}
//             optionFilterProp="children"
//             onChange={onSelect}
//             filterOption={(input, option) =>
//                 option.children.toLowerCase().includes(input.toLowerCase())
//             }
//             className="w-64 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//             {warehouses?.map((warehouse) => (
//                 <Option key={warehouse._id} value={warehouse._id} className="py-2 px-4 hover:bg-gray-100">
//                     <div>{warehouse.name}</div>
//                     <div>{warehouse.warehouseCode}</div>                   
//                 </Option>
//             ))}
//         </Select>
//     );
// };

// export default WarehouseSelect;


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
                option.children.toLowerCase().includes(input.toLowerCase())
            }
            className="w-64 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            {warehouses?.map((warehouse) => (
                <Option key={warehouse._id} value={warehouse._id} className="py-2 px-4 hover:bg-gray-100">
                    <div className="font-bold">{warehouse?.name}</div>
                    <div className="text-gray-500 text-sm">{warehouse?.warehouseCode}</div>
                </Option>
            ))}
        </Select>
    );
};

export default WarehouseSelect;
