import React from "react";
import { Link } from "react-router-dom";

const MenuCard = ({
  color,
  isButton = false,
  image,
  head,
  links = [],
  value,
  subHead,
}) => {
  return (
    <div className="max-h-[388px] max-w-[329px] p-2  rounded-[30px] border border-gray overflow-hidden">
      <div className="h-full">
        <div className={` ${color} rounded-[26px] p-3 max-h-[291px]`}>
          <div>
            <div className="2xl:w-12 2xl:h-12 w-8  h-8 flex items-center justify-center rounded-full bg-white mb-4">
              <img src={image} className="2xl:w-7 2xl:h-7 w-5 h-5" />
            </div>
          </div>
          <div>
            <h1 className=" text-2xl 2xl:text-[32px] font-semibold mb-4">
              {head}
            </h1>
            <div className="flex flex-wrap gap-[13px] ">
              {links?.map((item) => {
                if (item.isButton) {
                  return (
                    <button
                      onClick={item?.onClick}
                      className=" flex items-center px-3 h-[28px] 2xl:h-[33px] hover:bg-dark-color text-xs 2xl:text-sm hover:text-white transition-all py-[3px] 2xl:py-[5px] rounded-full border border-gray"
                    >
                      {item?.content}
                    </button>
                  );
                } else {
                  return (
                    <Link
                      to={item.path}
                      className=" flex items-center px-3 h-[28px] 2xl:h-[33px] hover:bg-dark-color text-xs 2xl:text-sm hover:text-white transition-all py-[3px] 2xl:py-[5px] rounded-full border border-gray"
                    >
                      {item.content}
                    </Link>
                  );
                }
              })}
            </div>
          </div>
        </div>
        <div className="flex h-[20%] w-full mt-2  items-center justify-between gap-2 p-2">
          <div>
            <h3 className=" text-base 2xl:text-xl font-semibold ">25%</h3>
            <p className=" text-xs 2xl:text-sm">increase in total sales</p>
          </div>
          <Link className="px-4 py-2 hover:bg-transparent text-xs 2xl:text-sm hover:text-dark-color transition-all hover:border border-dark-color bg-dark-color rounded-full text-white">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
