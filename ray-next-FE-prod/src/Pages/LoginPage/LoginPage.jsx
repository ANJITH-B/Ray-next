import { Form, Formik } from "formik";
import React from "react";
import IconInput from "../../CommonComponents/FormInputs/IconInput";
import sms from "../../Assets/CommonImages/sms.svg";
import key from "../../Assets/CommonImages/key.svg";
import google from "../../Assets/CommonImages/google.svg";
import * as Yup from "yup";
import logo from "../../Assets/CommonImages/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../CommonComponents/FormInputs/PasswordInput";
import RoundedCheckbox from "../../CommonComponents/FormInputs/RoundedCheckbox";
import { useLogin } from "../../Queries/AuthQuery/AuthQuery";
import LoadingSpinner from "../../CommonComponents/UtilComponent/LoadingSpinner";
import { toast } from "react-hot-toast";

const signinValidation = () => {
  return Yup.object().shape({
    email: Yup.string().required(" Username, Email or Phoneis required"),
    id: Yup.string().required("Screat ID  is required"),
    password: Yup.string().required("Password is required"),
  });
};
const LoginPage = () => {
  const initialValue = {
    email: "",
    id: "",
    password: "",
  };

  const { mutateAsync: login, isLoading } = useLogin();
  const navigate = useNavigate();

  const handleChange = (values) => {
    const data = {
      usernameORemailORPhone: values.email,
      secret_code: values.id,
      password: values.password,
    };
    login(data)
      .then((res) => {
        localStorage.setItem("Tokens", JSON.stringify(res?.data?.data?.token));
        localStorage.setItem(
          "USER_ID",
          JSON.stringify({
            name: res?.data?.data?.current_user?.name,
            username: res?.data?.data?.current_user?.username,
            email: res?.data?.data?.current_user?.email,
            company: res?.data?.data?.current_user?.company,
            phone: res?.data?.data?.current_user?.phone,
            state: res?.data?.data?.current_user?.state,
            region: res?.data?.data?.current_user?.region,
          })
        );
        toast.success("Signin Successfully");
        if (localStorage.getItem("Tokens")) {
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };
  return (
    <div className="flex flex-col items-center  ">
      <div className="flex flex-col items-center gap-6 mb-6 ">
        <img className="w-28" src={logo} alt="logo" />
        <p className="max-w-[350px] text-center">
          Welcome back, enter your email, password and secret key to sign in.
        </p>
      </div>
      <div className=" max-w-[360px] 2xl:max-w-[460px] flex flex-col items-center">
        <Formik
          validationSchema={signinValidation}
          initialValues={initialValue}
          onSubmit={handleChange}
        >
          {({ errors }) => (
            <Form >
              <div className="2xl:mb-6 mb-4">
                <IconInput
                  error={errors.email}
                  icon={sms}
                  name="email"
                  placeholder="Username, Email or Phone"
                />
              </div>
              <div className="2x:mb-6 mb-4">
                <IconInput
                  error={errors.id}
                  icon={key}
                  name="id"
                  placeholder="Secret code"
                />
              </div>
              <div className="mb-4">
                <PasswordInput error={errors.password} name="password" />
              </div>
              <div className="flex justify-between gap-3 items-center mb-6">
                <div class="flex items-center gap-3">
                  <RoundedCheckbox />

                  <label
                    for="default-checkbox"
                    class="ml-2 text-sm font-medium text-dark-color "
                  >
                    Remember me
                  </label>
                </div>
                <div>
                  <Link className="underline text-sm font-semibold">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div>
                <button className="py-3 px-4 2xl:py-2 2xl:px-6 text-center bg-blue rounded-full w-full text-white">
                  {isLoading ? <LoadingSpinner /> : "Sign in"}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <p className="my-4 text-gray-600 ">OR</p>
        <div className="w-full ">
          <button className="py-3 px-4 2xl:py-2 2xl:px-6 mb-3 flex justify-between border-[1px] border-gray rounded-full w-full text-gray-800">
            <img src={google} alt="google" />
            <p className="flex-1">Sign in with Google</p>
          </button>

          <div className="flex gap-2 justify-center">
            <p>Don’t have an account?</p>
            <Link to={"/signup"} className="text-blue hover:underline">
              Sign up now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
