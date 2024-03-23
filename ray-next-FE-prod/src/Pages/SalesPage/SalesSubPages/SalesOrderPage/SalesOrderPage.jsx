import React, { useCallback, useRef, useState } from "react";
import AllHeadSection from "../../../../CommonComponents/OtherComponent/AllHeadSection";
import IssueCard from "../../../../CommonComponents/OtherComponent/IssueCard";
import IssuerCard from "../../../../CommonComponents/OtherComponent/IssuerCard";
import wise from "../../../../Assets/CommonImages/Wise.svg";
import DetialsContainer from "../../../../CommonComponents/OtherComponent/DetialsContainer";
import BorderlessSelect from "../../../../CommonComponents/FormInputs/BorderlessSelect";
import BorderLessInput from "../../../../CommonComponents/FormInputs/BorderLessInput";
import BorderLessFileUpload from "../../../../CommonComponents/FormInputs/BorderLessFileUpload";
import BorderLessTable from "../../../../CommonComponents/Tables/BorderLessTable";
import printer from "../../../../Assets/CommonImages/printer.svg";
import BorderdInput from "../../../../CommonComponents/FormInputs/BorderdInput";

import { v4 } from "uuid";
import AdditionalDetialsModal from "../../../../CommonComponents/OtherComponent/AdditionalDetialsModal";
import OtherChargesModal from "../../../../CommonComponents/OtherComponent/OtherChargesModal";
import SettilemantModal from "../../../../CommonComponents/OtherComponent/SettilemantModal";
import { useAddSalesOrder } from "../../../../Queries/SalesQuery/SalesQuery";
import LoadingSpinner from "../../../../CommonComponents/UtilComponent/LoadingSpinner";
import { toast } from "react-hot-toast";
import { onlyNumbers } from "../../../../Utilities/inputRestrictions";
import { useFormik } from "formik";
import { useGetID } from "../../../../Queries/OtherQuery/OtherQuery";
import OrderTable from "./OrderTable";
import * as Yup from "yup";
import { Tooltip } from "antd";

const orderValidation = () => {
  return Yup.object().shape({
    payment_type: Yup.string().required("Payment type is required"),
    customer_id: Yup.string().required("Please select customer"),
    sales_order_items: Yup.array()
      .length(1, "Item mst have one item")
      .required("Invoice items ID is required"),
      discount_percentage_other: Yup.string().required(
      "Other discount percentage is required"
    ),
  });
};
const SalesOrderPage = () => {
  const [edit, setEdit] = useState(false);
  const [additionOpen, setAdditionOpen] = useState(false);
  const [otherCharges, setOtherCharges] = useState(false);
  const [settilment, setSettilement] = useState(false);
  const [item, setItem] = useState([]);
  const { data: id ,refetch} = useGetID({ section: "sales", module: "order" });
  const initialValues = useCallback(
    {
      sales_order_id: id?.data?.data?.Order_id,
      issuing_date: Date.now(),
      customer_id: "",
      discount_percentage_other: "",
      discount_amount_other: "",
      round_off: "",
      gross_total: "",
      payment_type: "",
      po_number: "",
      so_number: "",
      source: "",
      delivery_notes: "",
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

      sales_order_items: [],
    },
    [id]
  );
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema:orderValidation
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
  const totalAmount = formik?.values?.sales_order_items
    ?.map((e) => e.net_amount)
    .filter((e) => e !== undefined)
    .reduce((a, b) => a + b, 0);

  const { mutateAsync: addInvoice, isLoading } = useAddSalesOrder();
  const handleSubmit = () => {
    const data = {
      sales_order_id: formik.values.sales_order_id,
      issuing_date: formik.values.issuing_date,
      customer_id: formik.values.customer_id,
     
      round_off: 0,
      gross_total: (
        totalAmount -
        (formik.values.discount_percentage_other / 100) * totalAmount
      ).toFixed(0),
      payment_type: formik.values.payment_type,
      po_number: formik.values.po_number,
      s_o_number: "String",

      source: "String",
      delivery_notes: "String",
      additional_details: "String",
      sale_order_details: {
        payment_type: formik.values.payment_type,
        po_number: formik.values.po_number,
        s_o_number: "String",

        source: "String",
      },
      other_details: {
        other_discount_percentage:formik.values.discount_percentage_other,
        other_discount_amount:  (formik.values.discount_percentage_other / 100) * totalAmount,
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
      summary: {
        discount_percentage: formik.values.discount_percentage_other,
        discount_amount:
          (formik.values.discount_percentage_other / 100) * totalAmount,
        round_off: 0,
        gross_total: (
          totalAmount -
          (formik.values.discount_percentage_other / 100) * totalAmount
        ).toFixed(0),
        additional_details: "String",
        net_amount: formik.values?.sales_order_items
        .map((e) => {
          return e.net_amount;
        })
        ?.reduce((e, i) => {
          return e + i;
        }, 0),
      },
      sales_order_items: formik.values.sales_order_items,
    };
    addInvoice(data)
      .then((res) => {
        if (res.status === 500) {
          toast.error("Something went wrong");
        }
        toast.success("Sales order created");
        refetch()
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="">
      <div className="p-8  max-w-[1512px]   h-auto m-auto">
        <div>
          <AllHeadSection
            id={id?.data?.data?.Order_id}
            formik={formik}
            head={"Sales Order"}
            name={"invoice_id"}
          />
          <div className="flex gap-6 2xl:gap-8 mb-8">
            <div className="flex-[.6] ">
              <IssueCard />
            </div>
            <div className=" flex-[.6]">
              <IssuerCard formik={formik} />
            </div>
            <div className="flex-1">
              <DetialsContainer color={"bg-overdue-color"}>
                <div className="w-full">
                  <div className="w-full flex items-center justify-between gap-2 mb-2">
                    <h2 className="text-base 2xl:text-lg font-semibold"> Sales order details</h2>
                    <img src={wise} alt="" />
                  </div>

                  <div className="flex gap-2 2xl:gap-12">
                    <div className="flex flex-col h-full justify-between ">
                      <div className="flex items-center gap-1">
                        <p className="text-sm 2xl:text-base whitespace-nowrap">Payment type:</p>
                        <div className="w-[9rem]">
                          <BorderlessSelect
                            placeholder="Select Type"
                            options={[
                              { value: "DEBIT_CARD", label: "Debit card" },
                              { value: "CREDIT_CARD", label: "Credit card" },
                              { value: "CASH", label: "Cash" },
                              { value: "CREDIT", label: "Credit" },
                              { value: "PETTY_CASH", label: "Petty cash" },
                            ]}
                            error={formik.errors.payment_type}

                            onChange={(e) =>
                              formik.setFieldValue("payment_type", e)
                            }
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        <p className="text-sm 2xl:text-base whitespace-nowrap">P/O number: </p>
                        <div className="max-w-[5rem] ml-2">
                          <BorderLessInput
                            onInput={onlyNumbers}
                            placeholder="Enter"
                            onChange={formik.handleChange}
                            name="po_number"
                            value={formik.values.po_number}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <p className="text-sm 2xl:text-base whitespace-nowrap">S/O number: </p>
                        <div className="max-w-[5rem] ml-2">
                          <BorderLessInput
                            onInput={onlyNumbers}
                            placeholder="Enter"
                            onChange={formik.handleChange}
                            name="so_number"
                            value={formik.values.so_number}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-1 ">
                        <p className="text-sm 2xl:text-base whitespace-nowrap">Source:</p>
                        <div className="w-[10rem]">
                          <BorderlessSelect
                            placeholder="Select Source"
                            options={[
                              {
                                value: "Delivery note",
                                label: "Delivery note",
                              },
                              { value: "Direct", label: "Direct" },
                              {
                                value: "Delivery note(Manual)",
                                label: "Delivery note(Manual)",
                              },
                            ]}
                            onChange={(e) => formik.setFieldValue("source", e)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col h-full my-2 justify-between gap-1">
                      <div className="flex items-center gap-1">
                        <p className="text-sm 2xl:text-base whitespace-nowrap">Delivery notes:</p>
                        <div className="max-w-[5rem] ml-3">
                          <BorderLessInput
                            onInput={onlyNumbers}
                            onChange={formik.handleChange}
                            name="delivery_notes"
                            value={formik.values.delivery_notes}
                            placeholder="Enter "
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
          <div className="mb-6 flex w-full items-center justify-between">
            <p className="text-xl 2xl:text-[24px] font-semibold">Items</p>

            <button
              onClick={() => addItem()}
              className=" px-4 2xl:px-6 py-2 2xl:py-3 text-sm 2xl:text-base rounded-full border hover:bg-light-gray transition-all"
              disabled={edit === false ? false : true}
            >
              {formik.errors.sales_order_items ? (
                <div
                  className={`${
                    formik.errors.sales_order_items
                      ? "pointer-events-auto opacity-100"
                      : "pointer-events-none opacity-0"
                  } cursor-pointer `}
                >
                  <Tooltip
                    trigger={"hover"}
                    title={formik.errors.sales_order_items}
                    color="white"
                    className="error-tooltip flex items-center gap-2"
                    
                  >
                    Add Items
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 6V9.75M9 16.5C13.125 16.5 16.5 13.125 16.5 9C16.5 4.875 13.125 1.5 9 1.5C4.875 1.5 1.5 4.875 1.5 9C1.5 13.125 4.875 16.5 9 16.5Z"
                        stroke="#F42F2F"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </Tooltip>
                </div>
              ) : (
                " Add Items"
              )}
            </button>
          </div>
          <OrderTable
            edit={edit}
            formik={formik}
            item={item}
            setEdit={setEdit}
            setItem={setItem}
          />
        </div>
        <div>
          <div className="mb-6">
            <p className="text-xl 2xl:text-[24px] font-semibold">Other Detials</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex-[.5]">
              <p className="text-xs mb-3">Other discount %</p>
              <BorderdInput
                onInput={onlyNumbers}
                onChange={formik.handleChange}
                name="discount_percentage_other"
                value={formik.values.discount_percentage_other}
                error={formik.errors.discount_percentage_other}
                placeholder="Enter value"
              />
            </div>
            <div className="flex-[.5]">
              <p className="text-xs mb-3">Discount amount</p>
              <BorderdInput
                onInput={onlyNumbers}
                placeholder="Enter amount"
                onChange={formik.handleChange}
                readOnly
                name="discount_amount_other"
                value={
                  (formik.values.discount_percentage_other / 100) * totalAmount
                }
              />
            </div>
            <div className="flex-[.5]">
              <p className="text-xs mb-3">Other charges</p>
              <div className="border-[1px]  focus-within:border-blue transition-all border-border-gray rounded-xl">
                <button
                  onClick={() => setOtherCharges(true)}
                  className="flex items-center justify-between w-full px-3 py-[8px]  "
                >
                  <p className="text-gray text-base 2xl:text-lg">Select</p>
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.68262 12.9396L6.57262 8.04957C7.15012 7.47207 7.15012 6.52707 6.57262 5.94957L1.68262 1.05957"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex-[.5]">
              <p className="text-xs mb-3">Narration</p>
              <BorderdInput
                placeholder="Narration"
                onChange={formik.handleChange}
                name="narration"
                value={formik.values.narration}
              />
            </div>
            <div className="flex-[.5]">
              <p className="text-xs mb-3">Ref/Settlement</p>
              <div className="border-[1px]  focus-within:border-blue transition-all border-border-gray rounded-xl">
                <button
                  onClick={() => setSettilement(true)}
                  className="flex items-center justify-between w-full px-3 py-[8px]  "
                >
                  <p className="text-gray text-base 2xl:text-lg">Select</p>
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.68262 12.9396L6.57262 8.04957C7.15012 7.47207 7.15012 6.52707 6.57262 5.94957L1.68262 1.05957"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex-[1]">
              <p className="text-xs mb-3">Payment terms</p>
              <BorderdInput
                placeholder="Enter payment terms"
                onChange={formik.handleChange}
                name="payment_terms"
                value={formik.values.payment_terms}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-[.5px] px-8 py-6 sticky bottom-0 h-[116px]  border-border-gray w-full bg-white">
        <div className="flex items-center   max-w-[1512px]   h-full m-auto">
          <div className=" h-full flex-[.15]">
            <p className="font-semibold text-sm">Summary</p>
          </div>
          <div className="flex-[1] flex justify-between">
            <div className="flex flex-[.6] flex-col gap-1">
              <div className="flex items-center gap-2">
                <p className="text-gray text-sm 2xl:text-base">Discount</p>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_419_6)">
                    <path
                      d="M6.99996 4.66602V7.58268M6.99996 12.8327C10.2083 12.8327 12.8333 10.2077 12.8333 6.99935C12.8333 3.79102 10.2083 1.16602 6.99996 1.16602C3.79163 1.16602 1.16663 3.79102 1.16663 6.99935C1.16663 10.2077 3.79163 12.8327 6.99996 12.8327Z"
                      stroke="#969696"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.99707 9.33398H7.00382"
                      stroke="#969696"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_419_6">
                      <rect width="14" height="14" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div>
                <p className="font-semibold">
                  {formik.values.discount_percentage_other}
                </p>
              </div>
              <div className="text-gray text-sm 2xl:text-base">Savings applied</div>
            </div>
            <div className="flex flex-[.6] flex-col gap-1">
              <div className="flex items-center gap-2">
                <p className="text-gray text-sm 2xl:text-base">Round off</p>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_419_6)">
                    <path
                      d="M6.99996 4.66602V7.58268M6.99996 12.8327C10.2083 12.8327 12.8333 10.2077 12.8333 6.99935C12.8333 3.79102 10.2083 1.16602 6.99996 1.16602C3.79163 1.16602 1.16663 3.79102 1.16663 6.99935C1.16663 10.2077 3.79163 12.8327 6.99996 12.8327Z"
                      stroke="#969696"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.99707 9.33398H7.00382"
                      stroke="#969696"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_419_6">
                      <rect width="14" height="14" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div>
                <p className="font-semibold">15%</p>
              </div>
              <div className="text-gray text-sm 2xl:text-base">savings applied</div>
            </div>
            <div className="flex flex-[.6] flex-col gap-6">
              <div className="flex items-center gap-2">
                <p className="text-gray text-sm 2xl:text-base">Gross total</p>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_419_6)">
                    <path
                      d="M6.99996 4.66602V7.58268M6.99996 12.8327C10.2083 12.8327 12.8333 10.2077 12.8333 6.99935C12.8333 3.79102 10.2083 1.16602 6.99996 1.16602C3.79163 1.16602 1.16663 3.79102 1.16663 6.99935C1.16663 10.2077 3.79163 12.8327 6.99996 12.8327Z"
                      stroke="#969696"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.99707 9.33398H7.00382"
                      stroke="#969696"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_419_6">
                      <rect width="14" height="14" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div>
                <p className="font-semibold  text-2xl 2xl:text-3xl">
                  ${" "}
                  {(
                    totalAmount -
                    (formik.values.discount_percentage_other / 100) *
                      totalAmount
                  ).toFixed(0)}
                </p>
              </div>
            </div>
            <div className="flex flex-[.8]  items-center gap-6">
              <div className="rounded-full flex items-center justify-center min-w-[40px] 2xl:min-w-[56px] min-h-[40px] 2xl:min-h-[56px] bg-light-gray">
                <img src={printer} className=" w-5 2xl:w-8" alt="printer" />
              </div>

              <button
                onClick={() => setAdditionOpen(true)}
                className="rounded-full flex items-center justify-center px-4 w-full h-[40px] 2xl:h-[56px] bg-light-gray"
              >
                <p className="whitespace-nowrap 2xl:text-base text-sm">Additional details</p>{" "}
              </button>
              <button
               onClick={() => {
                formik.setTouched();
                if (formik.dirty) {
                  handleSubmit();
                }
              }}
                className="rounded-full flex items-center justify-center w-full px-4 h-[40px] 2xl:h-[56px] bg-blue"
              >
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <p className="text-white whitespace-nowrap 2xl:text-base text-sm">Save & close</p>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <OtherChargesModal
        formik={formik}
        open={otherCharges}
        setOpen={setOtherCharges}
      />
      <SettilemantModal
        formik={formik}
        open={settilment}
        setOpen={setSettilement}
      />
      <AdditionalDetialsModal
        formik={formik}
        setOpen={setAdditionOpen}
        open={additionOpen}
      />
    </div>
  );
};

export default SalesOrderPage;
