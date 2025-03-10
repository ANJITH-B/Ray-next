import { Dropdown, Tooltip } from "antd";
import logo from "../../Assets/CommonImages/unicorn.svg";
import "./otherComponentStyle.scss";
import React, { useEffect, useState } from "react";
import add from "../../Assets/CommonImages/profile-add.svg";
import AddCustomerModal from "./AddCustomerModal";
import AddSuppleirModal from "./AddSupplierModal";
import { useGetCustomer } from "../../Queries/CustomerQuery/CustomerQuery";
import { v4 } from "uuid";
const CustomerCard = ({ item, formik, setCustomer }) => {
  return (
    <div
      onClick={() => {
        setCustomer(item);
        formik.setFieldValue("customer_id", item._id);
      }}
      className={` ${
        formik.values.customer_id === item.id ? "bg-light-gray" : ""
      } flex gap-4 p-5 items-center cursor-pointer hover:bg-light-gray`}
    >
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <img className="w-full" src={logo} alt="" />
      </div>
      <div>
        <h1 className="text-dark-color font-semibold">{item.name}</h1>
        {/* <p className="text-sm text-gray font-light">Existing supplier</p> */}
      </div>
    </div>
  );
};
const CustomDropdown = ({ formik, setCustomer }) => {
  const [customerOpen, setCustomerOpen] = useState(false);
  const { data } = useGetCustomer({ pageNo: 1 });
   const [search, setSearch] = useState("");

   const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredCustomers = data?.data?.data?.data?.filter((customer) => {
    const name = customer.name || ""; 
    const code = customer.warehouseCode || ""; 
    return (
      name.toLowerCase().includes(search.toLowerCase()) || 
      code.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="w-full max-h-[500px] relative flex flex-col justify-between bg-white rounded-[30px] shadow-lg mt-3 overflow-hidden">
      <div className="p-5 border-b-[1px] border-border-gray">
        <div className="bg-light-gray px-5 py-3 rounded-full flex items-center gap-3">
         
          <input
            type="text"
            placeholder="Search"
            value={search} 
            onChange={handleSearchChange} 
            className="bg-transparent w-full placeholder:text-lg"
          />
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5 18.3337L15.8333 16.667M8.74998 17.5003C9.78961 17.5003 10.8191 17.2956 11.7796 16.8977C12.7401 16.4999 13.6128 15.9167 14.3479 15.1816C15.083 14.4465 15.6662 13.5737 16.064 12.6132C16.4619 11.6527 16.6666 10.6233 16.6666 9.58366C16.6666 8.54403 16.4619 7.51458 16.064 6.55408C15.6662 5.59359 15.083 4.72086 14.3479 3.98573C13.6128 3.2506 12.7401 2.66746 11.7796 2.26961C10.8191 1.87176 9.78961 1.66699 8.74998 1.66699C6.65035 1.66699 4.63671 2.50107 3.15205 3.98573C1.66739 5.47039 0.833313 7.48403 0.833313 9.58366C0.833313 11.6833 1.66739 13.6969 3.15205 15.1816C4.63671 16.6662 6.65035 17.5003 8.74998 17.5003Z"
              stroke="#969696"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="gap-3  overflow-auto flex flex-col dropdown-scroll">
        {filteredCustomers?.map((e) => {
          return (
            <CustomerCard
              setCustomer={setCustomer}
              formik={formik}
              item={e}
              key={v4()}
            />
          );
        })}
      </div>

      <div className="border-t-[1px]  border-border-gray sticky bottom-0">
        <button
          onClick={() => setCustomerOpen(true)}
          className="text-blue w-full h-full justify-center text-base font-semibold p-5 flex items-center gap-2"
        >
          <img src={add} alt="" />
          Add Customer
        </button>
      </div>
      <AddCustomerModal open={customerOpen} setOpen={setCustomerOpen} />
    </div>
  );
};

const IssuerCard = ({ formik, clear }) => {
  const [active, setActive] = useState(false);
  const [customer, setCustomer] = useState("");
  useEffect(() => {
    if (clear) {
      setCustomer("");
    }
  }, [clear]);
  return (
    <Dropdown
      trigger={["click"]}
      dropdownRender={() => {
        return <CustomDropdown setCustomer={setCustomer} formik={formik} />;
      }}
      className="issuer-dropdown"
      onOpenChange={() => setActive(!active)}
    >
      <div
        className={`min-w-[320px] 2xl:w-[373px] min-h-[180px] flex  2xl:min-h-[180px]  rounded-[30px] cursor-pointer  ${
          active
            ? "border-[3px] border-blue"
            : "border-[1px] border-border-gray"
        } transition-all ] ${
          formik.errors.customer_id ? "border-[1px] border-error-color" : ""
        }`}
      >
        <div className="px-6 py-4 w-full flex flex-col justify-between gap-4 ">
          <div className="w-full  flex justify-between items-center">
            <h2 className=" text-sm 2xl:text-base">Customer</h2>
            <button className="flex justify-end">
              {formik.errors.customer_id ? (
                <div
                  className={`${
                    formik.errors.customer_id
                      ? "pointer-events-auto opacity-100"
                      : "pointer-events-none opacity-0"
                  } cursor-pointer `}
                >
                  <Tooltip
                    trigger={"hover"}
                    title={formik.errors.customer_id}
                    color="white"
                    className="error-tooltip"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 6V9.75M9 16.5C13.125 16.5 16.5 13.125 16.5 9C16.5 4.875 13.125 1.5 9 1.5C4.875 1.5 1.5 4.875 1.5 9C1.5 13.125 4.875 16.5 9 16.5Z"
                        stroke="#F42F2F"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </Tooltip>
                </div>
              ) : (
                <div
                  className={`${
                    active ? "rotate-[360deg]" : " rotate-180 "
                  } transition-all`}
                >
                  <svg
                    width="12"
                    height="7"
                    viewBox="0 0 12 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5.48047L5.11616 1.36431C5.60227 0.878196 6.39773 0.878196 6.88384 1.36431L11 5.48047"
                      stroke="#121212"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </button>
          </div>
          <div className="flex gap-3 items-center ">
            <div className="w-12 h-12">
              <img src={logo} alt="logo" className="w-12 h-12" />
            </div>
            <div>
              <h4 className="text-dark-color text-sm 2xl:text-base font-semibold whitespace-nowrap">
                {customer !== "" ? customer.name : "Select Customer"}
              </h4>
              <p className="text-gray text-xs 2xl:text-sm">
                {customer?.contact_details?.email}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm max-w-[70%]">
              {customer?.office_details?.address}{" "}
            </p>
          </div>
        </div>
      </div>
    </Dropdown>
  );
};

export default IssuerCard;
