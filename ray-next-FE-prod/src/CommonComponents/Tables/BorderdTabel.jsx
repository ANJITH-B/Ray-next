import { Table } from "antd";
import React from "react";
import "./tableStyle.scss";
import BorderdSelect from "../FormInputs/BorderdSelect";
const BordedTable = ({ columns, data, ...rest }) => {
  return (
    <div className="h-auto rounded-[30px] overflow-hidden">
      <div
        style={{
          height: "calc(100vh - 150px)",
          overflow: "scroll",
        }}
        className="border-[.5px] max-h-[35rem]   border-[#E0E0E0] rounded-[30px] "
      >
        <Table
          {...rest}
          sticky={true}
          scroll={{ y: `calc(100vh - 250px)`, x: 1000 }}
          className="borderd-table"
          columns={columns}
          
          pagination={false}
          dataSource={data}
        />
      </div>
    </div>
  );
};

export default BordedTable;
