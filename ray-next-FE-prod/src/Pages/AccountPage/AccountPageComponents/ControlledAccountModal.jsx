import React, { useEffect, useRef } from "react";
import ModalLayout from "../../../CommonComponents/OtherComponent/ModalLayout";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import BorderdInput from "../../../CommonComponents/FormInputs/BorderdInput";
import BorderdTextArea from "../../../CommonComponents/FormInputs/BorderdTextArea";
import Button from "../../../CommonComponents/FormInputs/Button";
import RoundedCheckbox from "../../../CommonComponents/FormInputs/RoundedCheckbox";
import BorderdSelect from "../../../CommonComponents/FormInputs/BorderdSelect";
import {
  useAddControlledAccount,
  useUpdateControlAccount,
} from "../../../Queries/AccountQuery/AccountQuery";
import { toast } from "react-hot-toast";

// Validation schema
const validationSchema = Yup.object().shape({
  account_name: Yup.string().required("Account name is required"),
  alias: Yup.string().required("Alias is required"),
  account_code: Yup.string().required("Account code is required"),
  description: Yup.string().required("Description is required"),
  nature_of_account: Yup.string().required("Nature of account is required"),
});

const ControlledAccountModal = ({ open, setOpen, type = "Add", data }) => {
  const initialValue = {
    account_name: "",
    alias: "",
    account_code: "",
    description: "",
    show_in_reports: true,
    nature_of_account: "",
  };

  const formikRef = useRef();
  const { mutateAsync: addControlledAccount, isLoading: controlledLoading } =
    useAddControlledAccount();
  const { mutateAsync: updateControlAccount } = useUpdateControlAccount();
  const handleSubmit = (values, { resetForm }) => {
    const datas = {
      account_name: values?.account_name,
      alias: values?.alias,
      account_code: values?.account_code,
      description: values?.description,
      show_in_reports: true,
      nature_of_account: values?.nature_of_account,
    };
    if (type === "Edit") {
      updateControlAccount({ ...datas, _id: data?._id })
        .then((res) => {
          if (res.status === 500) {
            toast.error("Something went wrong");
          }
          toast.success(`controlled account updated successfully`);
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
      setOpen(false)
    } else {
      addControlledAccount(datas)
        .then((res) => {
          toast.success("Controlled account added");
          setOpen(false);
          resetForm();
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
      setOpen(false)
    }
  };

  useEffect(() => {
    if (open) {
      if (type === "Edit" && data) {
        formikRef.current.setValues(data);
      } else {
        formikRef.current.resetForm();
      }
    }
  }, [open, data, type]);

  return (
    <ModalLayout
      setOpen={setOpen}
      open={open}
      width={700}
      title={`${type} Account`}
    >
      <Formik
        initialValues={initialValue}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        enableReinitialize={true}
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
                    id="account_name"
                    placeholder="Enter name"
                  />
                  {errors.account_name && touched.account_name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.account_name}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm mb-2">Alias</p>
                  <BorderdInput
                    formik={true}
                    name="alias"
                    id="alias"
                    placeholder="Enter alias"
                  />
                  {errors.alias && touched.alias && (
                    <p className="text-red-500 text-xs mt-1">{errors.alias}</p>
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
                    <p className="text-red-500 text-xs mt-1">
                      {errors.account_code}
                    </p>
                  )}
                </div>

                <div className="flex-1">
                  <p className="text-sm mb-2">Nature of accounts</p>
                  <BorderdSelect
                    onChange={(e) => setFieldValue("nature_of_account", e)}
                    id="nature_of_account"
                    name="nature_of_account"
                    disabled={!!values?.regular_accounts?.[0]?._id}
                    value={values?.nature_of_account}
                    placeholder="Nature of account"
                    items={[
                      { label: "Asset", value: "ASSET" },
                      { label: "Expense", value: "EXPENSE" },
                      { label: "Income", value: "INCOME" },
                      { label: "Liability", value: "LIABILITY" },
                      { label: "Equity", value: "EQUITY" },
                    ]}
                  />
                  {errors.nature_of_account && touched.nature_of_account && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.nature_of_account}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-6 flex items-center gap-6">
                <div className="flex-1">
                  <p className="text-sm mb-2">Description</p>
                  <BorderdTextArea
                    onChange={(e) => {
                      setFieldValue("description", e.target.value);
                    }}
                    value={values?.description}
                    name="description"
                    id="code"
                    placeholder="Enter description"
                  />
                  {errors.description && touched.description && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.description}
                    </p>
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
                    loading={controlledLoading}
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </ModalLayout>
  );
};

export default ControlledAccountModal;
