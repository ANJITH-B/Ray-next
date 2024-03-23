import React, { useState } from "react";
import BordedTable from "../../../../CommonComponents/Tables/BorderdTabel";
import avrt from "../../../../Assets/CommonImages/avtr.png";
import flag from "../../../../Assets/CommonImages/flag.svg";

import Pagination from "../../../../CommonComponents/OtherComponent/Pagination";
import { useGetCustomer } from "../../../../Queries/CustomerQuery/CustomerQuery";
import { Dropdown } from "antd";
import BorderdSelect from "../../../../CommonComponents/FormInputs/BorderdSelect";
import { v4 } from "uuid";
import BorderdInput from "../../../../CommonComponents/FormInputs/BorderdInput";
import { useGetAccountGroup } from "../../../../Queries/AccountQuery/AccountQuery";

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
const GroupAccTable = ({ tabIndex }) => {
  const [filter, setFilter] = useState({
    pageNo: 1,
    pageCount: 10,
  });
  const { data, isLoading } = useGetAccountGroup();
  
  const InvoiceColumns = [
    {
      title: "Group name",
      dataIndex: "Group name",
      key: "Group name",
      width: 100,
      className: "text-base font-semibold w-[6rem]",
    },
    {
      title: "Accounts",
      dataIndex: "Accounts",
      key: "Accounts",
      width: 120,

      render: (item, record) => {
        return (
          <div className=" flex gap-2 justify-center ">
            {
              item?.map(e=>{
                return (<p className="px-3 py-1 font-medium text-sm bg-border-gray rounded-lg bg-opacity-70">{e}</p>)
              })
            }
          </div>
        );
      },
    },

    {
      title: "Description",
      key: "Description",
      className: "text-base",
      dataIndex: "Description",
      width: 150,
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
  const invoiceData = data?.data?.data?.map((e) => ({
    "Group name": e.group_name,
    Accounts: e.sub_accounts_names,
    Description:e.description,

    Action: "",
  }));

  //   const invoiceData = data?.data?.data?.data?.map((e) => [
  //     {
  //       Name: e.invoice_id,
  //       "Acc. code": e.issuing_date,
  //       Under: e.customerInfo[0].name,
  //       Email: "Grocery",
  //       "Contact person": "$274.00",
  //       "Contact number": "$828.00",
  //       Address: "$551.00",
  //       Remarks: "$211.00",

  //       Action: "",
  //     },
  //   ]);

  return (
    <div>
      <div className="flex gap-2 items-center w-full justify-between mb-6">
        <Filter setFilter={setFilter} tabIndex={tabIndex} />
        {/* <div className="flex items-center gap-2">
          {filter?.map((e, index) => {
            if (e.value !== undefined) {
              return (
                <div
                  key={v4()}
                  className="px-6 py-3 gap-2 bg-light-gray rounded-full flex "
                >
                  <p className="text-gray ">{e.label}:</p>
                  <p className="text-base ">{e.value}</p>
                  <button
                    onClick={() => {
                      setFilter(
                        filter?.filter((e, i) => {
                          return i != index;
                        })
                      );
                    }}
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.60657 8.67654L8.67763 1.60547M8.67763 8.67654L1.60657 1.60547"
                        stroke="#969696"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              );
            }
          })}
        </div> */}
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
      <BordedTable
        loading={isLoading}
        columns={InvoiceColumns}
        data={invoiceData}
      />
      <Pagination setFilter={setFilter} />
    </div>
  );
};

export default GroupAccTable;
