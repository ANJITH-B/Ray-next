import React, { useState } from "react";
import ModalLayout from "./ModalLayout";
import BorderdInput from "../FormInputs/BorderdInput";
import Button from "../FormInputs/Button";
import RefrenceDetialsModal from "./RefrenceDetialsModal";

const SettilemantModal = ({ data,open, setOpen }) => {
  const [refrence,setRefrence]= useState(false)
  return (
    <ModalLayout
      setOpen={setOpen}
      open={open}
      title={"Settlements & references"}
      width={600}
    >
      <div>
        <div className="mb-6 flex items-center gap-6">
          <div className="w-full">
            <p className="text-sm mb-2">Account code</p>
            <div className="border-[2px]  focus-within:border-blue transition-all border-border-gray rounded-xl">
                <button  className="flex items-center justify-between w-full px-3 py-[8px]  ">
                  <p className="text-gray text-lg">00.0DR</p>
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.68262 12.9396L6.57262 8.04957C7.15012 7.47207 7.15012 6.52707 6.57262 5.94957L1.68262 1.05957"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
          </div>
          <div className="w-full">
            <p className="text-sm mb-2">Account code</p>
            <div className="border-[2px]  focus-within:border-blue transition-all border-border-gray rounded-xl">
                <button onClick={()=>setRefrence(true)} className="flex items-center justify-between w-full px-3 py-[8px]  ">
                  <p className="text-gray text-lg">00.0DR</p>
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.68262 12.9396L6.57262 8.04957C7.15012 7.47207 7.15012 6.52707 6.57262 5.94957L1.68262 1.05957"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
          </div>
        </div>
        <div className="flex w-full gap-3 flex-col items-end">
          <div className="flex items-center gap-2">
            <p className="text-lg">On account:</p>
            <p className="text-lg font-semibold">33,56753.00 Cr</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-lg">Balance:</p>
            <p className="text-lg font-semibold">453453.00 Cr</p>
          </div>
          <div className=" flex w-full items-center justify-end gap-6">
            <div className="flex-[.2]">
              <Button background={"bg-blue text-white"} onClick={()=>setOpen(false)} text={"Save"} />
            </div>
          </div>
        </div>
        <RefrenceDetialsModal data={data}  open={refrence} setOpen={setRefrence}/>
      </div>
    </ModalLayout>
  );
};

export default SettilemantModal;
