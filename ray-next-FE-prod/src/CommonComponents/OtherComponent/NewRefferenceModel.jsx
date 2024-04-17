import React, { useEffect, useState } from 'react';
import { Button, Modal, Tooltip } from 'antd';
import CerditDebitTable from '../Tables/CerditDebitTable';
import BorderdSelect from '../FormInputs/BorderdSelect';
import BorderdInput from '../FormInputs/BorderdInput';
import { onlyNumbers } from '../../Utilities/inputRestrictions';
import editsvg from "../../Assets/CommonImages/edit.svg";
import trash from "../../Assets/CommonImages/trash.svg";
import { v4 } from 'uuid';
import BorderdDatePicker from '../FormInputs/BorderdDatePicker';
import dayjs from 'dayjs';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Badge, Space, Switch } from 'antd';

const NewRefferenceModel = ({ open, setOpen, formik, total, type, setReference }) => {
   //   const [open, setOpen] = useState(false);
   const [amt, setAmt] = useState(0);
   const [values, setValues] = useState({ dirty: false, isError: [] });
   const [edit, setEdit] = useState(false);
   const [item, setItem] = useState([]);

   const addItem = () => {
      console.log(item);
      if (amt >= total) return
      setItem((prev) => [
         ...prev,
         {
            date: null,
            ref_no: "",
            due_date: null,
            description: "",
            amount: '',
         },
      ]);
      setEdit(item?.length);
   }
   useEffect(() => {
      let total = 0
      item?.map(x => {
         total += x.amount ? parseInt(x.amount) : 0
      })
      console.log(total);
      setAmt(total)
      if (!edit) {
      }
   }, [item])
   const updateData = (rowIndex, key, value) => {
      const updatedData = [...item];
      updatedData[rowIndex][key] = value;
      setItem(updatedData);
   };

   const columns = [
      {
         title: "Date",
         key: "Date",
         dataIndex: "date",
         className: "w-[15rem]",
         render: (item, record, index) => {
            return (
               <div className="w-full">
                  {edit === index ? (
                     <>
                        <BorderdDatePicker
                           placeholder='dd-mm--yyyy'
                           error={
                              !values?.isError?.includes("date") && values.dirty
                                 ? "Please enter Date"
                                 : false
                           }
                           defaultValue={(record["date"] ? dayjs(record["date"]) : null)}
                           onChange={(e, date) => updateData(index, "date", date)}
                        />
                     </>
                  ) : (
                     <p>{record["date"]}</p>
                  )}
               </div>
            );
         },
      },
      {
         title: "Ref No",
         key: "Ref_no",
         dataIndex: "ref_no",
         className: "w-[9rem]",
         render: (item, record, index) => {
            return (
               <div className="maxw">
                  {/* {console.log(record)} */}
                  {edit === index ? (
                     <BorderdInput
                        placeholder={"Ref No"}
                        error={
                           !values?.isError?.includes("ref_no") && values.dirty
                              ? "Please enter Ref No"
                              : false
                        }
                        defaultValue={record["ref_no"]}
                        onChange={(e) => updateData(index, "ref_no", e.target.value)}
                        onInput={onlyNumbers}
                     />
                  ) : (
                     <p>{record["ref_no"]}</p>
                  )}
               </div>
            );
         },
      },

      {
         title: "Description",
         key: "Description",
         dataIndex: "description",
         className: "w-[9rem]",
         render: (item, record, index) => {
            console.log(item);
            return (
               <div className="maxw">
                  {edit === index ? (
                     <BorderdInput
                        placeholder={"Description"}
                        error={
                           !values?.isError?.includes("description") && values.dirty
                              ? "Please enter Description"
                              : false
                        }
                        defaultValue={record["description"]}
                        onChange={(e) => updateData(index, "description", e.target.value)}
                     />
                  ) : (
                     <p>{record["description"]}</p>
                  )}
               </div>
            );
         },
      },
      {
         title: "Due Date",
         key: "Due Date",
         dataIndex: "due_date",
         className: "w-[15rem]",
         render: (item, record, index) => {
            console.log(item);
            return (
               <div className="w-full">
                  {edit === index ? (
                     <BorderdDatePicker
                        placeholder='dd-mm--yyyy'
                        onChange={(e, date) => updateData(index, "due_date", date)}
                        defaultValue={(record["due_date"] ? dayjs(record["due_date"]) : null)}

                     />
                  ) : (
                     <p>{record["due_date"]}</p>
                  )}
               </div>
            );
         },
      },
      {
         title: "Amount",
         key: "Amount",
         dataIndex: "amount",
         className: "w-[9rem]",
         render: (item, record, index) => {
            return (
               <div className="maxw">
                  {edit === index ? (
                     <BorderdInput
                        placeholder={"Amount"}
                        error={
                           !values?.isError?.includes("amount") && values.dirty
                              ? "Please enter Amount"
                              : false
                        }
                        defaultValue={record["amount"] !== null ? record["amount"] : 0}

                        onChange={(e) => updateData(index, "amount", e.target.value)}
                        onInput={onlyNumbers}
                     />
                  ) : (
                     <p>{record["amount"]}</p>
                  )}
               </div>
            );
         },
      },
      {
         title: null,
         key: "action",
         dataIndex: "action",
         className: "w-[3rem]",
         render: (_, record, index) => {
            return (
               <div className="">
                  {edit !== index ? (
                     <div className="flex items-center gap-5">
                        <button className="" onClick={() => setEdit(index)}>
                           <img src={editsvg} alt="edit" className="min-w-[18px]" />
                        </button>
                        <button
                           onClick={() =>
                              setItem(() =>
                                 item?.filter((e, i) => {
                                    return i !== index;
                                 })
                              )
                           }
                        >
                           <img src={trash} className="min-w-[18px]" alt="trash" />
                        </button>
                     </div>
                  ) : (
                     <div>
                        <button
                           className=""
                           onClick={() => {
                              setValues((pre) => ({
                                 dirty: true,
                                 isError: Object.keys(record)?.filter(
                                    (e) => record[e] !== ""
                                 ),
                              }));
                              if (
                                 record["date"] === "" ||
                                 record["ref_no"] === "" ||
                                 record["due_date"] === "" ||
                                 record["description"] === "" ||
                                 record["amount"] === ""
                              ) {
                                 return false;
                              } else {
                                 setEdit(false);
                                 addItem()
                              }
                           }}
                        >
                           <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <path
                                 d="M8.99996 0.666992C4.40829 0.666992 0.666626 4.40866 0.666626 9.00033C0.666626 13.592 4.40829 17.3337 8.99996 17.3337C13.5916 17.3337 17.3333 13.592 17.3333 9.00033C17.3333 4.40866 13.5916 0.666992 8.99996 0.666992ZM12.9833 7.08366L8.25829 11.8087C8.1411 11.9257 7.98225 11.9914 7.81663 11.9914C7.651 11.9914 7.49215 11.9257 7.37496 11.8087L5.01663 9.45033C4.90039 9.33271 4.83521 9.17402 4.83521 9.00866C4.83521 8.8433 4.90039 8.68461 5.01663 8.56699C5.25829 8.32533 5.65829 8.32533 5.89996 8.56699L7.81663 10.4837L12.1 6.20033C12.3416 5.95866 12.7416 5.95866 12.9833 6.20033C13.225 6.44199 13.225 6.83366 12.9833 7.08366Z"
                                 fill="#4A9CE8"
                              />
                           </svg>
                        </button>
                     </div>
                  )}
               </div>
            );
         },
      },
   ];


   return (
      <Modal
         className="modal-head" rootClassName="p-6"

         zIndex={9999}
         title={<h1 style={{ fontSize: '24px' }}>New Reference</h1>}
         centered
         open={open}
         onOk={() => setOpen(false)}
         onCancel={() => setOpen(false)}
         width={1000}
         style={{ borderRadius: '20px' }}
         footer={[
            <Badge>
               <h1 className={`mr-10 px-3 bg-opacity-20 text-xs font-medium rounded-xl py-1 ${type === "CR" ? "bg-[#12B13F] text-[#12B13F]" : "bg-[#D7261B] text-[#D7261B]"}`} >
                  {type === "DR" ? 'Debit' : 'Credit'}
               </h1>
            </Badge>,
            <Badge className='mr-20 text-lg font-bold'>$ {total}</Badge>,
            <Badge className='mr-20 text-lg font-bold'>$ {amt}</Badge>,
            <button onClick={() => {
               if (amt === total) {
                  setReference(item)
                  setOpen(false)
               }
            }}
               disabled={edit === false}
               className=" px-4 2xl:px-6 py-2 2xl:py-3 text-sm 2xl:text-base rounded-full border hover:bg-light-gray transition-all  bg-blue text-white"
               type="button"
            >
               Save
            </button>
         ]}
      >
         <div>
            <div className="mb-2 flex w-full items-center justify-between">
               <p className=" text-lg 2xl:text-[24px] font-semibold">Reference</p>

               <button
                  onClick={() => addItem()}
                  className=" px-4 2xl:px-6 py-2 2xl:py-3 text-sm 2xl:text-base rounded-full border hover:bg-light-gray transition-all"
               // disabled={edit === false ? false : true}
               >
                  {formik?.errors.transactions ? (
                     <div
                        className={`${formik?.errors.transactions
                           ? "pointer-events-auto opacity-100"
                           : "pointer-events-none opacity-0"
                           } cursor-pointer `}
                     >
                        <Tooltip
                           trigger={"hover"}
                           title={formik?.errors.transactions}
                           color="white"
                           className="error-tooltip flex items-center gap-2"
                        >
                           Add Items
                           <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <path
                                 d="M9 6V9.75M9 16.5C13.125 16.5 16.5 13.125 16.5 9C16.5 4.875 13.125 1.5 9 1.5C4.875 1.5 1.5 4.875 1.5 9C1.5 13.125 4.875 16.5 9 16.5Z"
                                 stroke="#F42F2F"
                                 stroke-width="1.5"
                                 stroke-linecap="round"
                                 stroke-linejoin="round"
                              />
                           </svg>
                        </Tooltip>
                     </div>
                  ) : (
                     " Add Items"
                  )}
               </button>
            </div>
            <CerditDebitTable columns={columns} data={item || []} />
         </div>
      </Modal>
   );
};

export default NewRefferenceModel;