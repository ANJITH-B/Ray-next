import React from "react";
import "./formInputStyle.scss";
const BorderLessFileUpload = () => {
  return (
    <div className="flex items-center ">
      <input
        type="file"
        id="borderless-upload"
        className="borderledd-input font-semibold w-[4rem]"
        hidden
      />

      <label htmlFor="borderless-upload" className="flex items-center gap-2 font-semibold text-gray cursor-pointer">
       

        <p> Attach</p>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.91663 10.2077L11.0833 2.04102M2.91663 10.2077V4.21685M2.91663 10.2077H8.90746M2.04163 12.8327H11.9583"
            stroke="#969696"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </label>
    </div>
  );
};

export default BorderLessFileUpload;
