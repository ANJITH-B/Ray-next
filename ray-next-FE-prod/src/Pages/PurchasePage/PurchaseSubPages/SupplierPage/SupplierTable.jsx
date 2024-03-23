import React, { useState } from "react";
import BordedTable from "../../../../CommonComponents/Tables/BorderdTabel";
import avrt from "../../../../Assets/CommonImages/avtr.png";
import flag from "../../../../Assets/CommonImages/flag.svg";


import Pagination from "../../../../CommonComponents/OtherComponent/Pagination";
import { useGetSupplier } from "../../../../Queries/PurchaseQuery/PurchaseQuery";
const SupplierTable = () => {
  const [filter, setFilter] = useState({
    pageNo: 1,
    pageCount: 10,
  });
  const { data, isLoading } = useGetSupplier(filter);
  const InvoiceColumns = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      className: "text-base",
      width: 200,
      render: (item, record) => {
        return (
          <div className="flex items-center justify-center gap-2 ">
            <div className="w-[40px] h-[40px]">
              <img src={avrt} alt="" />
            </div>
            <div className="flex gap-1 items-start flex-col">
              <h1 className="text-base font-medium">{item?.name}</h1>
              <p className="text-[13px] text-dark-green">{item?.relation}</p>
            </div>
          </div>
        );
      },
    },
    {
      title: "Acc. code",
      dataIndex: "Acc. code",
      key: "Acc. code",
      width: 100,
      className: "text-base font-semibold" ,
    },
    {
      title: "Under",
      dataIndex: "Under",
      key: "Under",
      className: "w-[10rem]",
      width: 120,
      render: (item, record) => {
        return (
          <div className=" ">
           <h1>{item}</h1>
           {/* <p className="text-gray text-sm">Trade account</p> */}
          </div>
        );
      },
    },
    {
      title: "Email",
      key: "Email",
      className: "text-base",
      dataIndex: "Email",
      width: 170

    },
    {
      title: "Contact person",
      key: "Contact person",
      className: "text-base",
      dataIndex: "Contact person",
      width:150
    },
    {
      title: "Contact number",
      key: "Contact number",
      className: "text-base",
      dataIndex: "Contact number",
      width:150,
      render: (item, record) => {
        return (
          <div className=" flex items-center gap-2">
           <img src={flag} alt="" />
           <p >{item}</p>
          </div>
        );
      },
    },
    {
      title: "Address",
      className: "text-base",
      key: "Address",
      dataIndex: "Address",
      className:'text-gray',
      width:150
    },
    {
      title: "Remarks",
      key: "Remarks",
      className: "text-base",
      dataIndex: "Remarks",
      width: 100,
    },

    {
      title: "",
      key: "Action",
      dataIndex: "Action",
      width: 20,
    },
  ];

  const invoiceData = data?.data?.data?.data?.map((e) => ({
    Name: {name:e?.name,relation:e?.supplier_relation},
    "Acc. code": e.account_code,
    Under: e.under_group ,
    Email: e.contact_details.email,
    "Contact person": e?.contact_details?.contact_person,
    "Contact number": e.contact_details.contact_number,
    Address: e?.office_details?.address,
    Remarks: "",

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
      <BordedTable
        loading={isLoading}
        columns={InvoiceColumns}
        data={invoiceData}
      />
      <Pagination setFilter={setFilter} />
    </div>
  );
};

export default SupplierTable;
