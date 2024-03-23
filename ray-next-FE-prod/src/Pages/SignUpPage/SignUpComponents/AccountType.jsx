import React, { useState } from "react";
import security from "../../../Assets/CommonImages/shield-security.svg";
import IconInput from "../../../CommonComponents/FormInputs/IconInput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useSignupQuery } from "../../../Queries/AuthQuery/AuthQuery";

import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../../../CommonComponents/UtilComponent/LoadingSpinner";
const agendIdValidation = () => {
  return Yup.object().shape({
    agentId: Yup.string().required("Agent ID is required"),
  });
};

const AccountType = () => {
  const [isId, setIsid] = useState(0);
  const data = useSelector((state) => state.signup.data);
  const navigate = useNavigate();
  const initialValue = {
    agentId: "",
  };
  const { mutateAsync: signup, isLoading } = useSignupQuery();

  const handleSubmit = (values) => {
    const datas = {
      name: data?.name,
      username: data.username,
      password: data.password,
      phone: data.phone,
      email: data.email,
      company: data.company,
      profession: data.prefession,
      region: data.region,
      state: data.state,
      agentID: values.agentId,
    };
    signup(datas)
      .then((res) => {
        toast.success("Otp send to your email");
        navigate("/signup/verification");
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };
  return (
    <div className=" w-[550px] scale-[.65] 2xl:scale-100">
      <div className="flex w-[550px] flex-col items-start gap-4 mb-6 ">
        <h1 className="text-4xl font-semibold">Before moving forward</h1>
        <p className="max-w-[460px] ">
          Please choose how you would like to create your new account?
        </p>
      </div>
      <div className="flex gap-8 ">
        <div
          className={`w-[220px] h-[220px] rounded-[35px] border-[1px] hover:border-blue transition-all ${
            isId === 1 ? "border-blue" : "border-gray-300"
          } `}
        >
          <button
            onClick={() => setIsid(1)}
            className="p-6 text-left flex flex-col justify-between h-full w-full"
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.9799 4.45914L10.9999 8.21914C8.69995 9.07914 6.81995 11.7991 6.81995 14.2391V29.0991C6.81995 31.4591 8.37995 34.5591 10.2799 35.9791L18.8799 42.3991C21.6999 44.5191 26.3399 44.5191 29.1599 42.3991L37.7599 35.9791C39.6599 34.5591 41.2199 31.4591 41.2199 29.0991V14.2391C41.2199 11.7791 39.3399 9.05914 37.0399 8.19914L27.0599 4.45914C25.3599 3.83914 22.6399 3.83914 20.9799 4.45914Z"
                stroke={isId === 1 ? "#4A9CE8" : "#121212"}
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M24 25C26.2091 25 28 23.2091 28 21C28 18.7909 26.2091 17 24 17C21.7909 17 20 18.7909 20 21C20 23.2091 21.7909 25 24 25Z"
                stroke={isId === 1 ? "#4A9CE8" : "#121212"}
                strokeWidth="3"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M24 25V31"
                stroke={isId === 1 ? "#4A9CE8" : "#121212"}
                strokeWidth="3"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className="text-base font-bold">I have Agent ID</h3>
            <p>Directly create and verify account using Agent ID </p>
          </button>
        </div>
        <div
          className={`w-[220px] h-[220px] rounded-[35px] border-[1px] hover:border-blue transition-all ${
            isId === 2 ? "border-blue" : "border-gray-300"
          } `}
        >
          <button
            onClick={() => setIsid(2)}
            className="p-6 text-left flex flex-col justify-between h-full w-full pointer-events-none"
            disabled
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.80951 31.0527L17.8695 40.1127C21.5895 43.8327 27.6295 43.8327 31.3695 40.1127L40.1495 31.3327C43.8695 27.6127 43.8695 21.5727 40.1495 17.8327L31.0695 8.79273C29.1695 6.89273 26.5495 5.87273 23.8695 6.01273L13.8695 6.49273C9.86951 6.67273 6.68951 9.85273 6.48951 13.8327L6.00951 23.8327C5.88951 26.5327 6.90951 29.1527 8.80951 31.0527Z"
                stroke={isId === 2 ? "#4A9CE8" : "#121212"}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.4695 24.4531C22.2309 24.4531 24.4695 22.2145 24.4695 19.4531C24.4695 16.6917 22.2309 14.4531 19.4695 14.4531C16.7081 14.4531 14.4695 16.6917 14.4695 19.4531C14.4695 22.2145 16.7081 24.4531 19.4695 24.4531Z"
                stroke={isId === 2 ? "#4A9CE8" : "#121212"}
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M26.4695 34.4531L34.4695 26.4531"
                stroke={isId === 2 ? "#4A9CE8" : "#121212"}
                strokeWidth="3"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <h3 className="text-base font-bold">I don’t have Agent ID</h3>
            <p>Try all the features with our 1 day free trial </p>
          </button>
        </div>
      </div>
      {isId === 1 && (
        <div className="mt-6  w-[480px] ">
          <Formik
            validationSchema={agendIdValidation}
            enableReinitialize
            initialValues={initialValue}
            onSubmit={handleSubmit}
          >
            {({ errors }) => (
              <Form>
                <div className="mb-6">
                  <IconInput
                    icon={security}
                    name="agentId"
                    placeholder="Agent ID"
                    error={errors?.agentId}
                  />
                  {/* <ErrorMessageComponent name="agentId" /> */}
                </div>
                <button className="py-4 px-6 text-center bg-blue rounded-full w-full text-white">
                  {isLoading ? <LoadingSpinner /> : "Continue"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
      {isId === 2 && (
        <div className="mt-6  w-[480px] ">
          <button className="py-4 px-6 text-center bg-blue rounded-full w-full text-white">
            Continue with free trial
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountType;
