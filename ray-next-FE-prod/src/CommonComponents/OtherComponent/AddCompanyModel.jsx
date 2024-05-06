import React, { useState } from "react";
import ModalLayout from "./ModalLayout";
import BorderdInput from "../FormInputs/BorderdInput";
import BorderdSelect from "../FormInputs/BorderdSelect";
import { Form, Formik } from "formik";
import Button from "../FormInputs/Button";
import { useAddInventory } from "../../Queries/InventoryQuery/InventoryQuery";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import BorderdDatePicker from "../FormInputs/BorderdDatePicker";

const companyValidation = () => {
   return Yup.object().shape({
      name: Yup.string().required("Name is required"),
      location: Yup.string().required("location is required"),
      // start_of_acc_books: Yup.string().required("Account books start date is required"),
   });
};
const AddCompanyModel = ({ setOpen, open }) => {
   const [imgPreview, setImgPreview] = useState("");
   const initialValue = {
      name: "",
      location: "",
      country: "",
      start_of_acc_books: "",
      logo: "",
   };
   const [value, setValue] = useState();

   const handleChange = (dates) => {
      setValue(dates);
    };
   const { mutateAsync: addInventory, isLoading } = useAddInventory();
   const handleSubmit = (values) => {
      if(!value){
         toast.error("Account Books start date is required")
         return
      }
      const data = {
         name: values?.name,
         location: values?.location,
         country: values?.country,
         start_of_acc_books: value,
      };
      localStorage.setItem("accstartdate", JSON.stringify(value));
      setOpen(false)
      // addInventory(data)
      //    .then((res) => {
      //       if (res?.status === 500) {
      //          toast.error("Somthing went wrong");
      //       } else {
      //          toast.success("Inventory added");
      //          setOpen(false);
      //       }
      //    })
      //    .catch((err) => {
      //       toast.error("Somthing went wrong");
      //    });
   };

   return (
      <ModalLayout
         width={800}
         setOpen={setOpen}
         open={open}
         title={"Company Details"}
      >
         <Formik
            initialValues={initialValue}
            validationSchema={companyValidation}
            onSubmit={handleSubmit}
         >
            {({ errors, setFieldValue, values }) => (
               <Form>
                  <div className=" flex gap-12">
                     <div className="flex-1">
                        <div className="mb-6 flex items-center gap-6">
                           <div className="flex-1">
                              <p className="text-sm mb-2">Company name</p>
                              <BorderdInput
                                 formik={true}
                                 name="name"
                                 error={errors.name}
                                 id="name"
                                 placeholder="Enter name"
                              />
                           </div>
                        </div>
                        <div className="mb-6 flex items-center gap-6">
                           <div className="flex-1">
                              <p className="text-sm mb-2">Location</p>
                              <BorderdInput
                                 formik={true}
                                 name="location"
                                 error={errors.location}
                                 id="location"
                                 placeholder="Enter location"
                              />
                           </div>
                           <div className="flex-1">
                              <p className="text-sm mb-2">Country of origin</p>
                              <BorderdSelect
                                 onChange={(e) => setFieldValue("country", e)}
                                 id="country"
                                 placeholder="Select"
                                 items={[{ label: "India", value: "India" }]}
                              />
                           </div>
                        </div>
                        <div className="mb-2 flex items-center gap-6">
                           <div className="flex-1">
                              <p className="text-sm mb-2">Set Account Books start date to record Transactions</p>
                              <BorderdDatePicker
                                 formik={true}
                                 onChange={handleChange}
                                 name="start_of_acc_books"
                                 error={errors.start_of_acc_books}
                                 id="start_of_acc_books"
                                 placeholder="Enter Acc books start date"
                              />                              
                              <p className="text-gray text-gray-100">( note: the date selected cannot be modified later )</p>
                           </div>
                        </div>

                        <div className="mb-6">
                           <p className="mb-4 font-medium text-xl">Company Logo</p>
                           <div className="w-full overflow-hidden h-[131px] border-2 border-dashed rounded-xl border-border-gray flex items-center justify-center">
                              <input
                                 onChange={(e) => {
                                    setImgPreview(URL.createObjectURL(e.target.files[0]));
                                 }}
                                 type="file"
                                 hidden
                                 id="logo"
                              />
                              <label
                                 className="flex flex-col items-center cursor-pointer w-full h-full justify-center"
                                 htmlFor="logo"
                              >
                                 <div>
                                    {imgPreview ? (
                                       <img src={imgPreview} alt="image" />
                                    ) : (
                                       <svg
                                          width="56"
                                          height="56"
                                          viewBox="0 0 56 56"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                       >
                                          <path
                                             d="M20.9994 51.3346H34.9994C46.666 51.3346 51.3327 46.668 51.3327 35.0013V21.0013C51.3327 9.33464 46.666 4.66797 34.9994 4.66797H20.9994C9.33268 4.66797 4.66602 9.33464 4.66602 21.0013V35.0013C4.66602 46.668 9.33268 51.3346 20.9994 51.3346Z"
                                             stroke="#CDCDCD"
                                             strokeWidth="3"
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                          />
                                          <path
                                             d="M21.0007 23.3333C23.578 23.3333 25.6673 21.244 25.6673 18.6667C25.6673 16.0893 23.578 14 21.0007 14C18.4233 14 16.334 16.0893 16.334 18.6667C16.334 21.244 18.4233 23.3333 21.0007 23.3333Z"
                                             stroke="#CDCDCD"
                                             strokeWidth="3"
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                          />
                                          <path
                                             d="M6.23047 44.2186L17.7338 36.4953C19.5771 35.2586 22.2371 35.3986 23.8938 36.8219L24.6638 37.4986C26.4838 39.0619 29.4238 39.0619 31.2438 37.4986L40.9505 29.1686C42.7705 27.6053 45.7105 27.6053 47.5305 29.1686L51.3338 32.4353"
                                             stroke="#CDCDCD"
                                             strokeWidth="3"
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                          />
                                       </svg>
                                    )}
                                 </div>
                                 <p className="font-semibold text-gray">Add Image</p>
                              </label>
                           </div>
                        </div>                        
                     </div>
                  </div>
                  <div className="w-full flex justify-between">
                     {/* <div className="flex gap-6">
                        <div className="flex items-center gap-3 justify-center">
                           <RoundedCheckbox />
                           <p className="whitespace-nowrap">Excluded from stock</p>
                        </div>
                        <div className="flex items-center gap-3">
                           <RoundedCheckbox />
                           <p className="whitespace-nowrap">Active</p>
                        </div>
                     </div> */}
                     <div className=" flex w-full items-center justify-end gap-6">
                        <div>
                           <Button
                              background={"bg-blue text-white"}
                              text={"Save & Continue"}
                              loading={isLoading}
                              type={'submit'}
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

export default AddCompanyModel;
