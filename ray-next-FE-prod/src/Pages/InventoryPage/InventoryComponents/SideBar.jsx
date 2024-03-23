import React from "react";

import building from "../../../Assets/ventorMenuIcons/buildings.svg";
import box from "../../../Assets/ventorMenuIcons/box.svg";
import share from "../../../Assets/ventorMenuIcons/share.svg";
import element from "../../../Assets/ventorMenuIcons/element-4.svg";
import star from "../../../Assets/ventorMenuIcons/medal-star.svg";
import reciept from "../../../Assets/ventorMenuIcons/receipt-item.svg";
import bank from "../../../Assets/ventorMenuIcons/bank.svg";
import { Link } from "react-router-dom";

const SideBar = ({ setActive, active }) => {
  return (
    <div
      className={` ${
        active ? "w-[88px] p-5 items-center" : "w-[268px] items-start p-8"
      }  fixed  bg-light-gray rounded-xl min-h-[806px] transition-all flex flex-col overflow-hidden`}
    >
      <button onClick={() => setActive(!active)} className="mb-12">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 7H21"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M3 12H21"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M3 17H21"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div>
        <nav>
          <ul className="flex flex-col gap-2">
            <li className="p-3 rounded-2xl bg-blue">
              <Link className="flex items-center gap-3">
                <img src={building} alt="building" />
                <p
                  className={`text-white ${
                    active ? "hidden" : "block"
                  } whitespace-nowrap font-semibold`}
                >
                  Warehouse
                </p>
              </Link>
            </li>
            <li className="p-3 rounded-2xl ">
              <Link className="flex items-center gap-3">
                <img src={box} alt="building" />
                <p
                  className={`${
                    active ? "hidden" : "block"
                  } whitespace-nowrap `}
                >
                  Stock Summary
                </p>
              </Link>
            </li>
            <li className="p-3 rounded-2xl ">
              <Link className="flex items-center gap-3">
                <img src={share} alt="building" />
                <p
                  className={`${
                    active ? "hidden" : "block"
                  } whitespace-nowrap `}
                >
                  Units
                </p>
              </Link>
            </li>
            <li className="p-3 rounded-2xl ">
              <Link className="flex items-center gap-3">
                <img src={element} alt="building" />
                <p
                  className={`${
                    active ? "hidden" : "block"
                  } whitespace-nowrap `}
                >
                  Categories
                </p>
              </Link>
            </li>
            <li className="p-3 rounded-2xl ">
              <Link className="flex items-center gap-3">
                <img src={star} alt="building" />
                <p
                  className={`${
                    active ? "hidden" : "block"
                  } whitespace-nowrap `}
                >
                  Brands
                </p>
              </Link>
            </li>
            <li className="p-3 rounded-2xl ">
              <Link className="flex items-center gap-3">
                <img src={reciept} alt="building" />
                <p
                  className={`${
                    active ? "hidden" : "block"
                  } whitespace-nowrap `}
                >
                  Price List
                </p>
              </Link>
            </li>
            <li className="p-3 rounded-2xl ">
              <Link className="flex items-center gap-3">
                <img src={bank} alt="building" />
                <p
                  className={`${
                    active ? "hidden" : "block"
                  } whitespace-nowrap `}
                >
                  Move Inventory
                </p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
