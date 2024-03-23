import { Form, Formik } from "formik";
import React from "react";
import IconInput from "../../../CommonComponents/FormInputs/IconInput";
import sms from "../../../Assets/CommonImages/sms.svg";
import building from "../../../Assets/CommonImages/building.svg";
import global from "../../../Assets/CommonImages/global.svg";
import roundedProfile from "../../../Assets/CommonImages/profile-circle.svg";
import user from "../../../Assets/CommonImages/user.svg";
import phone from "../../../Assets/CommonImages/phone.svg";
import location from "../../../Assets/CommonImages/location.svg";
import shopping from "../../../Assets/CommonImages/shopping-bag.svg";
import { Link, useNavigate } from "react-router-dom";
import "./signUpPageStyle.scss";
import PasswordInput from "../../../CommonComponents/FormInputs/PasswordInput";
import CustomSelect from "../../../CommonComponents/FormInputs/CustomSelect";
import * as Yup from "yup";
import { onlyNumbers } from "../../../HelperFunctions/inputRestrictions";
import { signUpdata } from "../../../Redux/Slices/authSlices";
import { useDispatch, useSelector } from "react-redux";
import RoundedCheckbox from "../../../CommonComponents/FormInputs/RoundedCheckbox";

const signupValidation = () => {
  const emailRegex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  return Yup.object().shape({
    name: Yup.string().required("Fullname is required"),
    username: Yup.string().required("Username is required"),
    phone: Yup.number().required("Phone number is required"),
    company: Yup.string().required("Company is required"),
    prefession: Yup.string().required("Prefession  is required"),
    region: Yup.string().required("Region is required"),
    state: Yup.string().required("State is required"),

    email: Yup.string()
      .email("Please enter correct format")
      .matches(emailRegex, "Please enter correct format")
      .required("Email is required"),

    password: Yup.string().required("Password is required"),
  });
};

const SignUpForm = ({ setSteps }) => {
  const data = useSelector((state) => state.signup.data);
  const initialValue = {
    name: data?.name || "",
    username: data?.username || "",
    company: data?.company || "",
    prefession: data?.prefession || null,
    phone: data?.phone || "",
    region: data?.region || "",
    state: data?.state || "",
    email: data?.email || "",
    password: data?.password || "",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (isValid, values) => {
    if (isValid) {
      dispatch(signUpdata(values));
      navigate("/signup/type");
    }
  };
  return (
    <div className="w-[550px] scale-[.65] 2xl:scale-100 flex flex-col items-center">
      <div className="flex w-[550px]  flex-col items-start gap-4 mb-6 ">
        <h1 className="text-4xl font-semibold">Get started</h1>
        <p className="max-w-[460px] ">
          Hey there! Welcome to RayNext International, Enter following details
          to get started
        </p>
      </div>
      <Formik
        initialValues={initialValue}
        validationSchema={signupValidation}
        enableReinitialize
        onSubmit={handleSubmit}
        
      >
        {({
          setFieldValue,
          isValid,
          values,
          setTouched,
          validateForm,
          errors,
          dirty
        }) => (
          <Form className="w-full">
            <div className="mb-6">
              <IconInput
                name="name"
                error={errors?.name}
                icon={user}
                placeholder="Full name"
              />
              {/* <ErrorMessageComponent name="name" /> */}
            </div>
            <div className=" flex gap-4 mb-6">
              <div>
                <IconInput
                  name="username"
                  icon={roundedProfile}
                  placeholder="Username"
                  error={errors?.username}
                />
                {/* <ErrorMessageComponent name="username" /> */}
              </div>
              <div>
                <PasswordInput error={errors?.password} name="password" />
                {/* <ErrorMessageComponent name="password" /> */}
              </div>
            </div>
            <div className="flex gap-4 mb-6">
              <div className="w-[55%]">
                <IconInput
                  name="email"
                  error={errors?.email}
                  icon={sms}
                  placeholder="Email"
                />
                {/* <ErrorMessageComponent name="email" /> */}
              </div>
              <div className="w-[45%]">
                <IconInput
                  name="phone"
                  icon={phone}
                  placeholder="Phone"
                  onInput={(e) => onlyNumbers(e)}
                  error={errors?.phone}
                />
                {/* <ErrorMessageComponent name="phone" /> */}
              </div>
            </div>
            <div className=" flex gap-4 mb-6">
              <div className="w-[50%]">
                <IconInput
                  name="company"
                  icon={building}
                  placeholder="Company"
                  error={errors?.company}
                />
                {/* <ErrorMessageComponent name="company" /> */}
              </div>
              <div className="w-[50%]">
                <CustomSelect
                  className="proffession"
                  placeholder="Profession"
                  name="prefession"
                  value={values.prefession}
                  onChange={(e) => setFieldValue("prefession", e)}
                  prefixIcon={<img src={shopping} />}
                  options={[
                    { value: "Private", label: "Private" },
                    { value: "Goverment", label: "Goverment" },
                  ]}
                  error={errors?.prefession}
                />
                {/* <ErrorMessageComponent name="prefession" /> */}
              </div>
            </div>
            <div className=" flex gap-4 mb-6">
              <div className="w-[55%]">
                <IconInput
                  name="region"
                  icon={location}
                  placeholder="Region"
                  error={errors?.region}
                />
                {/* <ErrorMessageComponent name="region" /> */}
              </div>
              <div className="w-[45%]">
                <IconInput
                  name="state"
                  icon={global}
                  placeholder="State"
                  error={errors?.state}
                />
                {/* <ErrorMessageComponent name="state" /> */}
              </div>
            </div>

            <div className="flex justify-between gap-3 items-center mb-6">
              <div className="flex items-center gap-3">
                <RoundedCheckbox />

                <label
                  htmlFor="default-checkbox"
                  className="ml-2 text-sm font-medium text-gray-900 "
                >
                  I agree with all the Terms & Conditions
                </label>
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={() => {
                  validateForm().then((res) => {
                    setTouched(res);
                  });
                  handleSubmit(dirty, values);

                  
                }}
                className="py-4 px-6 text-center bg-blue rounded-full w-full text-white"
              >
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <div className="w-full mt-4 ">
        <div className="flex gap-2 justify-center">
          <p>Already have an account?</p>
          <Link to={"/login"} className="text-blue hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
