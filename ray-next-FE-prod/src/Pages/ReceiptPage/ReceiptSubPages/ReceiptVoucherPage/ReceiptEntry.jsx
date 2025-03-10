import React, { useCallback, useEffect, useState } from "react";
import AllHeadSection from "../../../../CommonComponents/OtherComponent/AllHeadSection";
import IssueCard from "../../../../CommonComponents/OtherComponent/IssueCard";
import IssuerCard from "../../../../CommonComponents/OtherComponent/IssuerCard";
import wise from "../../../../Assets/CommonImages/Wise.svg";
import DetialsContainer from "../../../../CommonComponents/OtherComponent/DetialsContainer";
import BorderlessSelect from "../../../../CommonComponents/FormInputs/BorderlessSelect";
import BorderLessInput from "../../../../CommonComponents/FormInputs/BorderLessInput";

import printer from "../../../../Assets/CommonImages/printer.svg";
import * as Yup from "yup";
import { useAddReceipt } from "../../../../Queries/ReceiptQuery/ReceiptQuery";
import LoadingSpinner from "../../../../CommonComponents/UtilComponent/LoadingSpinner";
import { toast } from "react-hot-toast";
import { onlyNumbers } from "../../../../Utilities/inputRestrictions";
import { useFormik } from "formik";
import InvoiceTable from "./InvoiceTable";
import { useGetID } from "../../../../Queries/OtherQuery/OtherQuery";

const receiptValidation = () => {
  return Yup.object().shape({
    account_type: Yup.string().required("Account type is required"),
    reference_number: Yup.string().required("Reference Number is required"),
    customer_id: Yup.string().required("Please select a customer"),
    receipt_items: Yup.array()
      .min(1, "At least one invoice must be selected")
      .required("Receipt items are required"),
    received_amount: Yup.number().required("Received amount is required"),
  });
};


const ReceiptEntry = () => {
  const [rif,setRif] = useState('');
  const { data: id, refetch } = useGetID({
    section: "sales",
    module: "receipts",
  });

  const initialValues = useCallback(
    {
      receipt_id: id?.data?.data?.receipt_id || "",
      issuing_date: Date.now(),
      customer_id: "",
      received_amount: "",
      account_type: "",
      reference_number: "",
      description: "",
      receipt_items: [],
    },
    [id]
  );

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: receiptValidation,
  });

  const { mutateAsync: addReceipt, isLoading } = useAddReceipt();
  const [clear, setClear] = useState(false);

  useEffect(() => {
    if (clear) {
      refetch().then((res) => {
        setClear(false);
      });
    }
  }, [clear]);

  const handleSubmit = () => {
    console.log('handleSubmit');

    let totalReceived = 0;
    console.log('formik.values.receipt_items', formik.values.receipt_items);
    const updatedReceiptItems = formik.values.receipt_items.map((item) => {


      totalReceived += item.settled_amount;
      return {
        invoice_id: item.invoice_id,
        settled_amount: item.settled_amount,
      };
    }).filter(Boolean);

    if (updatedReceiptItems.length === 0) return;

    const data = {
      receipt_id: formik.values.receipt_id,
      issuing_date: formik.values.issuing_date,
      customer_id: formik.values.customer_id,
      received_amount: totalReceived,
      account_type: formik.values.account_type || null,
      reference_number: formik.values.reference_number,
      description: formik.values.description,
      receipt_items: updatedReceiptItems,
    };

    addReceipt(data)
      .then((res) => {
        
        toast.success("Receipt created successfully");
        setRif(res?.data?.data)

        formik.resetForm({
          values: {
            receipt_id: id?.data?.data?.receipt_id || "",
            issuing_date: Date.now(),
            customer_id: "",
            received_amount: "",
            account_type: "",
            reference_number: "",
            description: "",
            receipt_items: [],
          },
        });
        setClear(true);

      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="">
      <div className="py-8 px-6 max-w-[1512px]   h-auto m-auto">
        <div>
          <AllHeadSection
            id={id?.data?.data?.receipt_id}
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
                            name="reference_number"
                            error={formik.errors.reference_number}
                            value={formik.values.reference_number}
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
                            error={formik.errors.account_type}
                            value={formik.values.account_type}
                            options={[
                              { value: "DEBIT_CARD", label: "Debit card" },
                              { value: "CREDIT_CARD", label: "Credit card" },
                              { value: "CASH", label: "Cash" },
                              { value: "CREDIT", label: "Credit" },
                              { value: "PETTY_CASH", label: "Petty cash" },
                            ]}
                            onChange={(e) =>
                              formik.setFieldValue("account_type", e)
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
            formik={formik}
            rif={rif}
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
