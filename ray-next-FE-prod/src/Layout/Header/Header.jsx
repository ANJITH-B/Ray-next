import React, { useRef,useState  } from "react";
import menu from "../../Assets/CommonImages/menu.svg";
import logo from "../../Assets/CommonImages/RayNext.svg";
import avtar from "../../Assets/CommonImages/avtar.png";
import { Dropdown } from "antd";
import { Link, useLocation, useNavigate, useNavigation } from "react-router-dom";
import home from "../../Assets/HeaderIcons/home.svg";
import account from "../../Assets/HeaderIcons/account.svg";
import logout from "../../Assets/HeaderIcons/logout.svg";
import money from "../../Assets/HeaderIcons/money.svg";
import purchase from "../../Assets/HeaderIcons/purchase.svg";
import reciept from "../../Assets/HeaderIcons/reciept.svg";
import sale from "../../Assets/HeaderIcons/sale.svg";
import report from "../../Assets/HeaderIcons/report.svg";
import NotificationModal from "../../CommonComponents/OtherComponent/NotificationModal";
import { useSocket } from "../../Context/SocketContext";

import "../layoutStyle.scss";
import DateSelect from "../../Pages/DashboardPage/DashboardComponents/DateSelect";
const Header = () => {
  const navigate = useNavigate();
  const { notifications } = useSocket() || {};
  const [showNotifications, setShowNotifications] = useState(false);
  const items = [
    {
      label: (
        <Link to={'/home'} className="flex gap-4 items-center">
          <img src={home} alt="home" />
          <p className="text-base">Home</p>
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link to={'/sales/invoice'} className="flex gap-4 items-center">
          <img src={sale} alt="home" />
          <p className="text-base">Sales</p>
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <Link to={'/purchase/bill'} className="flex gap-4 items-center">
          <img src={purchase} alt="home" />
          <p className="text-base">Purchase</p>
        </Link>
      ),
      key: "2",
    },
    {
      label: (
        <Link className="flex gap-4 items-center">
          <img src={money} alt="home" />
          <p className="text-base">Payment</p>
        </Link>
      ),
      key: "3",
    },
    {
      label: (
        <Link className="flex gap-4 items-center">
          <img src={reciept} alt="home" />
          <p className="text-base">Receipt</p>
        </Link>
      ),
      key: "4",
    },
    {
      label: (
        <Link className="flex gap-4 items-center">
          <img src={account} alt="home" />
          <p className="text-base">Accounts</p>
        </Link>
      ),
      key: "5",
    },
    {
      label: (
        <Link className="flex gap-4 items-center">
          <img src={report} alt="home" />
          <p className="text-base">Reports</p>
        </Link>
      ),
      key: "6",
    },
    {
      type: "divider",
    },
    {
      label: (
        <button
          className="flex gap-4 items-center"
          onClick={() => {
            localStorage.removeItem("Tokens");
            navigate("/login");
          }}
        >
          <img src={logout} alt="home" />
          <p className="text-base">Sign out</p>
        </button>
      ),
      key: "7",
    },
  ];

  const path = useLocation().pathname
  return (
    <header className="border-b-2 bg-white  sticky top-0 z-[1000] border-light-gray">
      <div className="  flex max-w-[1512px]    m-auto items-center justify-between px-6 h-[80px] 2xl:h-[115px] ">
      <div className="flex  2xl:gap-14">
        <Dropdown
          menu={{ items }}
          overlayClassName="menu-dropdown  "
          trigger={["click"]}
          className="w-[15rem] "
        >
          <div className="flex gap-4 2xl:gap-5 items-center cursor-pointer">
            <img src={menu} alt="menu" />
            <img src={logo} alt="logo" className="mt-1 w-[5rem] 2xl:w-[6rem]" />
          </div>
        </Dropdown>

        <div>
          <nav>
            <ul className="flex gap-6 2xl:gap-8">
              <li className={` ${path === '/home' ? 'border-black border-b-4':''}  text-sm 2xl:text-base   border-spacing-y-6`}>
                <Link to="/home">Accounts</Link>
              </li>
              <li className={` ${path === '/inventory' ? 'border-black border-b-4':''}  text-sm 2xl:text-base  border-spacing-y-6`}>
                <Link to="/inventory">Inventory</Link>
              </li>
              <li className={` ${path === '/branches' ? 'border-black  border-b-4':''}  text-sm 2xl:text-base  border-spacing-y-6`}>
                <Link to="">Branch</Link>
              </li>
              <li className={` ${path === '/files' ? 'border-black  border-b-4':''}  text-sm 2xl:text-base  border-spacing-y-6`}>
                <Link to="">Files</Link>
              </li>
              <li className={` ${path === '/user' ? 'border-black  border-b-4':''}  text-sm 2xl:text-base  border-spacing-y-6`}>
                <Link to="">Users</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="flex gap-3 2xl:gap-4 items-center">
        {path === '/home' ? <div className="flex max-w-[261px] items-center gap-3 bg-light-gray rounded-full overflow-hidden  py-2 px-6">
          <input
            type="text"
            placeholder="Search"
            className=" bg-transparent h-6 text-sm 2xl:text-base 2xl:h-10 w-full"
          />
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 2xl:w-6"
          >
            <path
              d="M21 21L19 19M10.5 20C11.7476 20 12.9829 19.7543 14.1355 19.2769C15.2881 18.7994 16.3354 18.0997 17.2175 17.2175C18.0997 16.3354 18.7994 15.2881 19.2769 14.1355C19.7543 12.9829 20 11.7476 20 10.5C20 9.25244 19.7543 8.0171 19.2769 6.86451C18.7994 5.71191 18.0997 4.66464 17.2175 3.78249C16.3354 2.90033 15.2881 2.20056 14.1355 1.72314C12.9829 1.24572 11.7476 1 10.5 1C7.98044 1 5.56408 2.00089 3.78249 3.78249C2.00089 5.56408 1 7.98044 1 10.5C1 13.0196 2.00089 15.4359 3.78249 17.2175C5.56408 18.9991 7.98044 20 10.5 20Z"
              stroke="#969696"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div> :
        <DateSelect />
        }
        <div onClick={() => setShowNotifications(!showNotifications)} className="flex items-center gap-3   bg-light-gray rounded-full overflow-hidden  w-[40px] h-[40px] 2xl:w-[56px] 2xl:h-[56px] py-2 px-3 2xl:px-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 2xl:w-6"
          >
            <path
              d="M12.0201 2.91016C8.71009 2.91016 6.02009 5.60016 6.02009 8.91016V11.8002C6.02009 12.4102 5.76009 13.3402 5.45009 13.8602L4.30009 15.7702C3.59009 16.9502 4.08009 18.2602 5.38009 18.7002C9.69009 20.1402 14.3401 20.1402 18.6501 18.7002C19.8601 18.3002 20.3901 16.8702 19.7301 15.7702L18.5801 13.8602C18.2801 13.3402 18.0201 12.4102 18.0201 11.8002V8.91016C18.0201 5.61016 15.3201 2.91016 12.0201 2.91016Z"
              stroke="#121212"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
            />
            <path
              d="M13.8699 3.19945C12.6606 2.85504 11.3792 2.85504 10.1699 3.19945C10.4599 2.45945 11.1799 1.93945 12.0199 1.93945C12.8599 1.93945 13.5799 2.45945 13.8699 3.19945Z"
              stroke="#121212"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.02 19.0605C15.02 20.7105 13.67 22.0605 12.02 22.0605C11.2 22.0605 10.44 21.7205 9.90002 21.1805C9.33818 20.6179 9.02181 19.8557 9.02002 19.0605"
              stroke="#121212"
              strokeWidth="1.5"
              strokeMiterlimit="10"
            />
          </svg>
        </div>
        {notifications?.length > 0 && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{notifications.length}</span>
        )}
        <div className="flex items-center gap-3 bg-light-gray rounded-full overflow-hidden w-[40px] h-[40px] 2xl:w-[56px] 2xl:h-[56px]  py-2 px-3 2xl:px-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 2xl:w-6"
          >
            <path
              d="M17.98 10.79V14.79C17.98 15.05 17.97 15.3 17.94 15.54C17.71 18.24 16.12 19.58 13.19 19.58H12.79C12.54 19.58 12.3 19.7 12.15 19.9L10.95 21.5C10.42 22.21 9.56 22.21 9.03 21.5L7.83 19.9C7.74995 19.8068 7.65212 19.7305 7.54223 19.6755C7.43234 19.6206 7.31259 19.5881 7.19 19.58H6.79C3.6 19.58 2 18.79 2 14.79V10.79C2 7.86 3.35 6.27 6.04 6.04C6.28 6.01 6.53 6 6.79 6H13.19C16.38 6 17.98 7.6 17.98 10.79Z"
              stroke="#121212"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21.98 6.79V10.79C21.98 13.73 20.63 15.31 17.94 15.54C17.97 15.3 17.98 15.05 17.98 14.79V10.79C17.98 7.6 16.38 6 13.19 6H6.79004C6.53004 6 6.28004 6.01 6.04004 6.04C6.27004 3.35 7.86004 2 10.79 2H17.19C20.38 2 21.98 3.6 21.98 6.79Z"
              stroke="#121212"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.4951 13.25H13.5051M9.99512 13.25H10.0051M6.49512 13.25H6.50512"
              stroke="#121212"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex items-center gap-3 bg-light-gray rounded-full overflow-hidden w-[40px] h-[40px] 2xl:w-[56px] 2xl:h-[56px] py-2 px-3 2xl:px-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 2xl:w-6"
          >
            <path
              d="M2 22H22"
              stroke="#121212"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.75 4V22H14.25V4C14.25 2.9 13.8 2 12.45 2H11.55C10.2 2 9.75 2.9 9.75 4ZM3 10V22H7V10C7 8.9 6.6 8 5.4 8H4.6C3.4 8 3 8.9 3 10ZM17 15V22H21V15C21 13.9 20.6 13 19.4 13H18.6C17.4 13 17 13.9 17 15Z"
              stroke="#121212"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex items-center gap-3 bg-light-gray rounded-full overflow-hidden  w-[40px] h-[40px] 2xl:w-[56px] 2xl:h-[56px]">
          <img src={avtar} alt="user"  />
        </div>
      </div>
      </div>
      {showNotifications && <NotificationModal isOpen={showNotifications} onClose={() => setShowNotifications(false)} />}
    </header>
  );
};

export default Header;
