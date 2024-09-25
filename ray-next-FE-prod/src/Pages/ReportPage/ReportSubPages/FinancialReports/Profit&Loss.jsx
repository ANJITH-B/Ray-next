import { Dropdown, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import BorderdInput from "../../../../CommonComponents/FormInputs/BorderdInput";
import BorderdSelect from "../../../../CommonComponents/FormInputs/BorderdSelect";
import { useGetProfitAndLoss } from "../../../../Queries/ReportQuery/ReportQuery";

const Filter = ({ setFilter }) => {
  const [date, setDate] = useState();
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
                  setDate(e);
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

const ProfitLoss = () => {
  const [filter, setFilter] = useState([]);
  const { data = [], isLoading } = useGetProfitAndLoss({
    pageNo: 1,
    pageCount: 100,
  });

  const dataSource = data?.data?.data;
  console.log(dataSource);

  const columns = [
    {
      title: "Expense",
      dataIndex: "expense",
      key: "expense",
      className: "font-bold",
    },
    {
      title: "Amount",
      dataIndex: "exp_amt",
      key: "exp_amt",
      className: "font-bold",
    },
    {
      title: "Income",
      dataIndex: "income",
      key: "income",
      className: "font-bold",
    },
    {
      title: "Amount",
      dataIndex: "inc_amt",
      key: "inc_amt",
      className: "font-bold",
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

  useEffect(() => {
    console.warn(data);
    if (data?.data) {
      console.warn(data?.data?.data);
      const dataSource = data?.data?.data?.map((x) => x.account_details?.[0]);
      console.log(dataSource);
    }
  }, [data]);
  return (
    <div>
      <div className="flex gap-2 items-center w-full justify-between mb-6">
        <Filter setFilter={setFilter} />
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
      <Table
        dataSource={dataSource}
        columns={columns}
        size="middle"
        summary={(data) => {
          const expense = data.reduce(
            (acc = 0, curr) => (acc += curr?.exp_amt ?? 0),
            0
          );
          const income = data.reduce(
            (acc = 0, curr) => (acc += curr?.inc_amt ?? 0),
            0
          );
          return (
            <Table.Summary fixed className="bg-slate-500">
              <Table.Summary.Row>
                <Table.Summary.Cell>Total</Table.Summary.Cell>
                <Table.Summary.Cell>
                  <Typography className="font-bold text-red-500">$ {expense}</Typography>
                </Table.Summary.Cell>
                <Table.Summary.Cell>Total</Table.Summary.Cell>
                <Table.Summary.Cell>
                  <Typography className="font-bold text-dark-green">$ {income}</Typography>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          );
        }}
        pagination={false}
        bordered
        scroll={{ x: "max-content", y: "40vh" }}
        className="text-center"
        loading={isLoading}
      />
    </div>
  );
};

export default ProfitLoss;
