import React, { useState } from "react";
import BordedTable from "../../../../CommonComponents/Tables/BorderdTabel";
import avrt from "../../../../Assets/CommonImages/avtr.png";
import flag from "../../../../Assets/CommonImages/flag.svg";

import Pagination from "../../../../CommonComponents/OtherComponent/Pagination";
import { useGetCustomer } from "../../../../Queries/CustomerQuery/CustomerQuery";
import { useGetAccountBook } from "../../../../Queries/AccountQuery/AccountQuery";
import dayjs from "dayjs";
import moment from "moment";

const AccountBookTable = ({ filter, setFilter, accountData }) => {
  const acc = accountData?.filter(x=>x.value === filter.account)
  const storedDate = JSON.parse(localStorage.getItem('accstartdate')) ?? false
  const isDate = storedDate ? moment(storedDate) : null;
  const { data: bookData, isLoading } = useGetAccountBook(filter);
  const InvoiceColumns = [
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
      className: "text-base w-[10rem]",
      width: 200,
      render: (item, record) => {
        return acc?.[0]?.label === 'Difference in Openning Balance' ? isDate?.format('DD-MM-YYYY') : item
      },
    },
    // {
    //   title: "Particular",
    //   dataIndex: "Particular",
    //   key: "Particular",
    //   width: 100,
    //   className: "text-base font-semibold w-[6rem]",
    // },
    {
      title: "Discription",
      dataIndex: "Discription",
      key: "Discription",
      width: 120,
    },
    {
      title: "Voucher Type",
      key: "Voucher Type",
      className: "text-base",
      dataIndex: "Voucher Type",
      width: 170,
      render: (item, record) => {
        return (
          <div className="flex justify-center ">
            <p className={`py-1 px-3 bg-[#12B13F] bg-opacity-20 text-xs font-medium text-[#12B13F] rounded-xl`}>{item}</p>
          </div>
        );
      },
    },
    {
      title: "Debit",
      key: "Debit",
      className: "text-base",
      dataIndex: "Debit",
      width: 150,
    },
    {
      title: "Credit",
      key: "Credit",
      className: "text-base",
      dataIndex: "Credit",
      width: 150,
    },
    {
      title: "Openning Balance",
      className: "text-base",
      key: "Openning Balance",
      dataIndex: "OpeningBalance",
      width: 150,
    },
    {
      title: "Current Balance",
      className: "text-base",
      key: "Balance",
      dataIndex: "Balance",
      width: 150,
    },
  ];
 
  const invoiceData = bookData?.data?.data?.map((e, index, array) => {
    let openingBalance = 0;
    for (let i = index - 1; i >= 0; i--) {
      if (dayjs(array[i].date).isBefore(dayjs(e.date), 'day')) {
        openingBalance = array[i].balance;
        break;
      }
    }
    return {
      Date: dayjs(e.date).format('DD-MMM-YYYY'),
      Description: e.description !== '' ? e.description : '-',
      "Voucher Type": e.voucher_type,
      Debit: e.debit,
      Credit: e.credit,
      OpeningBalance: openingBalance,
      Balance: e.balance,
      Action: "",
    };
  });
  
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
      <div>

      <Pagination setFilter={setFilter} filter={filter} />
      </div>
    </div>
  );
};

export default AccountBookTable;
