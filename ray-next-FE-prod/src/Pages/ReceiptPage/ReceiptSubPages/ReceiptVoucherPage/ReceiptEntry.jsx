import React, { useCallback, useEffect, useRef, useState } from "react";
import AllHeadSection from "../../../../CommonComponents/OtherComponent/AllHeadSection";
import IssueCard from "../../../../CommonComponents/OtherComponent/IssueCard";
import IssuerCard from "../../../../CommonComponents/OtherComponent/IssuerCard";
import wise from "../../../../Assets/CommonImages/Wise.svg";
import DetialsContainer from "../../../../CommonComponents/OtherComponent/DetialsContainer";
import BorderlessSelect from "../../../../CommonComponents/FormInputs/BorderlessSelect";
import BorderLessInput from "../../../../CommonComponents/FormInputs/BorderLessInput";

import printer from "../../../../Assets/CommonImages/printer.svg";
import BorderdInput from "../../../../CommonComponents/FormInputs/BorderdInput";
import * as Yup from "yup";

import AdditionalDetialsModal from "../../../../CommonComponents/OtherComponent/AdditionalDetialsModal";
import OtherChargesModal from "../../../../CommonComponents/OtherComponent/OtherChargesModal";
import SettilemantModal from "../../../../CommonComponents/OtherComponent/SettilemantModal";
import { useAddInvoice } from "../../../../Queries/SalesQuery/SalesQuery";
import LoadingSpinner from "../../../../CommonComponents/UtilComponent/LoadingSpinner";
import { toast } from "react-hot-toast";
import { onlyNumbers } from "../../../../Utilities/inputRestrictions";
import { useFormik } from "formik";
import InvoiceTable from "./InvoiceTable";
import { useGetID } from "../../../../Queries/OtherQuery/OtherQuery";
import { Tooltip } from "antd";

const invoiceValidation = () => {
  return Yup.object().shape({
    payment_type: Yup.string().required("Payment type is required"),
    customer_id: Yup.string().required("Please select customer"),
    sales_invoice_items: Yup.array()
      .length(1, "Item mst have one item")
      .required("Invoice items ID is required"),
    discount_percentage_other: Yup.string().required(
      "Other discount percentage is required"
    ),
  });
};

const ReceiptEntry = () => {
  const [edit, setEdit] = useState(false);
  const [additionOpen, setAdditionOpen] = useState(false);
  const [otherCharges, setOtherCharges] = useState(false);
  const [settilment, setSettilement] = useState(false);
  const [item, setItem] = useState([]);
  const { data: id, refetch } = useGetID({
    section: "sales",
    module: "invoice",
  });
  const initialValues = useCallback(
    {
      invoice_id: id?.data?.data?.invoice_id,
      issuing_date: Date.now(),
      customer_id: "",
      discount_percentage_other: "",
      discount_amount_other: "",
      round_off: "",
      gross_total: "",
      payment_type: "",
      po_number: "",
      source: "",
      description: "",
      additional_details: "",
      credit_point: "",
      address: "",
      notes: "",
      other_discount_percentage: "",
      other_discount_amount: "",
      account: "",
      method: "",
      description_other: "",
      amount: "",
      narration: "",
      settlements: "",
      new_reference: "",
      payment_terms: "",
      summary: "",
      recived: "",
      balance: "",

      sales_invoice_items: [],
    },
    [id]
  );
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: invoiceValidation,
  });
  const addItem = () => {
    setItem((prev) => [
      ...prev,
      {
        "Sl no.": 0 + prev.length + 1,
        "Item code": "",
        "Item description": "",
        Remarks: "",
        Units: "",
        Quantity: "",
        Rate: "",
        "Gross amount": "",
        "Discount %": "",
        Discount: "",
        "Net amount": "",
        action: "",
      },
    ]);
    setEdit(item?.length);
  };
  const totalAmount = formik?.values?.sales_invoice_items
    ?.map((e) => e.net_amount)
    .filter((e) => e !== undefined)
    .reduce((a, b) => a + b, 0);

  const { mutateAsync: addInvoice, isLoading } = useAddInvoice();
  const [clear, setClear] = useState(false);

  useEffect(() => {
    if (clear) {
      refetch().then((res) => {
        setClear(false);
        setItem([]);
      });
    }
  }, [clear]);

  const handleSubmit = () => {
    const data = {
      invoice_id: formik.values.invoice_id,
      issuing_date: formik.values.issuing_date,
      customer_id: formik.values.customer_id,
      discount_percentage: formik.values.discount_percentage_other,
      discount_amount:
        (formik.values.discount_percentage_other / 100) * totalAmount,
      round_off: 0,
      gross_total: (
        totalAmount -
        (formik.values.discount_percentage_other / 100) * totalAmount
      ).toFixed(0),

      net_amount: formik.values?.sales_invoice_items
        .map((e) => {
          return e.net_amount;
        })
        ?.reduce((e, i) => {
          return e + i;
        }, 0),
      payment_type: formik.values.payment_type || null,
      po_number: formik.values.po_number,
      source: "String",
      description: "String",
      additional_details: "String",
      other_details: {
        other_discount_percentage: formik.values.other_discount_percentage,
        other_discount_amount: formik.values.other_discount_percentage,
        other_charges: {
          account: "String",
          method: "String",
          description: "String",
          amount: formik.values.amount,
        },
        narration: "String",
        ref_settlements: {
          settlements: "String",
          new_reference: "String",
        },
        payment_terms: "String",
      },
      summary: "String",
      sales_invoice_items: formik.values.sales_invoice_items,
    };

    addInvoice(data)
      .then((res) => {
        if (res.status === 500) {
          toast.error("Something went wrong");
        }
        toast.success("invoice created");
        formik.resetForm();
        setClear(true);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="">
      <div className="py-8 px-6 max-w-[1512px]   h-auto m-auto">
        <div>
          <AllHeadSection
            // id={id?.data?.data?.invoice_id}
            id={"VR01"}
            formik={formik}
            head={"Voucher Receipt"}
            name={"invoice_id"}
          />
          <div className="flex gap-6 2xl:gap-8 mb-8">
            <div className="flex-[.6] ">
              <IssueCard />
            </div>
            <div className=" flex-[.6]">
              <IssuerCard clear={clear} formik={formik} />
            </div>
            <div className="flex-1">
              <DetialsContainer color={"bg-reciept-color"}>
                <div className="w-full">
                  <div className="w-full flex items-center justify-between gap-2 mb-2">
                    <h2 className=" text-base 2xl:text-lg font-semibold">
                      Receipt details
                    </h2>
                    <img src={wise} alt="" />
                  </div>

                  <div className="flex gap-4 2xl:gap-12">
                    <div className="flex flex-col gap-2 h-full justify-between ">
                      <div className="flex items-center gap-1">
                        <div className="text-sm 2xl:text-base whitespace-nowrap">
                          Reference number:{" "}
                        </div>
                        <div className="max-w-[5rem] ml-2">
                          <BorderLessInput
                            onInput={onlyNumbers}
                            placeholder="Enter ref"
                            onChange={formik.handleChange}
                            name="ref_number"
                            value={formik.values.ref_number}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className=" text-sm 2xl:text-base whitespace-nowrap">
                          Account type:
                        </div>
                        <div className="w-[9rem]">
                          <BorderlessSelect
                            placeholder="Select Type"
                            error={formik.errors.payment_type}
                            options={[
                              { value: "DEBIT_CARD", label: "Debit card" },
                              { value: "CREDIT_CARD", label: "Credit card" },
                              { value: "CASH", label: "Cash" },
                              { value: "CREDIT", label: "Credit" },
                              { value: "PETTY_CASH", label: "Petty cash" },
                            ]}
                            onChange={(e) =>
                              formik.setFieldValue("payment_type", e)
                            }
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <div
                          className="text-sm 2xl:text-base whitespace-nowrap"
                          whitespace-nowrap
                        >
                          Description:
                        </div>
                        <div className="max-w-[8rem] ml-3">
                          <BorderLessInput
                            onInput={onlyNumbers}
                            onChange={formik.handleChange}
                            name="description"
                            value={formik.values.description}
                            placeholder="Enter description"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col h-full justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <div
                          className="text-sm 2xl:text-base whitespace-nowrap"
                          whitespace-nowrap
                        >
                          Amount:
                        </div>
                        <div className="max-w-[8rem] ml-3">
                          <BorderLessInput placeholder="Enter Amount" />
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="text-sm 2xl:text-base whitespace-nowrap">
                          Method of Adj:
                        </div>
                        <div className="max-w-[12rem] ml-3">
                          <BorderLessInput
                            placeholder="Settlement & Reference"
                            value="Settlement & Reference"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DetialsContainer>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <div className="mb-2 flex w-full items-center justify-between">
            <div className=" text-xl 2xl:text-[24px]">
              Settlements & References
            </div>
          </div>
          <InvoiceTable
            edit={edit}
            formik={formik}
            item={item}
            setEdit={setEdit}
            setItem={setItem}
            clear={clear}
          />
        </div>
      </div>
      <div className="border-t-[.5px] px-8 py-6 sticky bottom-0 h-[116px]  border-border-gray w-full bg-white">
        <div className="flex items-center justify-between w-full">
          <div className="font-semibold text-sm">Total Selected Items : 2</div>
          <div className="flex items-center justify-between min-w-[50%]">
            <div className="flex items-center gap-8 text-sm 2xl:text-base">
              Total Amount :
              <div className="font-semibold  text-2xl 2xl:text-3xl">$ 239</div>
            </div>
            <div className="flex items-center gap-6">
              <div className="rounded-full flex items-center justify-center min-w-[40px] 2xl:min-w-[56px] min-h-[40px] 2xl:min-h-[56px] bg-light-gray">
                <img src={printer} className="w-5 2xl:w-8" alt="printer" />
              </div>
              <button
                onClick={() => {
                  formik.setTouched();
                  if (formik.dirty) {
                    handleSubmit();
                  }
                }}
                className="rounded-full flex items-center justify-center w-fit px-8 h-[40px] 2xl:h-[56px] bg-blue"
              >
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <div className="text-white whitespace-nowrap 2xl:text-lg text-base">
                    Save & close
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptEntry;
