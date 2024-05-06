import React from "react";
import BorderdSelectRounded from "../FormInputs/BorderdSelectRounded";

const Pagination = ({ setFilter, filter }) => {
  return (
    <div className="flex justify-end w-full gap-10 mt-6 ">
      <div className="flex w-[12rem] items-center gap-3">
        <p className="break-normal text-base 2xl:text-lg whitespace-nowrap">Item per page</p>
        <BorderdSelectRounded
          onChange={(e) => {
            setFilter((pre) => ({ ...pre, pageCount: e }));
          }}
          defaultValue={{ value: filter?.pageCount ?? 10, label: filter?.pageCount ?? 10 }}
          items={[{ value: 10, label: 10 }, { value: 20, label: 20 }]}
        />
      </div>
      <div className="flex gap-3">
        {console.log(filter)}
        <button
          disabled={filter?.pageNo <= 1}
          onClick={() => setFilter((pre) => ({ ...pre, pageNo: pre.pageNo - 1 }))}
          className="2xl:px-5 2xl:py-4 px-4 py-3 border-[1px] rounded-3xl border-border-gray"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.3174 3.05945L6.42738 7.94945C5.84988 8.52695 5.84988 9.47195 6.42738 10.0495L11.3174 14.9395"
              stroke="#969696"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={() => setFilter((pre) => ({ ...pre, pageNo: pre.pageNo + 1 }))}
          className="2xl:px-5 2xl:py-4 px-4 py-3 border-[1px] rounded-3xl border-border-gray"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.68262 14.9405L11.5726 10.0505C12.1501 9.47305 12.1501 8.52805 11.5726 7.95055L6.68262 3.06055"
              stroke="black"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
