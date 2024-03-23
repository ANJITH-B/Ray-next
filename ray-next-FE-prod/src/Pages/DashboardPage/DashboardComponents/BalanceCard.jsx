import React from "react";
const BalanceCard = ({
  image,
  head,
  color,
  currency = false,
  currencyLeft = false,
  count,
  width = "w-full",
}) => {
  return (
    <div
      className={` h-[130px]  2xl:h-[200px] w-full 2xl:rounded-[40px] rounded-[25px] hover:ring-2 transition-all focus:ring-1 cursor-pointer
        relative overflow-hidden ${color}`}
    >
      <div className="absolute w-full h-full   ring-[50px] blur-xl ring-white"></div>
      <div className="w-full h-full relative z-[1] flex flex-col justify-between gap-6 p-4 2xl:p-5">
        <div className=" w-6 h-6">
          <img className="w-full" src={image} alt="" />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className=" text-[10px] whitespace-nowrap 2xl:text-base text-dark-color">{head}</h1>
          <div className=" text-xl 2xl:text-2xl font-semibold text-dark-color">
            <p>
              {" "}
              {currencyLeft && <span className="mr-2">{currencyLeft}</span>}
              {count}
              {currency && <span className="text-[12px] ml-1">{currency}</span>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
