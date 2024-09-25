import React, { useState } from "react";
import printer from "../../../../Assets/CommonImages/printer.svg";
import excel from "../../../../Assets/CommonImages/excel.svg";
import { Tabs } from "antd";
import ProfitLoss from "./Profit&Loss";
import BalanceSheet from "./BalanceSheet";
import CashFlow from "./CashFlow";
import TrialBalance from "./TrialBalance";
import AccountBooks from "./AccountBooks";
// import 'antd/dist/antd.css';
// import 'antd/dist/reset.css';


const FinancialReportPage = () => {
  const [tabIndex, setTabIndex] = useState("1");
  const tabItems = [
    {
      key: "1",
      label: "Profit & Loss",
      children: <div tabIndex={tabIndex} />,
    },
    {
      key: "2",
      label: "Balance Sheet",
      children: <div tabIndex={tabIndex} />,
    },
    {
      key: "3",
      label: "Cash Flow",
      children: <div tabIndex={tabIndex} />,
    },
    {
      key: "4",
      label: "Trial Balance",
      children: <div tabIndex={tabIndex} />,
    },
    {
      key: "5",
      label: "Account Books",
      children: <div tabIndex={tabIndex} />,
    },
  ];

  const table = (key) => {
    switch (key) {
      case "1":
        return <ProfitLoss />;
      case "2":
        return <BalanceSheet />;
      case "3":
        return <CashFlow />;
      case "4":
        return <TrialBalance />;
      case "5":
        return <AccountBooks />;
      default:
        return null;
    }
  };

  return (
    <div className="p-8 max-w-[1512px]   h-auto m-auto">
      <div className="flex items-center justify-between w-full ">
        <div>
          <h1 className="text-2xl 2xl:text-3xl font-semibold ">Reports</h1>
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
      {table(tabIndex)}
    </div>
  );
};

export default FinancialReportPage;
