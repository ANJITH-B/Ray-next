import React, { useState } from "react";
import ModalLayout from "./ModalLayout";
import BorderdInput from "../FormInputs/BorderdInput";
import BorderdSelect from "../FormInputs/BorderdSelect";
import BorderdTextArea from "../FormInputs/BorderdTextArea";
import { Form, Formik } from "formik";
import RoundedCheckbox from "../FormInputs/RoundedCheckbox";
import Button from "../FormInputs/Button";
import { useAddInventory } from "../../Queries/InventoryQuery/InventoryQuery";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { useGetSupplier } from "../../Queries/PurchaseQuery/PurchaseQuery";
import ProductUnitTable from "../../Pages/InventoryPage/InventoryComponents/ProductUnitTable";
import { Tooltip } from "antd";

const inventoryValidation = () => {
  return Yup.object().shape({
    name: Yup.string().required("Name is required"),
    purchase_rate: Yup.string().required("Purchase is required"),
    unit: Yup.string().required("Unit is required"),
    opening_quantity: Yup.string().required("Opening balance is required"),
    sale_rate: Yup.string().required("Sale rate is required"),
  });
};
const AddInventoryModal = ({ setOpen, open }) => {
  const [imgPreview, setImgPreview] = useState("");
  const initialValue = {
    name: "",
    item_code: "",
    barcode: "",
    category: "",
    brand: "",
    default_supplier: "",
    country_of_origin: "",
    purchase_rate: "",
    margin_percent: "",
    description: "",
    image_url: "",
    excludefromstock: true,
    active: true,
    unit: "",
    base_unit: "",
    n_unit: "",
    n_base: "",
    bar_code: "",
    opening_quantity: "",
    rate: "",
    balance: "",
    sale_rate: "",
  };

  const { mutateAsync: addInventory, isLoading } = useAddInventory();
  const { data, isLoading: suppleirLoading } = useGetSupplier({ pageNo: 1 });
  const handleSubmit = (values) => {
    const data = {
      name: values?.name,
      item_code: values?.item_code,
      barcode: values?.barcode,
      category: values?.category,
      brand: values?.brand,
      default_supplier: values?.default_supplier?.value,
      country_of_origin: values?.country_of_origin,
      purchase_rate: values?.purchase_rate,
      margin_percent: values?.margin_percent,
      description: values?.description,
      image_url: values?.image_url,
      excludefromstock: values?.excludefromstock,
      active: values?.active,
      unit_details: {
        unit: values?.unit,
        base_unit: values?.base_unit,
        n_unit: values?.n_unit,
        n_base: values?.n_base,
        bar_code: values?.bar_code,
        opening_quantity: values?.opening_quantity,
        rate: values?.rate,
        balance: values?.balance,
        sale_rate: values?.sales,
      },
    };

    addInventory(data)
      .then((res) => {
        if (res?.status === 500) {
          toast.error("Somthing went wrong");
        } else {
          toast.success("Inventory added");
          setOpen(false);
        }
      })
      .catch((err) => {
        toast.error("Somthing went wrong");
      });
  };

  const supplierData = data?.data?.data?.data?.map((e) => {
    return {
      value: e?._id,
      label: e?.name,
    };
  });

  return (
    <ModalLayout
      width={1200}
      setOpen={setOpen}
      open={open}
      title={"Add Product"}
    >
      <Formik
        initialValues={initialValue}
        validationSchema={inventoryValidation}
        onSubmit={handleSubmit}
      >
        {({ errors, setFieldValue, values }) => (
          <Form>
            <div className=" flex flex-col gap-12">
              <div className=" flex gap-12">
                <div className="flex-1">
                  <div className="mb-6 flex items-center gap-6">
                    <div className="flex-1">
                      <p className="text-sm mb-2">Name</p>
                      <BorderdInput
                        formik={true}
                        name="name"
                        error={errors.name}
                        id="code"
                        placeholder="Enter name"
                      />
                    </div>
                  </div>
                  <div className="mb-6 flex items-center gap-6">
                    <div className="flex-1">
                      <p className="text-sm mb-2">Item code</p>
                      <BorderdInput
                        formik={true}
                        name="item_code"
                        id="code"
                        placeholder="Enter item code"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm mb-2">Bar code</p>
                      <BorderdInput
                        formik={true}
                        name="barcode"
                        id="code"
                        placeholder="Enter bar code"
                      />
                    </div>
                  </div>

                  <div className="mb-6 flex items-center gap-6">
                    <div className="flex-1">
                      <p className="text-sm mb-2">Catogery</p>
                      <BorderdSelect
                        onChange={(e) => {
                          setFieldValue("category", e);
                        }}
                        id="category"
                        placeholder="Select"
                        items={[
                          { label: "Electronics", value: "electronics" },
                          { label: "Appliances", value: "appliances" },
                          { label: "Footwear", value: "footwear" },
                          { label: "Accessories", value: "accessories" },
                        ]}
                      />
                    </div>
                    <div className="flex-[.8]">
                      <p className="text-sm mb-2">Brand</p>
                      <BorderdSelect
                        onChange={(e) => setFieldValue("brand", e)}
                        id="brand"
                        placeholder="Select"
                        items={[{ label: "brand1", value: "brand1" }]}
                      />
                    </div>
                  </div>
                  <div className="mb-6 flex items-center gap-6">
                    <div className="flex-1">
                      <p className="text-sm mb-2">Valuation</p>
                      <BorderdSelect
                        onChange={(e, i) => {
                          setFieldValue("default_supplier", e);
                        }}
                        id="default_supplier"
                        placeholder="Select"
                        items={supplierData}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm mb-2">Stock</p>
                      <BorderdSelect
                        onChange={(e) => setFieldValue("country_of_origin", e)}
                        id="country_of_origin"
                        placeholder="Select"
                        items={[{ label: "India", value: "India" }]}
                      />
                    </div>
                  </div>

                  <div className="mb-6 flex items-center gap-6">
                    <div className="flex-1">
                      <p className="text-sm mb-2">Description</p>
                      <BorderdTextArea
                        onChange={(e) =>
                          setFieldValue("description", e.target.value)
                        }
                        formik={true}
                        name="description"
                        id="code"
                        placeholder="Enter discription"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="">
                    <p className="mb-4 font-medium text-xl">Product Image</p>
                    <div className="w-full overflow-hidden h-[131px] border-2 border-dashed rounded-xl border-border-gray flex items-center justify-center">
                      <input
                        onChange={(e) => {
                          setImgPreview(URL.createObjectURL(e.target.files[0]));
                        }}
                        type="file"
                        hidden
                        id="product-image"
                      />
                      <label
                        className="flex flex-col items-center cursor-pointer w-full h-full justify-center"
                        htmlFor="product-image"
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

                  <div className="mt-6">
                    <p className="mb-4 font-medium text-xl">Units</p>
                    <div>
                      <div className="mb-6 flex items-center gap-6">
                        <div className="flex-1">
                          <p className="text-sm mb-2">Unit</p>
                          <BorderdInput
                            formik={true}
                            name="unit"
                            error={errors.unit}
                            id="code"
                            placeholder="Enter unit"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm mb-2">Base Unit</p>
                          <BorderdInput
                            formik={true}
                            name="base_unit"
                            id="code"
                            placeholder="Enter base unit"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm mb-2">N Unit</p>
                          <BorderdInput
                            formik={true}
                            name="n_unit"
                            id="code"
                            placeholder="Enter n unit"
                          />
                        </div>
                      </div>
                      <div className="mb-6 flex items-center gap-6">
                        <div className="flex-[.8]">
                          <p className="text-sm mb-2">N Base</p>
                          <BorderdInput
                            formik={true}
                            name="n_base"
                            id="code"
                            placeholder="Enter n base"
                          />
                        </div>
                        <div className="flex-[.8]">
                          <p className="text-sm mb-2">Bar code</p>
                          <BorderdInput
                            formik={true}
                            name="bar_code"
                            id="code"
                            placeholder="Enter bar code"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm mb-2">Opening Quandity</p>
                          <BorderdInput
                            formik={true}
                            name="opening_quantity"
                            error={errors.opening_quantity}
                            id="code"
                            placeholder="Enter opening quandity"
                          />
                        </div>
                      </div>
                      <div className="mb-6 flex items-center gap-6">
                        <div className="flex-[.8]">
                          <p className="text-sm mb-2">Rate</p>
                          <BorderdInput
                            formik={true}
                            name="rate"
                            id="code"
                            placeholder="Enter rate"
                          />
                        </div>

                        <div className="flex-[.8]">
                          <p className="text-sm mb-2">Balance</p>
                          <BorderdInput
                            formik={true}
                            name="balance"
                            id="code"
                            placeholder="Enter balance"
                          />
                        </div>
                      </div>
                      <div className="mb-6 flex items-center gap-6">
                        <div className="flex-1">
                          <p className="text-sm mb-2">Sale rate</p>
                          <BorderdInput
                            formik={true}
                            name="sale_rate"
                            error={errors.sale_rate}
                            id="code"
                            placeholder="Enter sale rate"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-2 flex w-full items-center justify-between">
              <p className=" text-xl 2xl:text-[24px] font-semibold">Items</p>

              <button
                // onClick={() => addItem()}
                className=" px-4 2xl:px-6 py-2 2xl:py-3 text-sm 2xl:text-base rounded-full border hover:bg-light-gray transition-all"
              // disabled={edit === false ? false : true}
              // tabIndex={3}
              >
                {open ? (
                  <div
                    className={`${open
                      ? "pointer-events-auto opacity-100"
                      : "pointer-events-none opacity-0"
                      } cursor-pointer `}
                  >
                    <Tooltip
                      trigger={"hover"}
                      title={open}
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
              <ProductUnitTable />
            </div>
            <div className="w-full flex justify-between">
              <div className="flex gap-6">
                <div className="flex items-center gap-3 justify-center">
                  <RoundedCheckbox />
                  <p className="whitespace-nowrap">Excluded from stock</p>
                </div>
                <div className="flex items-center gap-3">
                  <RoundedCheckbox />
                  <p className="whitespace-nowrap">Active</p>
                </div>
              </div>
              <div className=" flex w-full items-center justify-end gap-6">
                <div className="">
                  <Button
                    background={"bg-light-gray "}
                    text={"Print Bar Code"}
                    // onClick={() => setRefrenceOpen(true)}
                    type="button"
                  />
                </div>
                <div>
                  <Button
                    background={"bg-blue text-white"}
                    text={"Save"}
                    loading={isLoading}
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

export default AddInventoryModal;
