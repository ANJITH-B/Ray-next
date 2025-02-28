import React, { useRef, useState, useEffect } from "react";
import ModalLayout from "./ModalLayout";
import BorderdInput from "../FormInputs/BorderdInput";
import BorderdSelect from "../FormInputs/BorderdSelect";
import { Form, Formik } from "formik";
import RoundedCheckbox from "../FormInputs/RoundedCheckbox";
import Button from "../FormInputs/Button";
import { useAddInventory, useGetBrands, useGetCategories, useUpdateInventory } from "../../Queries/InventoryQuery/InventoryQuery";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import ProductUnitTable from "../../Pages/InventoryPage/InventoryComponents/ProductUnitTable";
import { BarcodeGenerator } from "../../Pages/InventoryPage/InventoryComponents/BarcodeScanner";
import html2canvas from "html2canvas";

const inventoryValidation = () => {
  return Yup.object().shape({
    name: Yup.string().required("Name is required"),
    item_code: Yup.string().required("Item code is required"),
    barcode: Yup.string().required("Barcode is required"),
    stock: Yup.string().required("Stoke is required"),
    minimum_quantity: Yup.string().required("Minimum quantity is required"),
    // stock_unit: Yup.string().required("Stock unit is required"),
    // category: Yup.string().required("Category is required"),
    // brand: Yup.string().required("Brand is required"),
    // valuation: Yup.string().required("Valuation is required"),
  });
};
const AddInventoryModal = ({ setOpen, open, editData }) => {
  const [imgPreview, setImgPreview] = useState("");
  const initialUnits = editData?.unit || [{}];

  const [units, setUnits] = useState([{}]);
  const barcodeRef = useRef(null);
  useEffect(() => {
    if (editData) {
      setUnits(initialUnits);
    }else{
      setUnits([{}])
    }
  }, []);

  const downloadBarcode = async () => {
    if (!barcodeRef.current) return;
    const canvas = await html2canvas(barcodeRef.current);
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "barcode.png";
    link.click();
  };

  const initialValue = {
    name: editData?.Name || "",
    item_code: editData?.Item_code || "",
    barcode: editData?.Bar_code || "",
    category: editData?.category_id || "",
    brand: editData?.brand_id || "",
    valuation: editData?.Valuation || "",
    stock: editData?.Stock || "",
    stock_unit: editData?.Stock_unit || "",
    minimum_quantity: editData?.Minimum_quantity || "",
    image_url: editData?.Image_url || "",
    excludefromstock: editData?.Excludefromstock || true,
    active: editData?.Active || true,
    base_unit: editData?.base_unit || "",
    n_unit: editData?.n_unit || "",
    n_base: editData?.n_base || "",
    bar_code: editData?.bar_code || "",
    opening_quantity: editData?.opening_quantity || "",
    rate: editData?.rate || "",
    balance: editData?.balance || "",
    sale_rate: editData?.sale_rate || "",
  };

  const { mutateAsync: addInventory, isLoading } = useAddInventory();
  const { mutateAsync: updateInventory, isLoading: updateLoading } = useUpdateInventory();
  const { data: category } = useGetCategories({ pageNo: 1 });
  const { data: brands } = useGetBrands({ pageNo: 1 });
  const handleSubmit = async (values, { resetForm }) => {
    const data = {
      name: values?.name,
      item_code: values?.item_code,
      barcode: values?.barcode,
      category: values?.category,
      brand: values?.brand,
      valuation: values?.valuation,
      // country_of_origin: values?.country_of_origin,
      // purchase_rate: values?.purchase_rate,
      // margin_percent: values?.margin_percent,
      // description: values?.description,
      image_url: imgPreview,
      excludefromstock: values?.excludefromstock,
      active: values?.active,
      unit_details: units,
      stock: values?.stock,
      stock_unit: values?.stock_unit,
      minimum_quantity: values?.minimum_quantity,
      // unit_details: {
      //   unit: values?.unit,
      //   base_unit: values?.base_unit,
      //   n_unit: values?.n_unit,
      //   n_base: values?.n_base,
      //   bar_code: values?.bar_code,
      //   opening_quantity: values?.opening_quantity,
      //   rate: values?.rate,
      //   balance: values?.balance,
      //   sale_rate: values?.sales,
      // },
    };
    try {
      console.log('data32', data);
      if (editData) {
        await updateInventory({ id: editData.id, data });
        toast.success("Inventory updated");
        setOpen(false);
        resetForm();
      } else {
        await addInventory(data)
          .then((res) => {
            if (res?.status === 500) {
              toast.error("Something went wrong");
            } else {
              toast.success("Inventory added");
              setOpen(false);
              resetForm();
            }
          })
          .catch((err) => {
            toast.error("Something went wrong");
          });
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const categoryData = category?.data?.map((e) => {
    return {
      value: e?._id,
      label: e?.name,
    };
  });
  const brandData = brands?.data?.map((e) => {
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
      title={editData ? "Edit Product" : "Add Product"}
    >
      <Formik
        initialValues={initialValue}
        validationSchema={inventoryValidation}
        onSubmit={(values, { resetForm, setValues }) => {
          handleSubmit(values, { resetForm });
          setValues(initialValue);
          setImgPreview("")
        }}
      >
        {({ errors, setFieldValue, values }) => (
          <Form>
            <div className=" flex flex-col pb-8">
              <div className=" flex gap-8">
                <div className="flex-1">
                  <div className="mb-6 flex items-center gap-6">
                    <div className="flex-1">
                      <p className="text-sm mb-2">Name</p>
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
                      <p className="text-sm mb-2">Item code</p>
                      <BorderdInput
                        formik={true}
                        name="item_code"
                        error={errors.item_code}
                        id="item_code"
                        placeholder="Enter item code"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm mb-2">Bar code</p>
                      <BorderdInput
                        formik={true}
                        name="barcode"
                        error={errors.barcode}
                        id="barcode"
                        placeholder="Enter bar code"
                      />
                    </div>
                  </div>
                  <div ref={barcodeRef} className="w-fit">
                    <BarcodeGenerator value={values.barcode} />
                  </div>

                  {editData ? <div className="mb-6 flex items-center gap-6">
                    <div className="flex-1">
                      <p className="text-sm mb-2">Catogery</p>
                      <BorderdSelect
                        onChange={(e) => {
                          setFieldValue("category", e);
                        }}
                        id="category"
                        placeholder="Select"
                        items={categoryData}
                        value={values.category}
                      />
                    </div>
                    <div className="flex-[.8]">
                      <p className="text-sm mb-2">Brand</p>
                      <BorderdSelect
                        onChange={(e) => setFieldValue("brand", e)}
                        id="brand"
                        placeholder="Select"
                        items={brandData}
                        value={values.brand}
                      />
                    </div>
                  </div> :
                  <div className="mb-6 flex items-center gap-6">
                    <div className="flex-1">
                      <p className="text-sm mb-2">Catogery</p>
                      <BorderdSelect
                        onChange={(e) => {
                          setFieldValue("category", e);
                        }}
                        id="category"
                        placeholder="Select"
                        items={categoryData}
                      />
                    </div>
                    <div className="flex-[.8]">
                      <p className="text-sm mb-2">Brand</p>
                      <BorderdSelect
                        onChange={(e) => setFieldValue("brand", e)}
                        id="brand"
                        placeholder="Select"
                        items={brandData}
                      />
                    </div>
                  </div>}
                  <div className="flex items-center gap-6">
                    <div className="flex-[.4]">
                      <p className="text-sm mb-2">Valuation</p>
                      <BorderdSelect
                        onChange={(e, i) => {
                          setFieldValue("valuation", e);
                        }}
                        id="valuation"
                        placeholder="Select"
                        items={[
                          { label: "FIFO", value: "FIFO" }
                        ]}
                        disabled
                        defaultValue="FIFO"
                        // value={values.valuation}
                        value={'FIFO'}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm mb-2">Stock</p>
                      <div className="flex gap-1">
                        <div className="flex-1">
                          <BorderdInput
                            formik={true}
                            name="stock"
                            id="stock"
                            error={errors.stock}
                            placeholder="Enter stock"
                          />
                        </div>

                        <div className="flex-[.5]">
                          <BorderdSelect
                            onChange={(e) => setFieldValue("stock_unit", e)}
                            id="stock_unit"
                            placeholder="Select"
                            items={[
                              { label: "Box", value: "box" },
                              { label: "Pieces", value: "pieces" }
                            ]}
                            defaultValue="box"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm mb-2">Minimum Quantity</p>
                      <BorderdInput
                        formik={true}
                        name="minimum_quantity"
                        id="minimum_quantity"
                        error={errors.minimum_quantity}
                        placeholder="Enter minimum quantity"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="h-full">
                    <p className="mb-4 font-medium text-xl">Product Image</p>
                    <div className="w-full overflow-hidden h-4/5 border-2 border-dashed rounded-xl border-border-gray flex items-center justify-center">
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
                          {/* {imgPreview ? (
                              <img src={imgPreview} alt="image" />
                            ) : ( */}
                          {imgPreview || values.image_url ? (
                            <img src={imgPreview || values.image_url} alt="image" className="h-40 w-40 object-cover" />
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
              <ProductUnitTable data={units} setItem={setUnits} />
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
                    onClick={downloadBarcode}
                    disabled={!values.barcode}
                    type="button"
                  />
                </div>
                <div>
                  <Button
                    background={"bg-blue text-white"}
                    type="submit"
                    text={editData ? "Update" : "Save"}
                    loading={isLoading || updateLoading}
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
