import React from "react";
import ModalLayout from "./ModalLayout";
import BorderdInput from "../FormInputs/BorderdInput";
import BorderdDatePicker from "../FormInputs/BorderdDatePicker";
import BorderdTextArea from "../FormInputs/BorderdTextArea";
import Button from "../FormInputs/Button";

const BillWiseModal = ({ open, setOpen }) => {
  return (
    <ModalLayout
      width={800}
      setOpen={setOpen}
      open={open}
      title={"Reference details"}
    >
      <div>
        <div className="mb-6 flex w-full items-center gap-6">
          <div className="w-full">
            <p className="text-sm mb-2">Reference number</p>
            <BorderdInput id="name" placeholder="Enter designation" />
          </div>
          <div className="w-full">
            <p className="text-sm mb-2">Date</p>
            <BorderdDatePicker />{" "}
          </div>
          <div className="w-full">
            <p className="text-sm mb-2">Due date</p>
            <BorderdInput id="name" placeholder="Enter email" />
          </div>
        </div>
        <div className="mb-6  flex items-center gap-6">
          <div className="flex-1">
            <p className="text-sm mb-2">Description</p>
            <div className="w-full h-[8rem]">
              <BorderdTextArea id="name" placeholder="Enter address" />
            </div>
          </div>
        </div>
        <div className="mb-6 flex w-full items-center gap-6">
          <div className="w-full">
            <p className="text-sm mb-2">Amount</p>
            <BorderdInput
              sufixIcon={<p className="text-lg text-gray">$</p>}
              id="name"
              placeholder="Enter designation"
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

export default BillWiseModal;
