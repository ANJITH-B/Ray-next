import React from "react";
import { Link } from "react-router-dom";

const SectionCard = ({ head, content ,color}) => {
  return (
    <div  className={`ring-[2px] hover:ring-0 transition-all ring-[#B0B0B0]  min-w-[369px] h-[186px] rounded-3xl`}>
      <Link className="p-7 flex justify-between gap-3 w-full">
        <div>
          <h2 className="text-2xl font-semibold max-w-[100px] mb-4">{head}</h2>
          <p className="text-sm">{content}</p>
        </div>

        <div>
          <svg
            width="37"
            height="37"
            viewBox="0 0 37 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.2832 3.2832C9.99893 3.2832 3.2832 9.99893 3.2832 18.2832C3.2832 26.5675 9.99893 33.2832 18.2832 33.2832C26.5675 33.2832 33.2832 26.5675 33.2832 18.2832C33.2832 9.99893 26.5675 3.2832 18.2832 3.2832Z"
              stroke="#121212"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.0332 18.2832H22.0332"
              stroke="#121212"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.0332 22.7832L23.5332 18.2832L19.0332 13.7832"
              stroke="#121212"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </Link>
    </div>
  );
};

export default SectionCard;
