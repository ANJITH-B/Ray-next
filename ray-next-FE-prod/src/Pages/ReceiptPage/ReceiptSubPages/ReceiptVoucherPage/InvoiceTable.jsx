import React, { useEffect, useState } from "react";
import BorderTableLessEditoption from "../../../../CommonComponents/Tables/BorderTableLessEditoption";
import { useGetCustomerInvoice } from "../../../../Queries/SalesQuery/SalesQuery";
import dayjs from "dayjs";
import BorderdInput from "../../../../CommonComponents/FormInputs/BorderdInput";
import { onlyNumbers } from "../../../../Utilities/inputRestrictions";

const InvoiceTable = ({ formik,rif }) => {
  const { data, isLoading, refetch } = useGetCustomerInvoice(formik.values.customer_id);


  useEffect(() => {
    if (formik.values.customer_id) {
      refetch();
    }
  }, [formik.values.customer_id,rif]);


  const handleCheckboxChange = (invoice) => {
    const selectedInvoices = formik.values.receipt_items || [];
    const exists = selectedInvoices.find((item) => item.invoice_id === invoice.Id);

    if (exists) {
      formik.setFieldValue(
        "receipt_items",
        selectedInvoices.filter((item) => item.invoice_id !== invoice.Id)
      );
    } else {
      formik.setFieldValue("receipt_items", [
        ...selectedInvoices,
        { invoice_id: invoice.Id, settled_amount: 0 },
      ]);
    }
  };

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
              type="checkbox"
              checked={formik.values.receipt_items.some((item) => item.invoice_id === record.Id)}
              onChange={() => handleCheckboxChange(record)}
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
      // render: (item, record, index) => {
      //   return (
      //     <div>
      //       <BorderdInput
      //         placeholder={"₹"}
      //         defaultValue={record["Settled Amount"]}
      //         onInput={onlyNumbers}
      //       />

      //     </div>
      //   );
      // },
      // render: (item, record, index) => {
      //   return (
      //     <BorderdInput
      //       placeholder="₹"
      //       value={
      //         formik.values.receipt_items.find((i) => i.invoice_id === record.Id)
      //           ?.settled_amount || ""
      //       }
      //       onChange={(e) => {
      //         const updatedItems = formik.values.receipt_items.map((inv) =>
      //           inv.invoice_id === record.Id
      //             ? { ...inv, settled_amount: Number(e.target.value) }
      //             : inv
      //         );
      //         formik.setFieldValue("receipt_items", updatedItems);
      //       }}
      //       onInput={onlyNumbers}
      //     />
      //   )
      // }

      render: (item, record, index) => {
        const selectedInvoice = formik.values.receipt_items.find(
          (i) => i.invoice_id === record.Id
        );
      
        const settledAmount = selectedInvoice?.settled_amount || 0;
        const pendingAmount = record["Pending Amount"];
      
        return settledAmount <= pendingAmount ? (
          <BorderdInput
            placeholder="₹"
            value={settledAmount}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value <= pendingAmount) {
                const updatedItems = formik.values.receipt_items.map((inv) =>
                  inv.invoice_id === record.Id
                    ? { ...inv, settled_amount: value }
                    : inv
                );
                formik.setFieldValue("receipt_items", updatedItems);
              }
            }}
            onInput={onlyNumbers}
          />
        ) : (
          <span className="text-red-500 text-sm">Amount exceeds pending balance</span>
        );
      }

    },
  ];

  // const invoiceData = data?.data?.data?.map((e) => ({
  //   Id: e?._id,
  //   Invoice: e?.invoice_id,
  //   Date: dayjs(e.issuing_date).format("DD MMM YYYY"),
  //   "Ref No": "-",
  //   Description: "-",
  //   "Amount Due": e?.received_amount,
  //   "Prev Settled": 0,
  //   "Pending Amount": e?.received_amount,
  //   "Settled Amount": "",
  // }));
  const invoiceData = data?.data?.data?.map((e) => ({
    Id: e?._id,
    Invoice: e?.invoice_id,
    Date: dayjs(e.issuing_date).format("DD MMM YYYY"),
    "Ref No": e?.po_number,
    Description: "-",
    "Amount Due": e?.gross_total,
    "Prev Settled": e?.received_amount,
    "Pending Amount": e?.balance_amount,
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
