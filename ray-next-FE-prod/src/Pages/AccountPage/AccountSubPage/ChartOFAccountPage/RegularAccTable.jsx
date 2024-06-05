import React, { useState } from "react";
import BordedTable from "../../../../CommonComponents/Tables/BorderdTabel";
import editsvg from "../../../../Assets/CommonImages/edit.svg";
import Pagination from "../../../../CommonComponents/OtherComponent/Pagination";
import { Dropdown } from "antd";
import BorderdSelect from "../../../../CommonComponents/FormInputs/BorderdSelect";
import BorderdInput from "../../../../CommonComponents/FormInputs/BorderdInput";
import { useGetRegularAccount } from "../../../../Queries/AccountQuery/AccountQuery";
import { colorCode } from "../../../../HelperFunctions/colorCodes";
import RegularAccountModal from "../../AccountPageComponents/RegularAccountModal";

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
const RegularAccTable = ({ tabIndex }) => {
  const [edit, setEdit] = useState(false);
  const [filter, setFilter] = useState({
    pageNo: 1,
    pageCount: 10,
  });
  const { data, isLoading } = useGetRegularAccount(filter);
  const InvoiceColumns = [
    {
      title: "Account name",
      dataIndex: "Account name",
      key: "Account name",
      width: 100,
      className: "text-base font-semibold w-[6rem]",
    },
    {
      title: "Nature of account",
      dataIndex: "Nature of account",
      key: "Nature of account",
      width: 120,

      render: (item, record) => {
        return (
          <div className=" flex justify-center">
            <h1
              className={`px-3 bg-opacity-20 text-xs font-medium rounded-xl py-1 ${colorCode(item)}`}
            >
              {item}
            </h1>
          </div>
        );
      },
    },
    {
      title: "Parent account",
      key: "Parent account",
      className: "text-base",
      dataIndex: "Parent account",
      width: 170,
    },
    {
      title: "Description",
      key: "Description",
      className: "text-base",
      dataIndex: "Description",
      width: 150,
    },
    {
      title: "Opening balance",
      key: "Opening balance",
      className: "text-base",
      dataIndex: "Opening balance",
      width: 150,

     
    },
    {
      title: "Current balance",
      className: "text-base",
      key: "Current balance",
      dataIndex: "Current balance",
      width: 150,
    },
    {
      title: null,
      key: "action",
      dataIndex: "action",
      width: 100,
      render: (text, record, index) => {
        return edit === index ? (
          <button>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.99996 0.666992C4.40829 0.666992 0.666626 4.40866 0.666626 9.00033C0.666626 13.592 4.40829 17.3337 8.99996 17.3337C13.5916 17.3337 17.3333 13.592 17.3333 9.00033C17.3333 4.40866 13.5916 0.666992 8.99996 0.666992ZM12.9833 7.08366L8.25829 11.8087C8.1411 11.9257 7.98225 11.9914 7.81663 11.9914C7.651 11.9914 7.49215 11.9257 7.37496 11.8087L5.01663 9.45033C4.90039 9.33271 4.83521 9.17402 4.83521 9.00866C4.83521 8.8433 4.90039 8.68461 5.01663 8.56699C5.25829 8.32533 5.65829 8.32533 5.89996 8.56699L7.81663 10.4837L12.1 6.20033C12.3416 5.95866 12.7416 5.95866 12.9833 6.20033C13.225 6.44199 13.225 6.83366 12.9833 7.08366Z"
                fill="#4A9CE8"
              />
            </svg>
          </button>
        ) : (
          <button onClick={() => setEdit(index)}>
            <img src={editsvg} alt="edit" className="min-w-[18px]" />
          </button>
        );
      },
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
    "Account name": e.account_name,
    "Nature of account": e?.parent_accounts[0]?.nature_of_account,
    "Parent account": e?.parent_accounts[0]?.account_name,
    Description: e.description,
    "Opening balance": e.opening_balance,
    "Current balance": e.current_balance,

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
      <RegularAccountModal
        open={edit!==false}
        setOpen={setEdit}
        type="Edit"
        accdata={data?.data?.data?.[edit]}
      />   
      <Pagination setFilter={setFilter} filter={filter}/>
    </div>
  );
};

export default RegularAccTable;
