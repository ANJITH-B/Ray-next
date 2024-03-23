import { ErrorMessage } from "formik";
import React from "react";

const ErrorMessageComponent = ({name=''}) => {
  return (
    <div className=" relative   py-3">
      <div className="absolute top-0 text-error-color text-sm">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};

export default ErrorMessageComponent;
