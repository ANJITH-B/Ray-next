import { DatePicker } from "antd";
import React, { useState } from "react";
import "./otherComponentStyle.scss";
import { SlidersOutlined } from "@ant-design/icons";
const AllHeadSection = ({ name, head, formik, id ,isActive, toggleIsActive}) => {
  // const [isActive, setIsActive] = useState(false);
  // const handleClick = () => {
  //   setIsActive(!isActive);
  // };
  const [active, setActive] = useState({
    id: false,
    date: false,
  });
  return (
    <div className="mb-8">
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-2 ">
          <p className="  text-xl 2xl:text-2xl text-dark-color font-semibold mr-3">{head}</p>
          <div
            className={`${active.id ? "border-b-[1px] " : "border-none"
              } transition-all border-blue border-opacity-25 flex gap-3`}
          >
            <p className=" text-[28px] 2xl:text-[32px]  text-blue font-semibold">{id}</p>
            {/* <input
            name={name}
            onChange={formik.handleChange}
            readOnly={true}
            value={id}
            placeholder="Enter ID"
            className={` max-w-[25rem] bg-transparent placeholder:font-normal placeholder:text-[32px] transition-all
             placeholder:text-blue placeholder:opacity-50 text-[32px]  text-blue font-semibold`}
          /> */}

            <button
              onClick={() => setActive((pre) => ({ ...pre, id: !active.id }))}
              className={` p-2 rounded-full hover:bg-slate-100 active:bg-slate-200 transition-all`}
              disabled
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.05 3.00002L4.20829 10.2417C3.94996 10.5167 3.69996 11.0584 3.64996 11.4334L3.34162 14.1333C3.23329 15.1083 3.93329 15.775 4.89996 15.6084L7.58329 15.15C7.95829 15.0834 8.48329 14.8084 8.74162 14.525L15.5833 7.28335C16.7666 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2333 1.75002 11.05 3.00002Z"
                  stroke="#4A9CE8"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.90833 4.20898C10.083 5.32636 10.6238 6.3541 11.4458 7.13086C12.2679 7.90762 13.3245 8.38943 14.45 8.50065M2.5 18.334H17.5"
                  stroke="#4A9CE8"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <button
          className={`p-1 px-1.5 mr-8 rounded-full border border-white text-gray ${isActive ? 'bg-blue border-white' : 'bg-'}`}
          onClick={toggleIsActive}>
          <SlidersOutlined className={`${isActive ? 'text-white' : ''} slider`}  />
        </button>
      </div>
      <div className="flex items-baseline gap-2">
        <p className="text-base text-gray">Issuing date:</p>
        <div>
          <DatePicker
            format={"DD MMM YYYY"}
            onChange={(event, date) =>
              formik.setFieldValue("issued_date", date)
            }
            name="issued_date"
            className="issue-date"
            bordered={false}
            inputReadOnly
            suffixIcon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.83994 2.4008L3.36661 8.19413C3.15994 8.41413 2.95994 8.84746 2.91994 9.14746L2.67328 11.3075C2.58661 12.0875 3.14661 12.6208 3.91994 12.4875L6.06661 12.1208C6.36661 12.0675 6.78661 11.8475 6.99327 11.6208L12.4666 5.82746C13.4133 4.82746 13.8399 3.68746 12.3666 2.29413C10.8999 0.914129 9.78661 1.4008 8.83994 2.4008Z"
                  stroke="#969696"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.92667 3.36719C8.06643 4.26109 8.49907 5.08328 9.15668 5.70469C9.81428 6.32609 10.6596 6.71154 11.56 6.80052M2 14.6672H14"
                  stroke="#969696"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AllHeadSection;
