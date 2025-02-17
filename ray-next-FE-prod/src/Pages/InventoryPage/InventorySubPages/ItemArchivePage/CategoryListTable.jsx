import React, { useEffect, useState } from "react";
import BordedTable from "../../../../CommonComponents/Tables/BorderdTabel";
import Pagination from "../../../../CommonComponents/OtherComponent/Pagination";
import { Dropdown } from "antd";
import BorderdSelect from "../../../../CommonComponents/FormInputs/BorderdSelect";
import BorderdInput from "../../../../CommonComponents/FormInputs/BorderdInput";
import { useGetCategories } from "../../../../Queries/InventoryQuery/InventoryQuery";

const Filter = ({ setFilter, tabIndex }) => {
   const [date, seDate] = useState();
   const [under, setUnder] = useState();
   const [name, setName] = useState();
   return (
      <Dropdown
         dropdownRender={() => {
            return (
               <div className="bg-white w-[150%] p-6 2xl:p-8 shadow-lg">
                  <div className="flex justify-center gap-5">
                     <BorderdSelect
                        onChange={(e, i) => {
                           seDate(e);
                        }}
                        placeholder="Select"
                        items={[{ label: "Set" }, { label: "Type" }]}
                     />

                     <BorderdSelect
                        onChange={(e, i) => {
                           setUnder(e);
                        }}
                        placeholder="Select"
                        items={[{ label: "Set" }, { label: "Type" }]}
                     />
                     <BorderdInput
                        onChange={(e, i) => {
                           setName(e.target.value);
                        }}
                        placeholder="Enter"
                     />
                  </div>
                  <div className="flex justify-end mt-4 text-lg font-semibold">
                     <button
                        onClick={() =>
                           setFilter([
                              {
                                 label: "Date",
                                 value: date,
                              },
                              {
                                 label: "Under",
                                 value: under,
                              },
                              {
                                 label: "Name",
                                 value: name,
                              },
                           ])
                        }
                     >
                        Apply filter
                     </button>
                  </div>
               </div>
            );
         }}
         trigger={["click"]}
      >
         <button className=" px-4 2xl:px-6 py-2 2xl:py-3 rounded-full text-sm 2xl:text-base  border-[1px] border-border-gray">
            Add filter +{" "}
         </button>
      </Dropdown>
   );
};

const CategoryListTable = ({ tabIndex }) => {
   const [filter, setFilter] = useState({
      pageNo: 1,
      pageCount: 10,
   });
   const { data, isLoading } = useGetCategories(filter);
   useEffect(() => {
      console.log(data?.data)
   }, [data])
   const InvoiceColumns = [
      {
         title: "Category",
         key: "name",
         className: "text-base",
         dataIndex: "name",
         width: 150,
      },
      {
         title: "Alias",
         key: "alias",
         className: "text-base",
         dataIndex: "alias",
         width: 170,
      },
      {
         title: "Products",
         key: "products",
         className: "text-base",
         dataIndex: "products",
         width: 150,
      },
      {
         title: "Description",
         key: "description",
         className: "text-base",
         dataIndex: "description",
         width: 150,
      },
      {
         title: "Last updated",
         key: "updated",
         className: "text-base",
         dataIndex: "updated",
         width: 150,
      },
      {
         title: "Status",
         key: "status",
         className: "text-base",
         dataIndex: "status",
         width: 150,
         render: (item, record) => {
            return (
               <div className=" flex justify-center items-center gap-2">
                  <p
                     className={`px-3 py-1 ${item
                        ? "bg-[#12B13F] text-[#12B13F]"
                        : "bg-[#D7751B] text-[#D7751B]"
                        } bg-opacity-20 rounded-xl text-sm`}
                  >
                     {item ? "Active" : "InActive"}
                  </p>
               </div>
            );
         },
      },
   ];

   const items = [
      {
         label: "Name",
         key: "0",
      },
      {
         label: "Account code",
         key: "1",
      },
      {
         label: "Email",
         key: "3",
      },
      {
         label: "Contact person",
         key: "4",
      },
      {
         label: "Contact number",
         key: "5",
      },
      {
         label: "Address",
         key: "6",
      },
      {
         label: "Remarks",
         key: "7",
      },
   ];
   const categoryData = data?.data?.map((e) => ({
      name: e?.name,
      alias: e?.alias,
      description: e?.description === "" ? "-" : e?.description,
      products: e?.products?.length ?? 0,
      updated: new Date(e?.updatedAt)?.toLocaleDateString(),
      status: e?.isVerify,
   }));

   return (
      <div className="h-full mt-4">
         <div className="flex gap-2 items-center w-full justify-between mb-4">
            <Filter setFilter={setFilter} tabIndex={tabIndex} />
            {/* <div className="flex items-center gap-2">
          {filter?.map((e, index) => {
            if (e.value !== undefined) {
              return (
                <div
                  key={v4()}
                  className="px-6 py-3 gap-2 bg-light-gray rounded-full flex "
                >
                  <p className="text-gray ">{e.label}:</p>
                  <p className="text-base ">{e.value}</p>
                  <button
                    onClick={() => {
                      setFilter(
                        filter?.filter((e, i) => {
                          return i != index;
                        })
                      );
                    }}
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.60657 8.67654L8.67763 1.60547M8.67763 8.67654L1.60657 1.60547"
                        stroke="#969696"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              );
            }
          })}
        </div> */}
            <div>
               <Dropdown menu={{ items }} trigger={["click"]}>
                  <button className="px-4 2xl:px-6 py-2 2xl:py-3 2xl:text-base text:sm rounded-full border-[1px] flex items-center gap-4">
                     <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           d="M2.99243 11.6175L6.75743 15.375V2.625M15.0074 6.3825L11.2424 2.625V15.375"
                           stroke="#969696"
                           strokeWidth="1.5"
                           strokeMiterlimit="10"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        />
                     </svg>
                     Sort{" "}
                  </button>
               </Dropdown>
            </div>
         </div>
         <BordedTable
            loading={isLoading}
            columns={InvoiceColumns}
            data={categoryData}
         />
         <Pagination setFilter={setFilter} filter={filter} />
      </div>
   );
};

export default CategoryListTable;
