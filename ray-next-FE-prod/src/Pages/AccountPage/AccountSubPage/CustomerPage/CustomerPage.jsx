import React, { useEffect, useState } from "react";
import printer from "../../../../Assets/CommonImages/printer.svg";
import excel from "../../../../Assets/CommonImages/excel.svg";
import Button from "../../../../CommonComponents/FormInputs/Button";
import { Dropdown, Tabs } from "antd";
import BorderdSelect from "../../../../CommonComponents/FormInputs/BorderdSelect";
import BorderdInput from "../../../../CommonComponents/FormInputs/BorderdInput";
// import "./salesStyle.scss";
import { v4 } from "uuid";
import CustomerTable from "./CreditTable";
import AddCustomerModal from "../../../../CommonComponents/OtherComponent/AddCustomerModal";
import CreditTable from "./CreditTable";
import PendingTable from "./PendingTable";
;


const AccCustomerPage = () => {
  const [filter, setFilter] = useState([]);
  const [tabIndex, setTabIndex] = useState("1");
  const [open,setOpen]=useState(false)

  useEffect(()=>{
    setFilter([])
   },[tabIndex])

  

 
  const tabItems = [
    {
      key: "1",
      label: "Credit",
      children: <CreditTable tabIndex={tabIndex} />,
    },
    {
      key: "2",
      label: "Pending",
      children: <PendingTable tabIndex={tabIndex} />,
    },
   
  ];
  return (
    <div className="p-8 max-w-[1512px]   h-auto m-auto">
      <div className="flex items-center justify-between w-full ">
        <div>
          <h1 className="text-2xl 2xl:text-3xl font-semibold mb-2 2xl:mb-4">Customer</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="rounded-full flex items-center justify-center min-w-[40px] 2xl:min-w-[56px] min-h-[40px] 2xl:min-h-[56px] bg-light-gray">
            <img src={printer} alt="printer" className=" w-5 2xl:w-8"/>
          </div>
          <div>
            <button className="rounded-full h-[40px] 2xl:h-[56px] flex items-center gap-2 justify-center py-4 px-8 bg-green">
              <img src={excel} alt="excel" />
              <p className="whitespace-nowrap 2xl:text-base text-sm text-white">Export</p>
            </button>
          </div>
          <Button onClick={()=>setOpen(true)} background={"bg-blue text-white"} text={"Add customer"} />
        </div>
      </div>

      <div>
       
        <div>
        <div>
          <Tabs
            onChange={(e) => setTabIndex(e)}
            className="history-tab"
            // defaultActiveKey="1"
            items={tabItems}
          />
        </div>
        </div>
      </div>
      <AddCustomerModal open={open} setOpen={setOpen}/>
    </div>
  );
};

export default AccCustomerPage;
