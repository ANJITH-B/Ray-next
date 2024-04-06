import { Table } from "antd";
import React from "react";
import './tableStyle.scss'
const CerditDebitTable = ({columns=[],data=[]}) => {
   
  return (
    <div cla>
     <Table className="borderless-table "  pagination={false}  columns={columns} dataSource={data} />
    </div>
  );
};

export default CerditDebitTable;
