import React, { useState } from "react";
import BorderdInput from "../../../CommonComponents/FormInputs/BorderdInput";
import { v4 } from "uuid";
import { onlyNumbers } from "../../../Utilities/inputRestrictions";
import editsvg from "../../../Assets/CommonImages/edit.svg";
import trash from "../../../Assets/CommonImages/trash.svg";
import BorderLessTable from "../../../CommonComponents/Tables/BorderLessTable";
import toast from "react-hot-toast";

const ProductUnitTable = ({ data, setItem }) => {
  const [editIndex, setEditIndex] = useState(0);
  const editItem = (index) => {
    const { unit, base_unit, n_unit, n_base_unit } = data[editIndex > data?.length - 1 ? data?.length - 1 : editIndex];
    if (unit === "" || unit === undefined || base_unit === "" || base_unit === undefined || n_unit === "" || n_unit === undefined || n_base_unit === "" || n_base_unit === undefined) {
      toast.error("Please fill all the fields");
      return false;
    }
    else {
      setEditIndex(index)
    }
  }

  const addItem = () => {
    if (!data?.length) {
      setItem([{}]);
      setEditIndex(0)
      return
    }
    const { unit, base_unit, n_unit, n_base_unit } = data[editIndex > data?.length - 1 ? data?.length - 1 : editIndex];
    if (unit === "" || unit === undefined || base_unit === "" || base_unit === undefined || n_unit === "" || n_unit === undefined || n_base_unit === "" || n_base_unit === undefined) {
      toast.error("Please fill all the fields");
      return false;
    }
    else {
      setItem([...data, {}]);
      setEditIndex(data.length);
    }
  };

  const updateData = (rowIndex, key, value) => {
    const updatedData = [...data];
    return (updatedData[rowIndex][key] = value);
  };
  const [values, setValues] = useState({ dirty: false, isError: [] });
  const columns = [
    {
      title: "Unit",
      key: "unit",
      dataIndex: "unit",
      className: "w-[9rem]",
      render: (item, record, index) => {
        return (
          <div>
            {editIndex === index ? (
              <BorderdInput
                placeholder={"Unit"}
                error={
                  !values?.isError?.includes("unit") && values.dirty
                    ? "Please enter Unit"
                    : false
                }
                defaultValue={record["unit"] !== null ? record["unit"] : 0}
                onChange={(e) => updateData(index, "unit", e.target.value)}
                onInput={onlyNumbers}
              />
            ) : (
              <p>{record["unit"]}</p>
            )}
          </div>
        );
      },
    },

    {
      title: "Base Unit",
      key: "base_unit",
      dataIndex: "base_unit",
      className: "w-[9rem]",
      render: (item, record, index) => {
        return (
          <div>
            {editIndex === index ? (
              <BorderdInput
                placeholder={"Base Unit"}
                error={
                  !values?.isError?.includes("base_unit") && values.dirty
                    ? "Please enter Base Unit"
                    : false
                }
                defaultValue={record["base_unit"] !== null ? record["base_unit"] : 0}
                onChange={(e) => updateData(index, "base_unit", e.target.value)}
              />
            ) : (
              <p>{record["base_unit"]}</p>
            )}
          </div>
        );
      },
    },

    {
      title: "N Unit",
      key: "n_unit",
      dataIndex: "n_unit",
      className: "w-[9rem]",
      render: (item, record, index) => {
        return (
          <div>
            {editIndex === index ? (
              <BorderdInput
                placeholder={"N Unit"}
                error={
                  !values?.isError?.includes("n_unit") && values.dirty
                    ? "Please enter N Unit"
                    : false
                }
                defaultValue={record["n_unit"] !== null ? record["n_unit"] : 0}
                onChange={(e) => updateData(index, "n_unit", e.target.value)}
                onInput={onlyNumbers}
              />
            ) : (
              <p>{record["n_unit"]}</p>
            )}
          </div>
        );
      },
    },
    {
      title: "Base Unit",
      key: "n_base_unit",
      dataIndex: "n_base_unit",
      className: "w-[9rem]",
      render: (item, record, index) => {
        return (
          <div>
            {editIndex === index ? (
              <BorderdInput
                placeholder={"Base Unit"}
                error={
                  !values?.isError?.includes("n_base_unit") && values.dirty
                    ? "Please enter Base Unit"
                    : false
                }
                defaultValue={record["n_base_unit"]}
                onChange={(e) => updateData(index, "n_base_unit", e.target.value)}
              />
            ) : (
              <p>{record["n_base_unit"]}</p>
            )}
          </div>
        );
      },
    },

    {
      title: null,
      key: "action",
      dataIndex: "action",
      className: "w-[3rem]",
      render: (item, record, index) => {
        return (
          <div>
            {editIndex !== index ? (
              <div className="flex items-center gap-5">
                <button className="" onClick={() => editItem(index)}>
                  <img src={editsvg} alt="edit" className="min-w-[18px]" />
                </button>
                <button
                  onClick={() =>
                    setItem(() =>
                      data?.filter((e, i) => {
                        return i !== index;
                      })
                    )
                  }
                >
                  <img src={trash} className="min-w-[18px]" alt="trash" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-5">
                <button
                  className=""
                  onClick={() => {
                    const { unit, base_unit, n_unit, n_base_unit } = record;
                    if (unit === "" || unit === undefined || base_unit === "" || base_unit === undefined || n_unit === "" || n_unit === undefined || n_base_unit === "" || n_base_unit === undefined) {
                      toast.error("Please fill all the fields");
                      return false;
                    } else {
                      setEditIndex(null);
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
                <button
                  onClick={() =>
                    setItem(() =>
                      data?.filter((e, i) => {
                        return i !== index;
                      })
                    )
                  }
                >
                  <img src={trash} className="min-w-[18px]" alt="trash" />
                </button>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex w-full items-center justify-between pt-8">
        <p className=" text-xl 2xl:text-[24px] font-semibold">Items</p>
        <button
          onClick={() => addItem()}
          className=" px-4 2xl:px-6 py-2 2xl:py-3 text-sm 2xl:text-base rounded-full border hover:bg-light-gray transition-all"
        >
          Add Items
        </button>
      </div>
      <BorderLessTable columns={columns} data={data || []} key={v4()} />
    </>
  );
};

export default ProductUnitTable;
