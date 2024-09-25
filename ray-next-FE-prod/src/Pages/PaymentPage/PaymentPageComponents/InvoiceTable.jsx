import React, { useState } from "react";
import BorderdInput from "../../../CommonComponents/FormInputs/BorderdInput";
import BorderdSelect from "../../../CommonComponents/FormInputs/BorderdSelect";
import { v4 } from "uuid";
import { onlyNumbers } from "../../../Utilities/inputRestrictions";
import editsvg from "../../../Assets/CommonImages/edit.svg";
import trash from "../../../Assets/CommonImages/trash.svg";
import BorderLessTable from "../../../CommonComponents/Tables/BorderLessTable";
import { useGetRegularAccount } from "../../../Queries/AccountQuery/AccountQuery";

const InvoiceTable = ({ formik, edit, setEdit, item, setItem, addItem, typeState, setTypeState }) => {
  const { data, isloading } = useGetRegularAccount({ pageNo: 1, pageCount: 100 });
  // const [typeState,setTypeState] = useState("")
  const [addAcc, setAddAcc] = useState(false)
  const accountData = (data?.data?.data ?? [])
    .filter(e => e.account_name !== "Difference in Openning Balance")
    .map(e => ({
      value: e._id,
      label: e.account_name,
    }));

  const updateData = (rowIndex, key, value) => {
    const updatedData = [...item];

    return (updatedData[rowIndex][key] = value);
  };
  const [values, setValues] = useState({ dirty: false, isError: [] });
  const columns = [
    {
      title: "Paid to",
      key: "PaidTo",
      dataIndex: "PaidTo",
      className: "w-[7rem]",
      render: (item, record, index) => {
        return (
          <div className="w-full">
            {edit === index ? (
              <BorderdSelect
                name="drcr"
                showSearch={true}
                items={[
                  { label: "Credit", value: "CR" },
                  { label: "Debit", value: "DR" },
                ]}
                error={
                  !values?.isError?.includes("drcr") && values.dirty
                    ? "Please select Type"
                    : false
                }
                defaultValue={record["drcr"]?.value}
                onChange={(_, i) => {
                  setTypeState(i.value);
                  updateData(index, "drcr", i);
                }}
                placeholder="Type"
              />
            ) : (
              <p>{record["drcr"]?.children}</p>
            )}
          </div>
        );
      },
    },
    {
      title: "Method of Adj",
      key: "MethodOfAdj",
      dataIndex: "MethodOfAdj",
      className: "w-[15rem]",
      render: (item, record, index) => {
        return (
          <div className="w-full">
            {edit === index ? (
              <BorderdSelect
                name="MedhodOfAdj"
                placeholder="MethodOfAdj"
              />
            ) : (
              <p>{record["account_name"]?.children}</p>
            )}
          </div>
        );
      },
    },
    {
      title: "Debit",
      key: "Debit",
      dataIndex: "Debit",
      className: "w-[9rem]",
      render: (item, record, index) => {
        return (
          <div className="maxw">
            {/* {console.log(record)} */}
            {edit === index ? (
              <BorderdInput
                placeholder={"Debit"}
                disabled={typeState === "CR"} // Disable when "Credit" is selected
                error={
                  !values?.isError?.includes("Debit") && values.dirty
                    ? "Please enter Debit"
                    : false
                }
                defaultValue={record["Debit"] !== null ? record["Debit"] : 0}

                onChange={(e) => updateData(index, "Debit", typeState === "CR" ? 0 : e.target.value)}
                onInput={onlyNumbers}
              />
            ) : (
              <p>{record["Debit"]}</p>
            )}
          </div>
        );
      },
    },

  

    // ... (remaining code)

    {
      title: null,
      key: "action",
      dataIndex: "action",
      className: "w-[3rem]",
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
                    setItem(() =>
                      item?.filter((e, i) => {
                        return i !== index;
                      })
                    )
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
                      record["Credit"] === "" ||
                      record["Debit"] === "" ||
                      record["Remarks"] === "" ||
                      record["Type"] === ""
                    ) {
                      return false;
                    } else {
                      if (
                        formik.values.transactions?.filter(
                          (e) => e.index === index
                        ).length > 0
                      ) {
                        formik.setFieldValue("transactions", [
                          ...formik.values.transactions?.filter(
                            (e) => e.index !== index
                          ),
                          {
                            index: index,
                            account_name: record["account_name"].children,
                            account_id: record["account_name"].value,
                            credit: record["Credit"] != null ? Number(record["Credit"]) : 0,
                            debit: record["Debit"] != null ? Number(record["Debit"]) : 0,
                            drcr: record["drcr"]?.value,
                          },
                        ]);
                      } else {
                        formik.setFieldValue("transactions", [
                          ...formik.values.transactions,
                          {
                            index: index,
                            account_name: record["account_name"].children,
                            account_id: record["account_name"].value,
                            credit: record["Credit"] != null ? Number(record["Credit"]) : 0,
                            debit: record["Debit"] != null ? Number(record["Debit"]) : 0,
                            drcr: record["drcr"]?.value,
                          },
                        ]);
                      }
                      setEdit(false);
                      addItem()
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
      <BorderLessTable columns={columns} data={item || []} key={v4()} />
      <BorderLessTable columns={columns} data={item || []} key={v4()} />
    </div>
  );
};

export default InvoiceTable;
