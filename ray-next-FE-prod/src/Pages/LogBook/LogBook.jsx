import React, { useEffect, useState } from "react";
import printer from "../../Assets/CommonImages/printer.svg";
import excel from "../../Assets/CommonImages/excel.svg";
import { Dropdown } from "antd";
import BorderdSelect from "../../CommonComponents/FormInputs/BorderdSelect";
import BorderdInput from "../../CommonComponents/FormInputs/BorderdInput";
import { v4 } from "uuid";

import LogBook from "./LogBookTable";
import { BordedDateRangePicker } from "../../CommonComponents/FormInputs/BordedDateRangePicker";
import dayjs from "dayjs";
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

const AccountBookPage = () => {
  const accstartdate = JSON.parse(localStorage.getItem("accstartdate"));
  const date = JSON.parse(localStorage.getItem("peroid_date")) ?? [
    accstartdate,
    dayjs().toISOString(),
  ];
  const [filter, setFilter] = useState({
    pageNo: 1,
    pageCount: 10,
    date,
  });
  const [pageFilter, setPageFilter] = useState([]);
  const [tabIndex, setTabIndex] = useState("1");


  const handleChange = (e) => {
    console.log(e);
    const date = JSON.stringify(e);
    setFilter((pre) => ({
      ...pre,
      date: JSON.parse(date),
    }));
  };
  useEffect(() => {
    setPageFilter([]);
  }, [tabIndex]);

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

  return (
    <div className="p-8 max-w-[1512px]   h-auto m-auto">
      <div className="flex items-center justify-between w-full mb-4">
        <div>
          <h1 className="text-2xl 2xl:text-3xl font-semibold mb-4">
          Log Books
          </h1>
          <p className="text-gray 2xl:text-base text-sm">
            Manage and monitor log book list
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <BordedDateRangePicker onChange={handleChange} />
            </div>
          </div>

          <div className="w-[1px] h-[56px] mx-3 bg-border-gray"></div>
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
        <div className="flex items-center w-full justify-between mb-6">
          <div className="flex gap-2 items-center">
            <Filter setFilter={setFilter} tabIndex={tabIndex} />
            <div className="flex items-center gap-2">
              {pageFilter?.map((e, index) => {
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
            </div>
          </div>
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
        <div>
          <LogBook
            filter={filter}
            setFilter={setFilter}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountBookPage;
