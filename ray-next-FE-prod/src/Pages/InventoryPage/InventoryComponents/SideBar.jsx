import React from "react";

import building from "../../../Assets/ventorMenuIcons/buildings.svg";
import box from "../../../Assets/ventorMenuIcons/box.svg";
import share from "../../../Assets/ventorMenuIcons/share.svg";
import home from "../../../Assets/ventorMenuIcons/home.svg";
import bank from "../../../Assets/ventorMenuIcons/bank.svg";
import { Link, useLocation } from "react-router-dom";

const SideBar = ({ setActive, active }) => {

  const location = useLocation();

  const menuItems = [
    { path: "/inventory", label: "Home", icon: home },
    { path: "/inventory/warehouse", label: "Warehouses", icon: building },
    { path: "/inventory/stock-summary", label: "Stock Summary", icon: box },
    { path: "/inventory/item-archive", label: "Item Archive", icon: share },
    { path: "/inventory/move-inventory", label: "Move Inventory", icon: bank },
  ];
  return (
    <div
      className={` ${active ? "w-[88px] p-5 items-center" : "w-[268px] items-start p-8"
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
      <nav>
        <ul className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={`p-3 rounded-2xl ${location.pathname === item.path ? "bg-blue text-white" : ""
                }`}
            >
              <Link className="flex items-center gap-3" to={item.path}>
                <img src={item.icon} alt={item.label} />
                <div
                  className={`${active ? "hidden" : "block"
                    } whitespace-nowrap`}
                >
                  {item.label}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
