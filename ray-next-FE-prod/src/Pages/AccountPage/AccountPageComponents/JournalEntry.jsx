import React, { useCallback, useEffect, useRef, useState } from "react";
import AllHeadSection from "../../../CommonComponents/OtherComponent/AllHeadSection";
import IssueCard from "../../../CommonComponents/OtherComponent/IssueCard";
import IssuerCard from "../../../CommonComponents/OtherComponent/IssuerCard";
import wise from "../../../Assets/CommonImages/Wise.svg";
import DetialsContainer from "../../../CommonComponents/OtherComponent/DetialsContainer";
import BorderlessSelect from "../../../CommonComponents/FormInputs/BorderlessSelect";
import BorderLessInput from "../../../CommonComponents/FormInputs/BorderLessInput";

import printer from "../../../Assets/CommonImages/printer.svg";
import BorderdInput from "../../../CommonComponents/FormInputs/BorderdInput";
import * as Yup from "yup";

import AdditionalDetialsModal from "../../../CommonComponents/OtherComponent/AdditionalDetialsModal";
import OtherChargesModal from "../../../CommonComponents/OtherComponent/OtherChargesModal";
import SettilemantModal from "../../../CommonComponents/OtherComponent/SettilemantModal";
import { useAddInvoice } from "../../../Queries/SalesQuery/SalesQuery";
import LoadingSpinner from "../../../CommonComponents/UtilComponent/LoadingSpinner";
import { toast } from "react-hot-toast";
import { onlyNumbers } from "../../../Utilities/inputRestrictions";
import { useFormik } from "formik";
import InvoiceTable from "./InvoiceTable";
import { useGetID } from "../../../Queries/OtherQuery/OtherQuery";
import { Tooltip } from "antd";
import ModalLayout from "../../../CommonComponents/OtherComponent/ModalLayout";
import BorderdTextArea from "../../../CommonComponents/FormInputs/BorderdTextArea";
import {
  useAddJournal,
  useGetJournalId,
} from "../../../Queries/AccountQuery/AccountQuery";
import InvoiceTableTwo from "./InvoiceTable2";

const invoiceValidation = () => {
  return Yup.object().shape({
    payment_type: Yup.string().required("Payment type is required"),
    customer_id: Yup.string().required("Please select customer"),
    transactions: Yup.array()
      .length(1, "Item mst have one item")
      .required("Invoice items ID is required"),
    discount_percentage_other: Yup.string().required(
      "Other discount percentage is required"
    ),
  });
};

const JournalEntry = ({ open, setOpen }) => {
  const [edit, setEdit] = useState(false);
  const [additionOpen, setAdditionOpen] = useState(false);
  const [otherCharges, setOtherCharges] = useState(false);
  const [settilment, setSettilement] = useState(false);
  const [item, setItem] = useState([]);
  const [typeState, setTypeState] = useState("")
  const { data: id, refetch } = useGetJournalId();

  const initialValues = useCallback({
    journal_id: "",
    issued_date: "",
    debit_total: "",
    credit_total: "",
    description: "",
    reference_number: "",
    transactions: [],
  });
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: invoiceValidation,
  });
  const addItem = () => {
    console.log(item);
    setItem((prev) => [
      ...prev,
      {
        account_name: "",
        account_id: "",
        credit: "",
        debit: "",
        // drcr: "",
        drcr: item.length != 0 ? item[item.length - 1].drcr.value == "DR" ? { children: "Credit", value: "CR" } : { children: "Debit", value: "DR" } : "",
      },
    ]);
    setEdit(item?.length);

    if (item.length != 0) {
      if (item[item.length - 1].drcr.value == "DR") {
        setTypeState("CR")
      } else {
        setTypeState("DR")
      }
    }

  }

  const { mutateAsync: addJournal, isLoading } = useAddJournal();
  const [clear, setClear] = useState(false);
  useEffect(() => {
    if (clear) {
      refetch().then((res) => {
        setClear(false);
        setItem([]);
      });
    }
  }, [clear]);
  const deibitTotal = () => {
    return formik?.values?.transactions
      ?.map((e) => {
        return parseFloat(e.debit) || 0; // Use parseFloat to handle non-numeric values
      })
      .reduce((e, i) => Number(e) + Number(i), 0);
  };

  const creditTotal = () => {
    return formik?.values?.transactions
      ?.map((e) => {
        return parseFloat(e.credit) || 0; // Use parseFloat to handle non-numeric values
      })
      .reduce((e, i) => Number(e) + Number(i), 0);
  };

  const handleSubmit = () => {
    const data = {
      journal_id: id?.data?.data?.product_id,
      date: formik?.values?.issued_date,
      debit_total: deibitTotal(),
      credit_total: creditTotal(),
      description: formik?.values?.description,
      reference_number: formik?.values?.reference_number,
      transactions: formik?.values?.transactions,
    };

    addJournal(data)
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
  const [isActive, setIsActive] = useState(false);

  // Toggle isActive state
  const toggleIsActive = () => {
    setIsActive(!isActive);
  };
  return (
    <ModalLayout setOpen={setOpen} width={1100} open={open}>
      <div className="">
        <div className=" p-0 max-w-[1512px]   h-auto m-auto">
          <div>
            <AllHeadSection
              isActive={isActive}
              toggleIsActive={toggleIsActive}
              id={id?.data?.data?.product_id}
              formik={formik}
              head={"Journal"}
              name={"journal_id"}
            />
            {/* //.. need to hide   */}
            {!isActive && (
            <div
              className="flex gap-6 2xl:gap-8 mb-8">
              <div className="flex-[.6] ">
                <IssueCard />
              </div>

              <div className="flex-1">
                <DetialsContainer color={"bg-account-color"}>
                  <div className="w-full">
                    <div className="w-full flex items-center justify-between gap-2 mb-2">
                      <h2 className=" text-base 2xl:text-lg font-semibold">
                        Journal details
                      </h2>
                      <img src={wise} alt="" />
                    </div>

                    <div className="flex gap-4 2xl:gap-12">
                      <div className="flex flex-col h-full justify-between ">
                        <div className="flex items-center gap-1">
                          <p className="text-sm 2xl:text-base whitespace-nowrap">
                            Ref number:{" "}
                          </p>
                          <div className="max-w-[5rem] ml-2">
                            <BorderLessInput
                              placeholder="Enter"
                              onChange={formik.handleChange}
                              name="reference_number"
                              value={formik.values.reference_number}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </DetialsContainer>
              </div>
            </div>
            )}
          </div>

          {/* head ended */}

          {/* need to hide  */}

          {isActive && (
          <div className="mb-12">

            <div className="flex gap-2  items-baseline justify-between">
            
            </div>
            <div className="flex gap-2  items-baseline justify-between">
              <InvoiceTableTwo
                edit={edit}
                formik={formik}
                item={item}
                setEdit={setEdit}
                setItem={setItem}
                clear={clear}
                addItem={addItem}
                setTypeState={setTypeState}
                typeState={typeState}
              />
              <InvoiceTableTwo
                edit={edit}
                formik={formik}
                item={item}
                setEdit={setEdit}
                setItem={setItem}
                clear={clear}
                addItem={addItem}
                setTypeState={setTypeState}
                typeState={typeState}
              />
            </div>
          </div>
          )}
          {!isActive && (
          <div className="mb-12">
            <div className="mb-2 flex w-full items-center justify-between">
              <p className=" text-xl 2xl:text-[24px] font-semibold">Items</p>

              <button
                onClick={() => addItem()}
                className=" px-4 2xl:px-6 py-2 2xl:py-3 text-sm 2xl:text-base rounded-full border hover:bg-light-gray transition-all"
              // disabled={edit === false ? false : true}
              >
                {formik.errors.transactions ? (
                  <div
                    className={`${formik.errors.transactions
                      ? "pointer-events-auto opacity-100"
                      : "pointer-events-none opacity-0"
                      } cursor-pointer `}
                  >
                    <Tooltip
                      trigger={"hover"}
                      title={formik.errors.transactions}
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
            <InvoiceTable
              edit={edit}
              formik={formik}
              item={item}
              setEdit={setEdit}
              setItem={setItem}
              clear={clear}
              addItem={addItem}
              setTypeState={setTypeState}
              typeState={typeState}
            />
          </div>
          )}
          
          {/*hide end */}
          
          {!isActive && (
          <div>
            <div className="mb-6 ">
              <p className="text-xl 2xl:text-[20px] font-semibold">
                Other Detials
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-full">
                <p className="text-xs mb-3">Discription</p>
                <BorderdTextArea
                  onChange={(e) =>
                    formik.setFieldValue("discription", e.target.value)
                  }
                  name="description"
                  value={formik.values.discription}
                  error={formik.errors.discription}
                  placeholder="Enter value"
                />
              </div>
            </div>
          </div>
          )}
        </div>
        {/* footer */}
        <div className="border-t-[.5px]  py-6 sticky bottom-0 h-[116px]  border-border-gray w-full bg-white">
          <div className="flex items-center   max-w-[1512px]   h-full m-auto">
            <div className=" h-full flex-[.15]">
              <p className="font-semibold text-base">Summary</p>
            </div>
            <div className="flex-[1] flex justify-between">
              <div className="flex flex-[.6] flex-col gap-1">
                <div className="flex items-center gap-2">
                  <p className="text-gray text-sm 2xl:text-base">Debit total</p>
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
                  {console.log(deibitTotal())}
                  <p className="font-semibold text-2xl"> $ {deibitTotal()}</p>
                </div>
              </div>
              <div className="flex flex-[.6] flex-col gap-1">
                <div className="flex items-center gap-2">
                  <p className="text-gray text-sm 2xl:text-base">
                    Credit total
                  </p>
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
                  {console.log(creditTotal())}
                  <p className="font-semibold text-2xl">$ {creditTotal()}</p>
                </div>
              </div>

              <div className="flex flex-[.4]  items-center gap-6">
                <div className="rounded-full flex items-center justify-center min-w-[40px] 2xl:min-w-[56px] min-h-[40px] 2xl:min-h-[56px] bg-light-gray">
                  <img src={printer} className=" w-5 2xl:w-8" alt="printer" />
                </div>

                <button
                  onClick={() => {
                    formik.setTouched();
                    if (deibitTotal() !== creditTotal()) {
                      toast.error("Debit and credit should be equal");
                    } else {
                      if (formik.dirty) {
                        handleSubmit();
                      }
                    }
                  }}
                  className="rounded-full flex items-center justify-center w-full px-0 py-5 h-[20px] 2xl:h-[50px] bg-blue"
                >
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <p className="text-white whitespace-nowrap 2xl:text-base text-sm">
                      Save & close
                    </p>
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
    </ModalLayout>
  );
};

export default JournalEntry;
