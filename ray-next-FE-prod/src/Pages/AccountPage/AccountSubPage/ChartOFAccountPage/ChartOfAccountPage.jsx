import React, { useEffect, useState } from "react";
import printer from "../../../../Assets/CommonImages/printer.svg";
import excel from "../../../../Assets/CommonImages/excel.svg";
import Button from "../../../../CommonComponents/FormInputs/Button";
import { Dropdown, Tabs } from "antd";
import BorderdSelect from "../../../../CommonComponents/FormInputs/BorderdSelect";
import BorderdInput from "../../../../CommonComponents/FormInputs/BorderdInput";
// import "./salesStyle.scss";
import { v4 } from "uuid";
import AddCustomerModal from "../../../../CommonComponents/OtherComponent/AddCustomerModal";

import RegularAccTable from "./RegularAccTable";
import ControlAccTable from "./ControlAccTable";
import GroupAccTable from "./GroupAccTable";
import RegularAccountModal from "../../AccountPageComponents/RegularAccountModal";
import AccountGroupModal from "../../AccountPageComponents/AccountGroupModal";
import ControlledAccountModal from "../../AccountPageComponents/ControlledAccountModal";
const ChartOfAccPage = () => {
  const [filter, setFilter] = useState([]);
  const [tabIndex, setTabIndex] = useState("1");
  const [regularOpen, setRegularOpen] = useState(false);
  const [controlOpen, setControlOpen] = useState(false);
  const [groupOpen, setgroupOpen] = useState(false);

  useEffect(() => {
    setFilter([]);
  }, [tabIndex]);

  const tabItems = [
    {
      key: "1",
      label: "Regular account",
      children: <RegularAccTable tabIndex={tabIndex} />,
    },
    {
      key: "2",
      label: "Control account",
      children: <ControlAccTable tabIndex={tabIndex} />,
    },
    {
      key: "3",
      label: "Account group",
      children: <GroupAccTable tabIndex={tabIndex} />,
    },
  ];
  return (
    <div className="p-8 max-w-[1512px]   h-auto m-auto">
      <div className="flex items-center justify-between w-full ">
        <div>
          <h1 className="text-2xl 2xl:text-3xl font-semibold ">
            Chart of accounts
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="rounded-full flex items-center justify-center min-w-[40px] 2xl:min-w-[56px] min-h-[40px] 2xl:min-h-[56px] bg-light-gray">
            <img src={printer} alt="printer" className=" w-5 2xl:w-8" />
          </div>
          <div>
            <button className="rounded-full h-[40px] 2xl:h-[56px] flex items-center gap-2 justify-center py-4 px-8 bg-green">
              <img src={excel} alt="excel" />
              <p className="whitespace-nowrap 2xl:text-base text-sm text-white">
                Export
              </p>
            </button>
          </div>
          {tabIndex === "1" && (
            <Button
              onClick={() => setRegularOpen(true)}
              background={"bg-blue text-white"}
              text={"New Regular Account"}
            />
          )}
          {tabIndex === "2" && (
            <Button
              onClick={() => setControlOpen(true)}
              background={"bg-blue text-white"}
              text={"New Control Account"}
            />
          )}
          {tabIndex === "3" && (
            <Button
              onClick={() => setgroupOpen(true)}
              background={"bg-blue text-white"}
              text={"New Account Group"}
            />
          )}
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
      <RegularAccountModal open={regularOpen} setOpen={setRegularOpen} />
      <ControlledAccountModal
        open={controlOpen}
        setOpen={setControlOpen}
      />
      <AccountGroupModal open={groupOpen} setOpen={setgroupOpen} />
    </div>
  );
};

export default ChartOfAccPage;
