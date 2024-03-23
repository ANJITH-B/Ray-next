import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEmailVerifyQuery } from "../../../Queries/AuthQuery/AuthQuery";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../../../CommonComponents/UtilComponent/LoadingSpinner";
const OtpVarification = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const data = useSelector((state) => state.signup.data);

  const otpStyle = {
    width: "65px",
    height: "76px",
    backgroundColor: "#F4F4F4",
    borderRadius: "20px",
    marginRight: "20px",
    fontSize: "24px",
  };

  const { mutateAsync: varify, isLoading } = useEmailVerifyQuery();
  const handleSubmit = () => {
    const datas = {
      email: data?.email,
      otp: otp,
    };
    varify(datas)
      .then((res) => {
        navigate("/signup/serial-verification");
        toast.success("Email Varified");
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };

  return (
    <div className="w-[550px] scale-[.65] 2xl:scale-100">
      <div className="flex w-[550px] flex-col items-start gap-4 mb-6 ">
        <h1 className="text-4xl font-semibold">Enter verification code</h1>
        <p className="max-w-[460px] ">
          We have sent a 4 digit verification code to your email{" "}
        </p>
      </div>
      <div>
        <OTPInput
          value={otp}
          onChange={(e) => {
            setOtp(e);
          }}
          numInputs={4}
          inputType="tel"
          inputStyle={otpStyle}
          renderInput={(props) => <input name="otp" {...props} />}
        />

        {otp === "" && (
          <p className="text-sm text-error-color mt-3">Enter your OTP</p>
        )}
        <button className="text-sm text-blue mt-6">Resend mail</button>
      </div>
      <div className="mt-12 flex flex-col items-center w-full">
        <button
          className="py-4 px-6 text-center bg-blue rounded-full w-full text-white"
          onClick={handleSubmit}
        >
          {isLoading ? <LoadingSpinner /> : "Verify"}
        </button>
        <p className="my-6 text-gray-600 ">OR</p>

        <div className="w-full ">
          <button className="py-4 px-6 mb-3 flex justify-between border-[1px] border-gray-700 rounded-full w-full text-gray-800">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z"
                stroke="#969696"
                strokeWidth="1.5"
                strokeWiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 14.8794C11.09 14.8794 10.35 14.1394 10.35 13.2294V10.7594C10.35 9.84938 11.09 9.10938 12 9.10938C12.91 9.10938 13.65 9.84938 13.65 10.7594V13.2294C13.65 14.1394 12.91 14.8794 12 14.8794Z"
                stroke="#969696"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M16.98 13.4697C16.78 16.0497 14.62 18.0697 12 18.0697C9.24 18.0697 7 15.8297 7 13.0697V10.9297C7 8.16969 9.24 5.92969 12 5.92969C14.59 5.92969 16.72 7.89969 16.97 10.4197"
                stroke="#969696"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>

            <p className="flex-1">Use Touch ID</p>
          </button>

          <div className="flex gap-2 justify-center">
            <p>Not your email?</p>
            <Link className="text-blue hover:underline">Edit details</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVarification;
