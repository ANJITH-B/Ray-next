import React from "react";
import ModalLayout from "./ModalLayout";
import BorderdInput from "../FormInputs/BorderdInput";
import BorderdSelect from "../FormInputs/BorderdSelect";
import BorderdTextArea from "../FormInputs/BorderdTextArea";
import Button from "../FormInputs/Button";

const OtherChargesModal = ({ open, setOpen, formik }) => {
  return (
    <ModalLayout
      width={800}
      setOpen={setOpen}
      open={open}
      title={"Other charges"}
    >
      <div>
        <div className="mb-6 flex w-full items-center gap-6">
          <div className="w-full">
            <p className="text-sm mb-2">Account</p>
            <BorderdSelect
              onChange={(e) => {
                formik.setFieldValue("account", e);
              }}
              value={formik.account}
              id="name"
              placeholder="Select"
            />
          </div>

          <div className="w-full">
            <p className="text-sm mb-2">Method</p>
            <BorderdSelect
              onChange={(e) => {
                formik.setFieldValue("method", e);
              }}
              value={formik.method}
              id="name"
              placeholder="Select"
            />
          </div>
        </div>
        <div className="mb-6  flex items-center gap-6">
          <div className="flex-1">
            <p className="text-sm mb-2">Discription</p>
            <div className="w-full h-[8rem]">
              <BorderdTextArea
                onChange={formik.handleChange}
                name="description_other"
                value={formik.values.description_other}
                placeholder="Enter address"
              />
            </div>
          </div>
        </div>
        <div className="mb-6 flex w-full items-center gap-6">
          <div className="w-full">
            <p className="text-sm mb-2">Amount</p>
            <BorderdInput
              sufixIcon={<p className="text-lg text-gray">$</p>}
              placeholder="Enter designation"
              onChange={formik.handleChange}
              name="amount"
              value={formik.values.amount}
            />
          </div>
        </div>
        <div className=" flex w-full items-center justify-end gap-6">
          <div className="">
            <Button onClick={()=>setOpen(false)} background={"bg-blue text-white"} text={"Save"} />
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default OtherChargesModal;
