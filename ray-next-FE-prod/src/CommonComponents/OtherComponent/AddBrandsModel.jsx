import React from "react";
import ModalLayout from "./ModalLayout";
import BorderdInput from "../FormInputs/BorderdInput";
import BorderdTextArea from "../FormInputs/BorderdTextArea";
import { Form, Formik } from "formik";
import RoundedCheckbox from "../FormInputs/RoundedCheckbox";
import Button from "../FormInputs/Button";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { useAddBrand, useUpdateBrand } from "../../Queries/InventoryQuery/InventoryQuery";

const unitValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  alias: Yup.string().required("Alias is required"),
  description: Yup.string().required("Description is required"),
});

const AddBrandsModel = ({ setOpen, open, editData }) => {
  const initialValue = {
    name: editData?.name || "",
    alias: editData?.alias || "",
    description: editData?.description || "",
    barcode_needed: editData?.barcode_needed || false,
  };

  const { mutateAsync: addBrand, isLoading } = useAddBrand();
  const { mutateAsync: updateBrand, isLoading: updateLoading } = useUpdateBrand();


  const handleSubmit = async (values) => {
    try {
      if (editData) {
        await updateBrand({ id: editData.id, data: values });
        toast.success("Brand updated successfully");
      } else {
        await addBrand(values);
        toast.success("Brand added successfully");
      }
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <ModalLayout width={600} setOpen={setOpen} open={open} title={editData ? "Edit Brand" : "Add Brand"}>
      <Formik
        initialValues={initialValue}
        validationSchema={unitValidation}
        onSubmit={handleSubmit}
      >
        {({ errors, values, setFieldValue }) => (
          <Form>
            <div className="flex flex-col gap-6">
              <div className="flex gap-6">
                <div className="flex-1">
                  <p className="text-sm mb-2">Name</p>
                  <BorderdInput formik={true} name="name" error={errors.name} placeholder="Enter name" />
                </div>
                <div className="flex-1">
                  <p className="text-sm mb-2">Alias</p>
                  <BorderdInput formik={true} name="alias" error={errors.alias} placeholder="Enter alias" />
                </div>
              </div>
              <div>
                <p className="text-sm mb-2">Description</p>
                <BorderdTextArea name="description"
                  value={values.description}
                  onChange={(e) => setFieldValue("description", e.target.value)} placeholder="Enter description" />
              </div>
              <div className="flex items-center gap-3">
                <RoundedCheckbox name="barcode_needed"
                  checked={values.barcode_needed}
                  onChange={(e) => setFieldValue("barcode_needed", e.target.checked)}
                />
                <p>Barcode Needed</p>
              </div>
              <div className="flex justify-end gap-4">
                <Button background="bg-light-gray" text="Cancel" type="button" onClick={() => setOpen(false)} />
                <Button background="bg-blue text-white" text={editData ? "Update" : "Save"} type="submit" loading={isLoading || updateLoading} />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </ModalLayout>
  );
};  

export default AddBrandsModel;
