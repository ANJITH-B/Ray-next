import React, { useState } from "react";
import avrt from "../../../../Assets/CommonImages/avtr.png";
import { useGetOrder } from "../../../../Queries/SalesQuery/SalesQuery";
import Pagination from "../../../../CommonComponents/OtherComponent/Pagination";
import BordedTable from "../../../../CommonComponents/Tables/BorderdTabel";
import dayjs from "dayjs";
import { useGetPurchaseOrder } from "../../../../Queries/PurchaseQuery/PurchaseQuery";
const OrderTable = () => {
  const [filter, setFilter] = useState({
    pageNo: 1,
    pageCount: 10,
  });
  const { data, isLoading } = useGetPurchaseOrder(filter);
  const InvoiceColumns = [
    {
      title: "Order",
      dataIndex: "Order",
      key: "Order",
      className: "text-base",
      width: 110,
    },
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
      width: 120,
      className: "text-base",
    },
    {
      title: "Customer",
      dataIndex: "Customer",
      key: "Customer",
      className: "w-[10rem]",
      width: 220,
      render: (item, record) => {
        return (
          <div className="flex justify-center items-center gap-2 ">
            <div className="w-[40px] h-[40px]">
              <img src={avrt} alt="" />
            </div>
            <div className="flex gap-1 flex-col">
              <h1 className="text-base font-medium">{item?.name}</h1>
              <p className="text-[13px] text-dark-green">{item?.relation}</p>
            </div>
          </div>
        );
      },
    },
    {
      title: "Particulars",
      key: "Particulars",
      className: "text-base",
      dataIndex: "Particulars",
    },
    {
      title: "Gross Amt",
      key: "Gross Amt",
      className: "text-base",
      dataIndex: "Gross Amt",
    },
    {
      title: "Discount",
      key: "Discount",
      className: "text-base",
      dataIndex: "Discount",
    },
    {
      title: "Net Amt",
      className: "text-base",
      key: "Net Amt",
      dataIndex: "Net Amt",
    },
    // {
    //   title: "Received",
    //   key: "Received",
    //   className: "text-base",
    //   dataIndex: "Received",
    // },
    {
      title: "Balance",
      key: "Balance",
      className: "text-base font-semibold",
      dataIndex: "Balance",
    },
    // {
    //   title: "Due date",
    //   key: "Due date",
    //   className: "text-base",
    //   dataIndex: "Due date",
    //   width: 130,
    // },
    // {
    //   title: "Due",
    //   key: "Due",
    //   className: "text-base",
    //   dataIndex: "Due",
    // },
    // {
    //   title: "Settled in",
    //   key: "Settled in",
    //   className: "text-base",
    //   dataIndex: "Settled in",
    // },
    {
      title: "",
      key: "Action",
      dataIndex: "Action",
      width: 20,
    },
  ];

  const invoiceData = data?.data?.data?.data?.map((e) => ({
    Order: e?.purchase_order_id,
    Date: dayjs(e?.issuing_date).format("DD MMM YYYY"),
    Customer: {
      name: e?.supplierInfo?.name,
      relation: e?.supplierInfo?.cutomer_relation,
    },
   Particulars: e.particular ? e?.particular : "-",
    "Gross Amt": e?.summary?.gross_total,

    Discount: "$" + e?.summary?.discount_amount?.toFixed(1),
    "Net Amt":
      "$" + e?.summary?.net_amount !== undefined ? e?.summary?.net_amount : "0",
    // Received: "-",
    Balance: e?.balance_amount,
    // "Due date": '-' ,
    // Due: "-",
    // "Settled in": "- ",
    Action: "",
  }));

  return (
    <div>
      <BordedTable
        loading={isLoading}
        columns={InvoiceColumns}
        data={invoiceData}
      />
      <Pagination setFilter={setFilter} filter={filter} />
    </div>
  );
};

export default OrderTable;
