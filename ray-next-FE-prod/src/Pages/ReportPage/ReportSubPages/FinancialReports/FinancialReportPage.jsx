import React, { useEffect, useState } from "react";
import printer from "../../../../Assets/CommonImages/printer.svg";
import excel from "../../../../Assets/CommonImages/excel.svg";
import { Dropdown, Table, Tabs } from "antd";
import BorderdSelect from "../../../../CommonComponents/FormInputs/BorderdSelect";
import BorderdInput from "../../../../CommonComponents/FormInputs/BorderdInput";

const Filter = ({ setFilter, tabIndex }) => {
  const [date, seDate] = useState();
  const [under, setUnder] = useState();
  const [name, setName] = useState();
  return (
    <Dropdown
      dropdownRender={() => {
        return (
          <div className="bg-white w-[150%] p-6 2xl:p-8 shadow-lg">
            <div className="flex justify-center gap-5">
              <BorderdSelect
                onChange={(e, i) => {
                  seDate(e);
                }}
                placeholder="Select"
                items={[{ label: "Set" }, { label: "Type" }]}
              />

              <BorderdSelect
                onChange={(e, i) => {
                  setUnder(e);
                }}
                placeholder="Select"
                items={[{ label: "Set" }, { label: "Type" }]}
              />
              <BorderdInput
                onChange={(e, i) => {
                  setName(e.target.value);
                }}
                placeholder="Enter"
              />
            </div>
            <div className="flex justify-end mt-4 text-lg font-semibold">
              <button
                onClick={() =>
                  setFilter([
                    {
                      label: "Date",
                      value: date,
                    },
                    {
                      label: "Under",
                      value: under,
                    },
                    {
                      label: "Name",
                      value: name,
                    },
                  ])
                }
              >
                Apply filter
              </button>
            </div>
          </div>
        );
      }}
      trigger={["click"]}
    >
      <button className=" px-4 2xl:px-6 py-2 2xl:py-3 rounded-full text-sm 2xl:text-base  border-[1px] border-border-gray">
        Add filter +{" "}
      </button>
    </Dropdown>
  );
};

const FinancialReportPage = () => {
  const [filter, setFilter] = useState([]);
  const [tabIndex, setTabIndex] = useState("1");

  useEffect(() => {
    setFilter([]);
  }, [tabIndex]);

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
      label: "Trail Balance",
      children: <div tabIndex={tabIndex} />,
    },
    {
      key: "5",
      label: "Account Books",
      children: <div tabIndex={tabIndex} />,
    },
  ];
  const items = [
    {
      label: "Name",

      key: "0",
    },
    {
      label: "Account code",
      key: "1",
    },

    {
      label: "Email",
      key: "3",
    },
    {
      label: "Contact person",
      key: "4",
    },
    {
      label: "Contact number",
      key: "5",
    },
    {
      label: "Address",
      key: "6",
    },
    {
      label: "Remarks",
      key: "7",
    },
  ];
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  const columns = [
    {
      title: 'Expense',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Income',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Amount',
      dataIndex: 'age',
      key: 'age',
    },
  ];
  return (
    <div className="p-8 max-w-[1512px]   h-auto m-auto">
      <div className="flex items-center justify-between w-full ">
        <div>
          <h1 className="text-2xl 2xl:text-3xl font-semibold ">
            Reports
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
      <div className="flex gap-2 items-center w-full justify-between mb-6">
        <Filter setFilter={setFilter} tabIndex={tabIndex} />
        <div>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <button className="px-4 2xl:px-6 py-2 2xl:py-3 2xl:text-base text:sm rounded-full border-[1px] flex items-center gap-4">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.99243 11.6175L6.75743 15.375V2.625M15.0074 6.3825L11.2424 2.625V15.375"
                  stroke="#969696"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Sort{" "}
            </button>
          </Dropdown>
        </div>
      </div>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};

export default FinancialReportPage