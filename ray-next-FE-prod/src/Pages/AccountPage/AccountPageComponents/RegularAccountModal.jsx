import React from "react";
import ModalLayout from "../../../CommonComponents/OtherComponent/ModalLayout";
import { Form, Formik } from "formik";
import BorderdInput from "../../../CommonComponents/FormInputs/BorderdInput";
import BorderdTextArea from "../../../CommonComponents/FormInputs/BorderdTextArea";
import Button from "../../../CommonComponents/FormInputs/Button";
import RoundedCheckbox from "../../../CommonComponents/FormInputs/RoundedCheckbox";
import BorderdSelect from "../../../CommonComponents/FormInputs/BorderdSelect";
import {
  useAddControlledAccount,
  useAddRegularAccount,
  useGetControlAccount,
} from "../../../Queries/AccountQuery/AccountQuery";
import { toast } from "react-hot-toast";

const RegularAccountModal = ({ open, setOpen, isCotrolled = false }) => {
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

  const { mutateAsync: addRegularAccount, isLoading } = useAddRegularAccount();
  const { mutateAsync: addControlledAccount, isLoading: controlledLoading } =
    useAddControlledAccount();

  const { data } = useGetControlAccount();

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
      opening_balance: data?.data?.data?.find((e) => {
        return values?.parent_account_id === e.parent_account_id;
      })?.current_balance,
      opening_balance_type: "CR",
    };
    if (isCotrolled) {
      addControlledAccount(datas)
        .then((res) => {
          toast.success("Controlled account added");
          setOpen(false);
          resetForm();
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
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
    }
  };

  return (
    <ModalLayout
      setOpen={setOpen}
      open={open}
      width={700}
      title={"Add account"}
    >
      <div>
        <div>
          <Formik initialValues={initialValue} onSubmit={handleSubmit}>
            {({ setFieldValue, values }) => (
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
                    </div>

                    <div className="flex-1">
                      <p className="text-sm mb-2">Alias</p>
                      <BorderdInput
                        formik={true}
                        name="alias"
                        id="code"
                        placeholder="Enter alias"
                      />
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
                    </div>

                    <div className="flex-1">
                      <p className="text-sm mb-2">Account code</p>
                      <BorderdSelect
                        onChange={(e) => setFieldValue("parent_account_id", e)}
                        id="name"
                        placeholder="Sub account of"
                        items={parrentData}
                      />
                    </div>
                  </div>
                  <div className="mb-6 flex items-center gap-6">
                    <div className="flex-1">
                      <p className="text-sm mb-2">Description</p>
                      <BorderdTextArea
                        //   formik={true}
                        onChange={(e) => {
                          setFieldValue("description", e.target.value);
                        }}
                        value={values.description}
                        name="description"
                        id="code"
                        placeholder="Enter description"
                      />
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
                        loading={isLoading || controlledLoading}
                      />
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </ModalLayout>
  );
};

export default RegularAccountModal;
