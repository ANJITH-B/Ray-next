import React, { useState } from "react";
import BorderdInput from "../../../../CommonComponents/FormInputs/BorderdInput";
import BorderdSelect from "../../../../CommonComponents/FormInputs/BorderdSelect";
import { v4 } from "uuid";
import { onlyNumbers } from "../../../../Utilities/inputRestrictions";
import editsvg from "../../../../Assets/CommonImages/edit.svg";
import trash from "../../../../Assets/CommonImages/trash.svg";
import BorderLessTable from "../../../../CommonComponents/Tables/BorderLessTable";
import InventorySearch from "../../../../CommonComponents/OtherComponent/InventorySearch";

const ReturnTable = ({ formik, edit, setEdit, item, setItem }) => {
  const updateData = (rowIndex, key, value) => {
    const updatedData = [...item];
    return (updatedData[rowIndex][key] = value);
  };
  const [select, setSelected] = useState(false);

  const [values, setValues] = useState({ dirty: false, isError: [] });
  const columns = [
    {
      title: "Sl no.",
      dataIndex: "Sl no.",
      key: "Sl no.",
      className: "w-[2rem] text-base",
    },
    {
      title: "Item code",
      dataIndex: "Item code",
      key: "Item code",

      render: (item, record, index) => {
        return (
          <div className="w-[10rem]">
          {edit === index ? (
            <InventorySearch
              placeholder={"Item code"}
              defaultValue={record["item_code"]}
              error={
                !values?.isError?.includes("item_code") && values.dirty
                  ? "Please enter item code"
                  : false
              }
              onChange={(e) => {
                setSelected(e);
                updateData(index, "item_code", e.item_code);
              }}
            />
          ) : (
            <p className="text-gray">{record["item_code"]}</p>
          )}
        </div>
        );
      },
    },
    {
      title: "Item description",
      dataIndex: "Item description",
      key: "Item description",
      className: "w-[12rem]",
      render: (item, record, index) => {
        return (
          <div>
            {edit === index ? (
              <div className="min-w-full">
                <BorderdInput
                  placeholder={"Item description"}
                  defaultValue={
                    select?.description || record["Item description"]
                  }                  onChange={(e) =>
                    updateData(index, "Item description", e.target.value)
                  }
                  error={
                    !values?.isError?.includes("Item description") &&
                    values.dirty
                      ? "Please enter item description"
                      : false
                  }
                />
              </div>
            ) : (
              <p className="font-bold line-clamp-2 max-w-[14rem]">
                {record["Item description"]}
              </p>
            )}
          </div>
        );
      },
    },
    {
      title: "Remarks",
      key: "Remarks",
      dataIndex: "Remarks",
      className: "w-[7rem]",

      render: (item, record, index) => {
        return (
          <div>
            {edit === index ? (
              <BorderdInput
                name="remarks"
                placeholder={"Remarks"}
                defaultValue={record["Remarks"]}
                error={
                  !values?.isError?.includes("Remarks") && values.dirty
                    ? "Please enter Remarks"
                    : false
                }
                onChange={(e) => updateData(index, "Remarks", e.target.value)}
              />
            ) : (
              <p>{record["Remarks"]}</p>
            )}
          </div>
        );
      },
    },
    {
      title: "Units",
      key: "Units",
      dataIndex: "Units",
      className: "w-[8rem]",
      render: (item, record, index) => {
        return (
          <div className="w-full">
            {edit === index ? (
              <BorderdSelect
                name="units"
                items={[{ label: "Set" }, { label: "Piece" }]}

                error={
                  !values?.isError?.includes("units") && values.dirty
                    ? "Please select units"
                    : false
                }
                defaultValue={record["units"]}
                onChange={(e) => updateData(index, "units", e)}
                placeholder="Units"
              />
            ) : (
              <p
                className={`px-2 py-2 max-w-[4rem] text-center rounded-full  ${
                  record["Units"] === "Piece"
                    ? "text-[#D7A21B] bg-[#D7A21B] bg-opacity-20"
                    : "" || record["Units"] === "Set"
                    ? "text-[#7E27D4] bg-[#7E27D4] bg-opacity-20"
                    : ""
                } font-semibold`}
              >
                {record["units"]}
              </p>
            )}
          </div>
        );
      },
    },
    {
      title: "Quantity",
      key: "Quantity",
      dataIndex: "Quantity",
      render: (item, record, index) => {
        return (
          <div className="maxw">
            {edit === index ? (
              <BorderdInput
                placeholder={"Qty"}
                error={
                  !values?.isError?.includes("Qty") && values.dirty
                    ? "Please enter Quantity"
                    : false
                }
                defaultValue={record["Qty"]}
                
                onChange={(e) => updateData(index, "Qty", e.target.value)}
                onInput={onlyNumbers}
              />
            ) : (
              <p>{record["Qty"]}</p>
            )}
          </div>
        );
      },
    },
    {
      title: "Rate",
      key: "Rate",
      dataIndex: "Rate",
      className: "w-[6rem]",

      render: (item, record, index) => {
        return (
          <div className="maxw">
            {edit === index ? (
              <BorderdInput
              error={
                !values?.isError?.includes("Rate") && values.dirty
                  ? "Please enter Rate"
                  : false
              }
                placeholder={"Rate"}
                defaultValue={record["Rate"]}
                onChange={(e) => updateData(index, "Rate", e.target.value)}
                onInput={onlyNumbers}
              />
            ) : (
              <p>{record["Rate"]}</p>
            )}
          </div>
        );
      },
    },
    {
      title: "Gross amount",
      key: "Gross amount",
      dataIndex: "Gross amount",
      className: "w-[8rem]",
      render: (item, record, index) => {
        return (
          <div className="maxw">
            {edit === index ? (
              <BorderdInput
                placeholder={"Gross amount"}
                error={
                  !values?.isError?.includes("Gross amount") && values.dirty
                    ? "Please enter Gross amount"
                    : false
                }
                defaultValue={record["Gross amount"]}
                onChange={(e) =>
                  updateData(index, "Gross amount", e.target.value)
                }
                onInput={onlyNumbers}
              />
            ) : (
              <p>{record["Gross amount"]}</p>
            )}
          </div>
        );
      },
    },
    {
      title: "Discount %",
      key: "Discount %",
      dataIndex: "Discount %",
      render: (item, record, index) => {
        return (
          <div className="maxw">
            {edit === index ? (
              <BorderdInput
                placeholder={"Discount %"}
                error={
                  !values?.isError?.includes("Discount %") && values.dirty
                    ? "Please enter Discount %"
                    : false
                }
                defaultValue={record["Discount %"]}
                onChange={(e) =>
                  updateData(index, "Discount %", e.target.value)
                }
                onInput={onlyNumbers}
              />
            ) : (
              <p>{record["Discount %"]}</p>
            )}
          </div>
        );
      },
    },
    {
      title: "Discount",
      key: "Discount",
      dataIndex: "Discount",
      render: (item, record, index) => {
        return (
          <div className="maxw">
            <p>{(record["Discount %"] / 100) * record["Gross amount"]}</p>
          </div>
        );
      },
    },
    {
      title: "Net amount",
      key: "Net amount",
      dataIndex: "Net amount",
      render: (item, record, index) => {
        return (
          <div className="maxw">
            <p>
              {Number(record["Gross amount"] - ( Number(record["Discount %"]) / 100) * record["Gross amount"] )}
            </p>
          </div>
        );
      },
    },
    {
      title: null,
      key: "action",
      dataIndex: "action",
      render: (_, record, index) => {
        return (
          <div className="min-w-[5rem]">
            {edit !== index ? (
              <div className="flex items-center gap-5">
                <button className="" onClick={() => setEdit(index)}>
                  <img src={editsvg} alt="edit" />
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
                  <img src={trash} alt="trash" />
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
                      record["item_code"] === "" ||
                      record["Item description"] === "" ||
                      record["Remarks"] === "" ||
                      record["units"] === "" ||
                      record["Qty"] === "" ||
                      record["Rate"] === "" ||
                      record["Gross amount"] === "" ||
                      record["Discount %"] === ""
                    ) {
                     return false
                    } else {
                      if (
                        formik.values.purchase_return_items?.filter(
                          (e) => e.index === index
                        ).length > 0
                      ) {
                        formik.setFieldValue("purchase_return_items", [
                          ...formik.values.purchase_return_items?.filter(
                            (e) => e.index !== index
                          ),
                          {
                            index: index,
                            item_code: record["item_code"],
                            description: record["Item description"],
                            remarks: record["Remarks"],
                            units: record["units"],
                            quantity: record["Qty"],
                            rate: record["Rate"],
                            gross_amount: record["Gross amount"],
                            discount_percentage: record["Discount %"],
                            discount_amount:
                              (record["Discount %"] / 100) *
                              record["Gross amount"],
                            net_amount:
                              Number(record["Gross amount"] - ( Number(record["Discount %"]) / 100) * record["Gross amount"] ),
                          },
                        ]);
                      } else {
                        formik.setFieldValue("purchase_return_items", [
                          ...formik.values.purchase_return_items,
                          {
                            index: index,
                            item_code: record["item_code"],
                            description: record["Item description"],
                            remarks: record["Remarks"],
                            units: record["units"],
                            quantity: record["Qty"],
                            rate: record["Rate"],
                            gross_amount: record["Gross amount"],
                            discount_percentage: record["Discount %"],
                            discount_amount:
                              (record["Discount %"] / 100) *
                              record["Gross amount"],
                            net_amount:
                            Number(record["Gross amount"] - ( Number(record["Discount %"]) / 100) * record["Gross amount"] ),
                          },
                        ]);
                      }
                      setEdit(false);
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
    </div>
  );
};

export default ReturnTable;
