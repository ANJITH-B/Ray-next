import React from "react";
import LoadingSpinner from "../UtilComponent/LoadingSpinner";

const Button = ({ text, background, loading, ...rest }) => {
  return (
    <button
      {...rest}
      className={`py-2 2xl:py-4 px-6 h-[40px] 2xl:h-[56px] rounded-full w-full whitespace-nowrap 2xl:text-base text-sme flex justify-center ${background} `}
    >
      {loading ? <LoadingSpinner /> : text}
    </button>
  );
};

export default Button;
