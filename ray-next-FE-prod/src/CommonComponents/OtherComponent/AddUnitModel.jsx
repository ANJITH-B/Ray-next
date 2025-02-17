import React from "react";
import ModalLayout from "./ModalLayout";
import BorderdInput from "../FormInputs/BorderdInput";
import BorderdTextArea from "../FormInputs/BorderdTextArea";
import { Form, Formik } from "formik";
import RoundedCheckbox from "../FormInputs/RoundedCheckbox";
import Button from "../FormInputs/Button";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
// import { useAddUnit } from "../../Queries/UnitQuery";

const unitValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  sub_unit: Yup.string().required("Sub Unit is required"),
  description: Yup.string().required("Description is required"),
});

const AddUnitModel = ({ setOpen, open }) => {
  const initialValue = {
    name: "",
    sub_unit: "",
    description: "",
    barcode_needed: false,
  };

//   const { mutateAsync: addUnit, isLoading } = useAddUnit();

  const handleSubmit = async (values) => {
    try {
    //   await addUnit(values);
      toast.success("Unit added successfully");
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <ModalLayout width={600} setOpen={setOpen} open={open} title="Add Unit">
      <Formik
        initialValues={initialValue}
        validationSchema={unitValidation}
        onSubmit={handleSubmit}
      >
        {({ errors }) => (
          <Form>
            <div className="flex flex-col gap-6">
              <div className="flex gap-6">
                <div className="flex-1">
                  <p className="text-sm mb-2">Name</p>
                  <BorderdInput formik={true} name="name" error={errors.name} placeholder="Enter name" />
                </div>
                <div className="flex-1">
                  <p className="text-sm mb-2">Sub Unit</p>
                  <BorderdInput formik={true} name="sub_unit" error={errors.sub_unit} placeholder="Enter sub unit" />
                </div>
              </div>
              <div>
                <p className="text-sm mb-2">Description</p>
                <BorderdTextArea formik={true} name="description" error={errors.description} placeholder="Enter description" />
              </div>
              <div className="flex items-center gap-3">
                <RoundedCheckbox formik={true} name="barcode_needed" />
                <p>Barcode Needed</p>
              </div>
              <div className="flex justify-end gap-4">
                <Button background="bg-light-gray" text="Cancel" type="button" onClick={() => setOpen(false)} />
                {/* <Button background="bg-blue text-white" text="Save" loading={isLoading} /> */}
                <Button background="bg-blue text-white" text="Save"/>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </ModalLayout>
  );
};

export default AddUnitModel;
