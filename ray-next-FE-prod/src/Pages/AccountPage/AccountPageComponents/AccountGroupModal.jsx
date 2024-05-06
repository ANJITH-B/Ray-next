import React from "react";
import ModalLayout from "../../../CommonComponents/OtherComponent/ModalLayout";
import { Form, Formik } from "formik";
import BorderdInput from "../../../CommonComponents/FormInputs/BorderdInput";
import BorderdTextArea from "../../../CommonComponents/FormInputs/BorderdTextArea";
import Button from "../../../CommonComponents/FormInputs/Button";
import RoundedCheckbox from "../../../CommonComponents/FormInputs/RoundedCheckbox";
import BorderdSelect from "../../../CommonComponents/FormInputs/BorderdSelect";
import {
  useAddAccountGroup,
  useAddControlledAccount,
  useAddRegularAccount,
  useGetControlAccount,
  useGetRegularAccount,
} from "../../../Queries/AccountQuery/AccountQuery";
import { toast } from "react-hot-toast";
import { addAccountGroup } from "../../../Queries/AccountQuery/accountUrls";

const AccountGroupModal = ({ open, setOpen }) => {
  const initialValue = {
    group_id: "",
    group_name: "",
    group_description: "",
    sub_accounts: '',
  };

  const { mutateAsync: addGroup, isLoading } = useAddAccountGroup();

  const { data } = useGetRegularAccount({ pageNo: 1, pageCount: 100 });
 
  const parrentData = data?.data?.data?.map((e) => {
    return {
      label: e?.account_name,
      value: e._id,
    };
  });
  const handleSubmit = (values, { resetForm }) => {
    const datas = {
      group_id: values?.group_id,
      group_name: values?.group_name,
      group_description: values?.group_description,
      sub_accounts: [values?.sub_accounts],
    };

    addGroup(datas)
      .then((res) => {
        toast.success("Regular account added");
        setOpen(false);
        resetForm();
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  return (
    <ModalLayout
      setOpen={setOpen}
      open={open}
      width={700}
      title={"New Account Group"}
    >
      <div>
        <div>
          <Formik initialValues={initialValue} onSubmit={handleSubmit}>
            {({ setFieldValue, values }) => (
              <Form>
                <div>
                  <div className="mb-6 flex items-center gap-6">
                    <div className="flex-1">
                      <p className="text-sm mb-2">Group name</p>
                      <BorderdInput
                        formik={true}
                        name="group_name"
                        id="code"
                        placeholder="Enter name"
                      />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm mb-2">Group Id</p>
                      <BorderdInput
                        formik={true}
                        name="group_id"
                        id="code"
                        placeholder="Enter Group Id"
                      />
                    </div>
                  </div>
                  <div className="mb-6 flex items-center gap-6">
                    
                    <div className="flex-1">
                      <p className="text-sm mb-2">Account code</p>
                      <BorderdSelect
                        // mode="multiple"
                        onChange={(e) => setFieldValue("sub_accounts", e)}
                        id="name"
                        placeholder="Select Account"
                        items={parrentData}
                      />
                    </div>
                  </div>
                  <div className="mb-6 flex items-center gap-6">
                    <div className="flex-1">
                      <p className="text-sm mb-2">Group Description</p>
                      <BorderdTextArea
                        //   formik={true}
                        onChange={(e) => {
                          setFieldValue("group_description", e.target.value);
                        }}
                        value={values.group_description}
                        name="group_description"
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
                        loading={isLoading }
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

export default AccountGroupModal;
