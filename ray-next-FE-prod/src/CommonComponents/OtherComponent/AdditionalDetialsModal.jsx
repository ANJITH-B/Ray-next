import React, { useState } from "react";
import ModalLayout from "./ModalLayout";
import BorderdInput from "../FormInputs/BorderdInput";
import BorderdTextArea from "../FormInputs/BorderdTextArea";
import RoundedCheckbox from "../FormInputs/RoundedCheckbox";
import Button from "../FormInputs/Button";
import BillWiseModal from "./BillWiseModal";

const AdditionalDetialsModal = ({ formik, open, setOpen }) => {
  const [billOpen, setBillOpen] = useState(false);
  return (
    <ModalLayout
      width={900}
      setOpen={setOpen}
      title={"Additional details"}
      open={open}
    >
      <div>
        <div className="mb-6 flex items-center gap-6">
          <div className="flex-[.4]">
            <p className="text-sm mb-2">Credit Point</p>
            <BorderdInput
              onChange={formik.handleChange}
              name="credit_point"
              value={formik.values.credit_point}
              id="code"
              placeholder="#12345"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm mb-2">Addresse</p>
            <BorderdInput
              onChange={formik.handleChange}
              name="address"
              value={formik.values.address}
              id="code"
              placeholder="Enter address"
            />
          </div>
        </div>
        <div className="mb-6  flex items-center gap-6">
          <div className="flex-1">
            <p className="text-sm mb-2">Notes</p>
            <div className="w-full h-[12rem]">
              <BorderdTextArea
                onChange={formik.handleChange}
                name="notes"
                value={formik.values.notes}
                id="name"
                placeholder="Enter notes"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex w-full items-center gap-4">
            <div className="flex items-center gap-3">
              <RoundedCheckbox />
              <p>Use customer as default</p>
            </div>
            <div className="flex items-center gap-3">
              <RoundedCheckbox />
              <p>Auto select last format on print</p>
            </div>
          </div>
          <div className=" flex w-full items-center justify-end gap-6">
            <div className="">
              <Button
                background={"bg-light-gray "}
                text={"Bill wise details"}
                onClick={() => setBillOpen(true)}
              />
            </div>
            <div className="flex-[.2]">
              <Button onClick={()=>setOpen(false)} background={"bg-blue text-white"} text={"Save"} />
            </div>
          </div>
        </div>
        <BillWiseModal formik={formik} open={billOpen} setOpen={setBillOpen} />
      </div>
    </ModalLayout>
  );
};

export default AdditionalDetialsModal;
