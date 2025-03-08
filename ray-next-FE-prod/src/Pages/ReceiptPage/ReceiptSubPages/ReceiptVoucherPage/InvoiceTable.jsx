import React, { useEffect, useState } from "react";
import BorderTableLessEditoption from "../../../../CommonComponents/Tables/BorderTableLessEditoption";
import { useGetInvoice } from "../../../../Queries/SalesQuery/SalesQuery";
import dayjs from "dayjs";
import BorderdInput from "../../../../CommonComponents/FormInputs/BorderdInput";
import { onlyNumbers } from "../../../../Utilities/inputRestrictions";

const InvoiceTable = ({ tabIndex }) => {
  const [filter, setFilter] = useState({
    pageNo: 1,
    pageCount: 100,
  });
  const { data, isLoading, refetch } = useGetInvoice(filter);
  useEffect(() => {
    refetch();
  }, [tabIndex]);
  const InvoiceColumns = [
    {
      title: "",
      dataIndex: "Id",
      key: "Id",
      className: "text-base",
      width: 80,
      render: (item, record) => {
        return (
          <div className="flex justify-center items-center">
            <input
              id="default-checkbox"
              type="checkbox"
              value={item}
              className="w-4 h-4 bg-gray-100 border-gray-300 rounded-lg cursor-pointer"
            />
          </div>
        );
      },
    },
    {
      title: "Invoice",
      dataIndex: "Invoice",
      key: "Invoice",
      className: "text-base",
    },
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
      className: "text-base",
    },
    {
      title: "Ref No",
      dataIndex: "Ref No",
      key: "Ref No",
      className: "text-base",
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      className: "text-base",
    },
    {
      title: "Amount Due",
      key: "Amount Due",
      className: "text-base ",
      dataIndex: "Amount Due",
    },
    {
      title: "Prev Settled",
      key: "Prev Settled",
      className: "text-base ",
      dataIndex: "Prev Settled",
    },
    {
      title: "Pending Amount",
      key: "Pending Amount",
      className: "text-base ",
      dataIndex: "Pending Amount",
    },
    {
      title: "Settled Amount",
      key: "Settled Amount",
      className: "text-base ",
      dataIndex: "Settled Amount",
      render: (item, record, index) => {
        return (
          <div>
            <BorderdInput
              placeholder={"₹"}
              defaultValue={record["Settled Amount"]}
              onInput={onlyNumbers}
            />
          </div>
        );
      },
    },
  ];
  const invoiceData = data?.data?.data?.data?.map((e) => ({
    Id: e?._id,
    Invoice: e?.invoice_id,
    Date: dayjs(e.issuing_date).format("DD MMM YYYY"),
    "Ref No": "-",
    Description: "-",
    "Amount Due": e?.received_amount,
    "Prev Settled": 0,
    "Pending Amount": e?.received_amount,
    "Settled Amount": "",
  }));

  return (
    <div>
      <BorderTableLessEditoption
        loading={isLoading}
        columns={InvoiceColumns}
        data={invoiceData}
      />
    </div>
  );
};

export default InvoiceTable;
