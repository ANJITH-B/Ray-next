import React, { useState } from "react";
import ModalLayout from "./ModalLayout";
import { Form, Formik } from "formik";
import BorderdInput from "../FormInputs/BorderdInput";
import BorderdSelect from "../FormInputs/BorderdSelect";
import RoundedCheckbox from "../FormInputs/RoundedCheckbox";
import BorderdTextArea from "../FormInputs/BorderdTextArea";
import Button from "../FormInputs/Button";
import RefrenceDetialsModal from "./RefrenceDetialsModal";
import { useAddCustomer } from "../../Queries/CustomerQuery/CustomerQuery";
import { toast } from "react-hot-toast";

const AddCustomerModal = ({ open, setOpen }) => {
  const [refrenceOpen, setRefrenceOpen] = useState(false);
  const initialValues = {
    name: "",
    account_code: "",
    under_group: "",
    origin: "",
    credit_limit_amount: "",
    credit_limit_days: "",
    opening_balance: "",
    debit_or_credit: "",
    sales_man: "",
    contact_person: "",
    designation: "",
    contact_number: "",
    email: "",
    telephone: "",
    fax: "",
    email_office: "",
    address: "",
    reference_number: "",
    date: "",
    due_date: "",
    description: "",
    amount: "",
    period:''
  };

  const { mutateAsync: addCustomer, isLoading } = useAddCustomer();

  const handleSubmit = (values,{resetForm}) => {
    const data = {
      name: values.name,
      account_code: values.account_code,
      under_group: values.under_group,
      origin: values.origin,

      credit_limit_amount: values.credit_limit_amount,
      credit_limit_days: values.credit_limit_days,
      opening_balance: values.opening_balance,
      debit_or_credit: values.debit_or_credit,
      sales_man: values.sales_man,
      contact_details: {
        contact_person: values.contact_person,
        designation: values.designation,
        contact_number: values.contact_number,
        email: values.email,
      },
      office_details: {
        telephone: values.telephone,
        fax: values.fax,
        email: values.email_office,
        address: values.address,
      },
      reference_details: {
        reference_number: values.reference_number,
        date: values.date,
        due_date: values.due_date,
        description: values.description,
        amount: values.amount,
      },
    };

    addCustomer(data)
      .then((res) => {
        if (res.status === 500) {
          toast.error("Something went wrong");
        } else {
          toast.success("Customer Added");
          resetForm()
          setOpen(false);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  return (
    <ModalLayout
      width={1200}
      title={"Add customer"}
      setOpen={setOpen}
      open={open}
    >
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {({ setFieldValue, values }) => (
          <Form>
            <div className=" w-full  bg-white rounded-xl ">
              <div className="flex gap-12 w-full">
                <div className="flex-1">
                  <div className="mb-6">
                    <p className="text-sm mb-2">Name</p>
                    <BorderdInput
                      formik={true}
                      name="name"
                      id="name"
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="mb-6 flex items-center gap-6">
                    <div className="flex-1">
                      <p className="text-sm mb-2">Account code</p>
                      <BorderdInput
                        formik={true}
                        name="account_code"
                        id="code"
                        placeholder="#12345"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm mb-2">Under group</p>
                      <BorderdSelect
                        onChange={(e) => setFieldValue("under_group", e)}
                        id="name"
                        placeholder="Select"
                      />
                    </div>
                  </div>
                  <div className="mb-6 flex items-center gap-6">
                    <div className="flex-1">
                      <p className="text-sm mb-2">Origin</p>
                      <BorderdSelect
                        onChange={(e) => setFieldValue("origin", e)}
                        id="name"
                        placeholder="Select"
                      />
                    </div>
                    <div className="flex-[.7]">
                      <p className="text-sm mb-2">Credit period</p>
                      <BorderdInput
                        formik={true}
                        name="period"
                        id="name"
                        placeholder="Enter days"
                      />
                    </div>
                  </div>
                  <div className="mb-6 flex items-center gap-6">
                    <div className="flex-1">
                      <p className="text-sm mb-2">Credit limit amount</p>
                      <BorderdInput
                        formik={true}
                        name="credit_limit_amount"
                        id="name"
                        placeholder="Enter amount"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm mb-2">Credit limit days</p>
                      <BorderdInput
                        formik={true}
                        name="credit_limit_days"
                        id="name"
                        placeholder="Enter limit"
                      />
                    </div>
                  </div>
                  <div className="mb-6 flex items-center gap-6">
                    <div className="flex-1">
                      <p className="text-sm mb-2">Opening balance</p>
                      <BorderdInput
                        formik={true}
                        name="opening_balance"
                        id="name"
                        placeholder="Enter amount"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm mb-2">Choose Debit/Credit</p>
                      <BorderdSelect
                        onChange={(e) => setFieldValue("debit_or_credit", e)}
                        id="name"
                        placeholder="Select"
                      />
                    </div>
                  </div>
                  <div className="mb-6 flex items-center gap-6">
                    <div className="flex-1">
                      <p className="text-sm mb-2">Sales man</p>
                      <BorderdSelect
                        onChange={(e) => setFieldValue("sales_man", e)}
                        id="name"
                        placeholder="Select"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <RoundedCheckbox />
                    <p>Block credit transaction</p>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-4 text-lg font-semibold">
                    <h1>Contact details</h1>
                  </div>
                  <div>
                    <div className="mb-6 flex items-center gap-6">
                      <div className="flex-1">
                        <p className="text-sm mb-2">Contact person</p>
                        <BorderdInput
                          formik={true}
                          name="contact_person"
                          id="name"
                          placeholder="Enter name"
                        />
                      </div>
                    </div>
                    <div className="mb-6 flex flex-1 items-center gap-6">
                      <div className="">
                        <p className="text-sm mb-2">Designation</p>
                        <BorderdInput
                          formik={true}
                          id="name"
                          placeholder="Enter designation"
                          name="designation"
                        />
                      </div>
                      <div className="">
                        <p className="text-sm mb-2">Contact number</p>
                        <BorderdInput
                          formik={true}
                          name="contact_number"
                          id="name"
                          placeholder="Enter number"
                        />
                      </div>
                      <div className="">
                        <p className="text-sm mb-2">Email</p>
                        <BorderdInput
                          formik={true}
                          name="email"
                          id="name"
                          placeholder="Enter email"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 text-lg font-semibold">
                    <h1>Office details</h1>
                  </div>
                  <div>
                    <div className="mb-6 flex flex-1 items-center gap-6">
                      <div className="">
                        <p className="text-sm mb-2">Telephone</p>
                        <BorderdInput
                          formik={true}
                          name="telephone"
                          id="name"
                          placeholder="Enter number"
                        />
                      </div>
                      <div className="">
                        <p className="text-sm mb-2">Fax</p>
                        <BorderdInput
                          formik={true}
                          name="fax"
                          id="name"
                          placeholder="Add fax"
                        />
                      </div>
                      <div className="">
                        <p className="text-sm mb-2">Email</p>
                        <BorderdInput
                          formik={true}
                          name="email_office"
                          id="name"
                          placeholder="Enter email"
                        />
                      </div>
                    </div>

                    <div className="mb-6  flex items-center gap-6">
                      <div className="flex-1">
                        <p className="text-sm mb-2">Address</p>
                        <div className="w-full h-[8rem]">
                          <BorderdTextArea
                            id="name"
                            name="address"
                            placeholder="Enter address"
                            onChange={(e)=>setFieldValue('address',e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className=" flex w-full items-center justify-end gap-6">
                    <div className="">
                      <Button
                        background={"bg-light-gray "}
                        text={"Reference details"}
                        onClick={() => setRefrenceOpen(true)}
                        type="button"
                      />
                    </div>
                    <div className="flex-[.3]">
                      <Button
                        background={"bg-blue text-white"}
                        text={"Save"}
                        loading={isLoading}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <RefrenceDetialsModal
                setFieldValue={setFieldValue}
                open={refrenceOpen}
                setOpen={setRefrenceOpen}
              />
            </div>
          </Form>
        )}
      </Formik>
    </ModalLayout>
  );
};

export default AddCustomerModal;
