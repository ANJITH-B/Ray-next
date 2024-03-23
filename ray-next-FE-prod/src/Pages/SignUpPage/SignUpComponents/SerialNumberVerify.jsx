import { Form, Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import IconInput from "../../../CommonComponents/FormInputs/IconInput";
import keyboard from "../../../Assets/CommonImages/keyboard.svg";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useVerifySecret } from "../../../Queries/AuthQuery/AuthQuery";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { toast } from "react-hot-toast";

const serialValidation = () => {
  return Yup.object().shape({
    number: Yup.string().required("Secret number is required"),
  });
};
const SerialNumberVerify = () => {
  const initialValue = {
    number: "",
  };
  const data = useSelector((state) => state.signup.data);
  const { mutateAsync: varify, isLoading } = useVerifySecret();
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
        color: "white",
      }}
      spin
    />
  );
  const navigate = useNavigate();
  const handleSubmmit = (values) => {
    const datas = {
      email: data.email,
      serial_number: values.number,
    };
    varify(datas)
      .then((res) => {
        localStorage.setItem(
          "Tokens",
          JSON.stringify(res?.data?.message?.token)
        );
        localStorage.setItem(
          "USER_ID",
          JSON.stringify({
            name: res?.data?.message.current_user?.name,
            username: res?.data?.message.current_user?.username,
            email: res?.data?.message.current_user?.email,
            company: res?.data?.message.current_user?.company,
            phone: res?.data?.message.current_user?.phone,
            state: res?.data?.message.current_user?.state,
            region: res?.data?.message.current_user?.region,
          })
        );
        toast.success("Varified Successfully");
        if (localStorage.getItem("Tokens")) {
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };
  return (
    <div className="w-[550px] scale-[.65] 2xl:scale-100 ">
      <div className="flex w-[550px] flex-col items-start gap-4 mb-6 ">
        <h1 className="text-4xl font-semibold">Enter serial number</h1>
        <p className="max-w-[460px] ">
          We have sent a 16 digit serial number to your email{" "}
        </p>
      </div>
      <div>
        <Formik
          initialValues={initialValue}
          validationSchema={serialValidation}
          onSubmit={handleSubmmit}
          enableReinitialize
        >
          {({ errors }) => (
            <Form>
              <div className="mb-4">
                <IconInput
                  name="number"
                  icon={keyboard}
                  placeholder="Serial number"
                  error={errors?.number}
                />
              </div>

              <button type="button" className="text-sm text-blue ">
                Resend mail
              </button>
              <div className="mt-12 flex flex-col items-center w-full">
                <button className="py-4 px-6 text-center bg-blue rounded-full w-full text-white">
                  {isLoading ? <Spin indicator={antIcon} /> : "Verify"}
                </button>
                <p className="my-6 text-gray-600 ">OR</p>
                <div className="w-full ">
                  <button
                    type="button"
                    className="py-4 px-6 mb-3 flex justify-between border-[1px] border-gray-700 rounded-full w-full text-gray-800"
                  >
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
                    <Link className="text-blue hover:underline">
                      Edit details
                    </Link>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SerialNumberVerify;
