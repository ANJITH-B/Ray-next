import React from "react";
import ModalLayout from "./ModalLayout";
import BorderdInput from "../FormInputs/BorderdInput";
import { DatePicker } from "antd";
import BorderdDatePicker from "../FormInputs/BorderdDatePicker";
import BorderdTextArea from "../FormInputs/BorderdTextArea";
import Button from "../FormInputs/Button";

const RefrenceDetialsModal = ({ setFieldValue, open, setOpen }) => {
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
            <p className="text-sm mb-2">Refrence number</p>
            <BorderdInput
              name="reference_number"
              id="name"
              placeholder="Enter designation"
            />
          </div>
          <div className="w-full">
            <p className="text-sm mb-2">Date</p>
            <BorderdDatePicker
              onChange={(e, date) => setFieldValue("date", date)}
            />{" "}
          </div>
          <div className="w-full">
            <p className="text-sm mb-2">Due date</p>
            <BorderdDatePicker
              onChange={(e, date) => setFieldValue("due_date", date)}
            />{" "}
          </div>
        </div>
        <div className="mb-6  flex items-center gap-6">
          <div className="flex-1">
            <p className="text-sm mb-2">Discription</p>
            <div className="w-full h-[8rem]">
              <BorderdTextArea
                name="description"
                id="name"
                placeholder="Enter address"
              />
            </div>
          </div>
        </div>
        <div className="mb-6 flex w-full items-center gap-6">
          <div className="w-full">
            <p className="text-sm mb-2">Amount</p>
            <BorderdInput
              name="amount"
              sufixIcon={<p className="text-lg text-gray">$</p>}
              id="name"
              placeholder="Enter designation"
            />
          </div>
        </div>
        <div className=" flex w-full items-center justify-end gap-6">
          <div className="">
            <Button
              onClick={() => setOpen(false)}
              background={"bg-blue text-white"}
              text={"Save"}
              
            />
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default RefrenceDetialsModal;
