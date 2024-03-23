import { Table } from "antd";
import React from "react";
import './tableStyle.scss'
const BorderLessTable = ({columns=[],data=[]}) => {
   
  return (
    <div cla>
     <Table scroll={{ x: 1000 }}  pagination={false} className="borderless-table" columns={columns} dataSource={data} />
    </div>
  );
};

export default BorderLessTable;
