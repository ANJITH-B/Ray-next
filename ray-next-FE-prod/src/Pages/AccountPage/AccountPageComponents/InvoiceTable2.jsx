import React, { useState } from "react";
import BorderdInput from "../../../CommonComponents/FormInputs/BorderdInput";
import BorderdSelect from "../../../CommonComponents/FormInputs/BorderdSelect";
import { v4 } from "uuid";
import { onlyNumbers } from "../../../Utilities/inputRestrictions";
import editsvg from "../../../Assets/CommonImages/edit.svg";
import trash from "../../../Assets/CommonImages/trash.svg";
import BorderLessTable from "../../../CommonComponents/Tables/BorderLessTable";
import { useGetRegularAccount } from "../../../Queries/AccountQuery/AccountQuery";
import { Table } from "antd";
import { Tooltip } from "antd";
import CerditDebitTable from "../../../CommonComponents/Tables/CerditDebitTable";


const InvoiceTableTwo = ({ formik, edit, setEdit, item, setItem, addItem, typeState, setTypeState }) => {
  const { data, isloading } = useGetRegularAccount();
  const [values, setValues] = useState({ dirty: false, isError: [] });

  const accountData = data?.data?.data?.map((e) => ({
    value: e._id,
    label: e.account_name,
  }));

  const updateData = (rowIndex, key, value) => {
    const updatedData = [...item];
    updatedData[rowIndex][key] = value;
    setItem(updatedData);
  };

  const columns = [
    {
      title: "Account name",
      key: "account_name",
      dataIndex: "account_name",
      // width: "50%",
      className: "w-[15rem]",
      render: (text, record, index) => {
        return (
          <div className=" w-full">
            {edit === index ? (
              <BorderdSelect
                name="account_name"
                showSearch={true}
                items={accountData}
                error={!values?.isError?.includes("account_name") && values.dirty ? "Please select units" : false}
                defaultValue={record["account_name"]?.value}
                onChange={(_, i) => {
                  setTypeState(i.value);
                  updateData(index, "account_name", i);
                }}
                placeholder="Account name"
              />
            ) : (
              <p>{record["account_name"]?.children}</p>
            )}
          </div>
        );
      },
    },
    {
      title: "Amount",
      key: "amount",
      dataIndex: "amount",
      // width: "50%",
      className: "w-[15rem]",
      render: (text, record, index) => {
        return (
          <div className="maxw">
           
            {edit === index ? (
              <BorderdInput
                placeholder={"Amount"}
                error={!values?.isError?.includes("amount") && values.dirty ? "Please enter Amount" : false}
                defaultValue={record["amount"] !== null ? record["amount"] : 0}
                onChange={(e) => updateData(index, "amount", e.target.value)}
                onInput={onlyNumbers}
              />
            ) : (
              <p>{record["amount"]}</p>
            )}
          </div>
        );
      },
    },
    {
      title: null,
      key: "action",
      dataIndex: "action",
      width: "3rem",
      render: (_, record, index) => {
        return (
          <div className="">
            {edit !== index ? (
              <div className="flex items-center gap-5">
                <button className="" onClick={() => setEdit(index)}>
                  <img src={editsvg} alt="edit" className="min-w-[18px]" />
                </button>
                <button
                  onClick={() =>
                    setItem(() => item?.filter((e, i) => i !== index))
                  }
                >
                  <img src={trash} className="min-w-[18px]" alt="trash" />
                </button>
              </div>
            ) : (
              <div>
                <button
                  className=""
                  onClick={() => {
                    setValues((pre) => ({
                      dirty: true,
                      isError: Object.keys(record)?.filter(
                        (e) => record[e] !== ""
                      ),
                    }));
                    if (
                      record["account_name"] === "" ||
                      record["amount"] === ""
                    ) {
                      return false;
                    } else {
                      // Handle form submission
                      setEdit(false);
                      addItem();
                    }
                  }}
                >
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
              </div>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="mb-2 flex w-full items-center justify-between">
              <p className=" text-xl 2xl:text-[24px] font-semibold">Credit</p>

              {/* <button
                onClick={() => addItem()}
                className=" px-4 2xl:px-6 py-2 2xl:py-3 text-sm 2xl:text-base rounded-full border hover:bg-light-gray transition-all"
              // disabled={edit === false ? false : true}
              >
                {formik.errors.transactions ? (
                  <div
                    className={`${formik.errors.transactions
                      ? "pointer-events-auto opacity-100"
                      : "pointer-events-none opacity-0"
                      } cursor-pointer `}
                  >
                    <Tooltip
                      trigger={"hover"}
                      title={formik.errors.transactions}
                      color="white"
                      className="error-tooltip flex items-center gap-2"
                    >
                      Add Items
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 6V9.75M9 16.5C13.125 16.5 16.5 13.125 16.5 9C16.5 4.875 13.125 1.5 9 1.5C4.875 1.5 1.5 4.875 1.5 9C1.5 13.125 4.875 16.5 9 16.5Z"
                          stroke="#F42F2F"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </Tooltip>
                  </div>
                ) : (
                  " Add Items"
                )}
              </button> */}
            </div>
      <CerditDebitTable className="" pagination={false} columns={columns} data={item || []} key={v4()}/>
    </div>
  );
};


export default InvoiceTableTwo;

