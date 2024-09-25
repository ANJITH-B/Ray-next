import React, { useEffect, useRef, useState } from "react";
import ModalLayout from "../../../CommonComponents/OtherComponent/ModalLayout";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import BorderdInput from "../../../CommonComponents/FormInputs/BorderdInput";
import BorderdTextArea from "../../../CommonComponents/FormInputs/BorderdTextArea";
import Button from "../../../CommonComponents/FormInputs/Button";
import RoundedCheckbox from "../../../CommonComponents/FormInputs/RoundedCheckbox";
import BorderdSelect from "../../../CommonComponents/FormInputs/BorderdSelect";
import {
  useAddRegularAccount,
  useGetControlAccount,
  useUpdateRegularAccount,
} from "../../../Queries/AccountQuery/AccountQuery";
import { toast } from "react-hot-toast";
import NewRefferenceModel from "../../../CommonComponents/OtherComponent/NewRefferenceModel";
import { onlyNumbers } from "../../../Utilities/inputRestrictions";
import ControlledAccountModal from "./ControlledAccountModal";

const validationSchema = Yup.object().shape({
  account_name: Yup.string().required("Account name is required"),
  alias: Yup.string().required("Alias is required"),
  account_code: Yup.string().required("Account code is required"),
  parent_account_id: Yup.string().required("Sub Account is required"),
  opening_balance: Yup.number().min(
    0,
    "Opening balance must be a positive number"
  ),
  // opening_balance_type: Yup.string().when("opening_balance", {
  //   is: (val) => val && val > 0,
  //   then: Yup.string().required("Debit/Credit is required when there is an opening balance")
  // }),
  description: Yup.string().required("Description is required"),
});

const RegularAccountModal = ({ open, setOpen, type = "Add", accdata }) => {
  const accstartdate = JSON.parse(localStorage.getItem("accstartdate"));
  const [openRef, setOpenRef] = useState(false);
  const [reference, setReference] = useState(null);
  const initialValue = {
    account_name: "",
    alias: "",
    account_code: "",
    description: "",
    show_in_reports: true,
    parent_account_id: "",
    opening_balance: "",
    opening_balance_type: "",
  };
  const disabled = type === "Edit" && accdata?.opening_balance;
  const formikRef = useRef();
  const { mutateAsync: addRegularAccount, isLoading } = useAddRegularAccount();
  const { mutateAsync: updateRegularAccount, isLoading: updating } =
    useUpdateRegularAccount();
  const [addAcc, setAddAcc] = useState(false);
  const { data } = useGetControlAccount({ pageNo: 1, pageCount: 100 });

  const parrentData = data?.data?.data?.map((e) => {
    return {
      label: e?.account_name,
      value: e?._id,
    };
  });

  const handleSubmit = (values, { resetForm }) => {
    const datas = {
      account_name: values?.account_name,
      alias: values?.alias,
      account_code: values?.account_code,
      description: values?.description,
      show_in_reports: true,
      parent_account_id: values?.parent_account_id,
      opening_balance: values?.opening_balance,
      opening_balance_type: values?.opening_balance_type,
      reference,
      accstartdate
    };
    if (
      datas.account_name === "" ||
      datas.account_code === "" ||
      datas.parent_account_id === ""
    ) {
      return;
    }
    if (datas.opening_balance) {
      if (datas.opening_balance_type === "") return;
    } else {
      datas.opening_balance = 0;
      datas.opening_balance_type = "";
    }
    if (type === "Edit") {
      updateRegularAccount({ ...datas, _id: accdata?._id })
        .then((res) => {
          toast.success("Regular account added");
          setOpen(false);
          resetForm();
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
      setOpen(false);
    } else {
      addRegularAccount(datas)
        .then((res) => {
          toast.success("Regular account added");
          setOpen(false);
          resetForm();
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      if (type === "Edit" && accdata) {
        formikRef.current.setValues(accdata);
      } else {
        formikRef.current.resetForm();
      }
    }
  }, [open, accdata, type]);

  return (
    <ModalLayout
      setOpen={setOpen}
      open={open}
      width={700}
      title={`${type} Account`}
    >
      <div>
        <div>
          <Formik
            initialValues={initialValue}
            onSubmit={handleSubmit}
            enableReinitialize={true}
            validationSchema={validationSchema}
            innerRef={formikRef}
          >
            {({ setFieldValue, values, errors, touched }) => (
              <Form>
                <div>
                  <div className="mb-6 flex items-center gap-6">
                    <div className="flex-1">
                      <p className="text-sm mb-2">Account name</p>
                      <BorderdInput
                        formik={true}
                        name="account_name"
                        id="code"
                        placeholder="Enter name"
                      />
                      {errors.account_name && touched.account_name && (
                        <div className="text-red-500 text-sm">
                          {errors.account_name}
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <p className="text-sm mb-2">Alias</p>
                      <BorderdInput
                        formik={true}
                        name="alias"
                        id="code"
                        placeholder="Enter alias"
                      />
                      {errors.alias && touched.alias && (
                        <div className="text-red-500 text-sm">
                          {errors.alias}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-6 flex items-center gap-6">
                    <div className="flex-[.6]">
                      <p className="text-sm mb-2">Account code</p>
                      <BorderdInput
                        formik={true}
                        name="account_code"
                        id="code"
                        placeholder="Enter code"
                      />
                      {errors.account_code && touched.account_code && (
                        <div className="text-red-500 text-sm">
                          {errors.account_code}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm mb-2">Sub Account</p>
                      <BorderdSelect
                        onChange={(e) => setFieldValue("parent_account_id", e)}
                        id="name"
                        placeholder="Sub account of"
                        disabled={disabled}
                        items={parrentData}
                        value={type === 'Edit' ? values?.parent_account_id : undefined}
                        addOption={true}
                        setAddOption={setAddAcc}
                      />
                      {errors.parent_account_id &&
                        touched.parent_account_id && (
                          <div className="text-red-500 text-sm">
                            {errors.parent_account_id}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="mb-6 flex items-center gap-6">
                    <div className="flex-[.6]">
                      <p className="text-sm mb-2">Opening Balance</p>
                      <BorderdInput
                        formik={true}
                        name="opening_balance"
                        id="opening_balance"
                        placeholder="Enter opening balance"
                        onInput={onlyNumbers}
                        disabled={disabled}
                      />
                      {errors.opening_balance && touched.opening_balance && (
                        <div className="text-red-500 text-sm">
                          {errors.opening_balance}
                        </div>
                      )}
                    </div>

                    <div className="flex-[.4]">
                      <p className="text-sm mb-2">Debit / Credit</p>
                      <BorderdSelect
                        onChange={(e) =>
                          setFieldValue("opening_balance_type", e)
                        }
                        id="name"
                        value={values?.opening_balance_type}
                        placeholder="Debit / Credit"
                        items={[
                          { label: "Debit", value: "DR" },
                          { label: "Credit", value: "CR" },
                        ]}
                        disabled={disabled}
                      />
                      {errors.opening_balance_type &&
                        touched.opening_balance_type && (
                          <div className="text-red-500 text-sm">
                            {errors.opening_balance_type}
                          </div>
                        )}
                    </div>
                    <NewRefferenceModel
                      open={openRef}
                      setOpen={setOpenRef}
                      total={parseInt(values?.opening_balance)}
                      type={values?.opening_balance_type}
                      setReference={setReference}
                    />
                    <div className="flex-[.4]">
                      <p className="text-sm mb-2">Details</p>
                      <button
                        onClick={() => setOpenRef(true)}
                        disabled={
                          !values.opening_balance ||
                          !values.opening_balance_type ||
                          disabled
                        }
                        className={`py-2 2xl:py-4 px-6 h-[40px] 2xl:h-[56px] rounded-full w-full whitespace-nowrap 2xl:text-base text-sme flex justify-center bg-blue text-white`}
                        type="button"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                  <div className="mb-6 flex items-center gap-6">
                    <div className="flex-1">
                      <p className="text-sm mb-2">Description</p>
                      <BorderdTextArea
                        onChange={(e) => {
                          setFieldValue("description", e.target.value);
                        }}
                        value={values.description}
                        name="description"
                        id="code"
                        placeholder="Enter description"
                      />
                      {errors.description && touched.description && (
                        <div className="text-red-500 text-sm">
                          {errors.description}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex w-full justify-between">
                    <div className="flex items-center gap-3">
                      <RoundedCheckbox />
                      <p>Show in options</p>
                    </div>

                    <div className="flex-[.2]">
                      <Button
                        background={"bg-blue text-white"}
                        text={"Save"}
                        type={"submit"}
                        loading={isLoading || updating}
                      />
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ControlledAccountModal open={addAcc} setOpen={setAddAcc} />
    </ModalLayout>
  );
};

export default RegularAccountModal;
