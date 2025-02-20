import React, { useState } from "react";
import BordedTable from "../../../CommonComponents/Tables/BorderdTabel";

import Pagination from "../../../CommonComponents/OtherComponent/Pagination";
import { Dropdown } from "antd";
import BorderdSelect from "../../../CommonComponents/FormInputs/BorderdSelect";
import BorderdInput from "../../../CommonComponents/FormInputs/BorderdInput";
import { useGetInventory, useDeleteInventory } from "../../../Queries/InventoryQuery/InventoryQuery";
import AddInventoryModal from "../../../CommonComponents/OtherComponent/AddInventoryModal";
import { toast } from "react-hot-toast";

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
const ProductListTable = ({ tabIndex }) => {
  const [filter, setFilter] = useState({
    pageNo: 1,
    pageCount: 10,
  });
  const { data: inventory, isLoading } = useGetInventory(filter);
  const [open, setOpen] = useState(false);
   const [editData, setEditData] = useState(null);
   const { mutateAsync: deleteInventory } = useDeleteInventory();

   const handleEdit = (record) => {
      console.log("record1", record);
      setEditData(record);
      setOpen(true);
   };

   const handleDelete = async (record) => {
      console.log("record", record);

      try {
         await deleteInventory(record.id);
         toast.success("Inventory deleted successfully");
      } catch (error) {
         toast.error("Error deleting inventory");
      }
   };
  const InvoiceColumns = [
    {
      title: "Product Code",
      dataIndex: "Product Code",
      key: "Product Code",
      width: 100,
      className: "text-base font-semibold w-[6rem]",
    },
    {
      title: "Catogery",
      dataIndex: "Catogery",
      key: "Catogery",
      width: 120,
      render: (item, record) => {
        return (
          <div className=" ">
            <p className="">{item?.catogery}</p>
            <p className="text-xs opacity-50">{item?.unit} items</p>
          </div>
        );
      },
    },
    {
      title: "Brand",
      key: "Brand",
      className: "text-base",
      dataIndex: "Brand",
      width: 170,
    },
    {
      title: "Name",
      key: "Name",
      className: "text-base",
      dataIndex: "Name",
      width: 150,
    },
    {
      title: "Stock",
      key: "Stock",
      className: "text-base",
      dataIndex: "Stock",
      width: 150,
    },
    {
      title: "Status",
      key: "Status",
      className: "text-base",
      dataIndex: "Status",
      width: 150,

      render: (item, record) => {
        return (
          <div className=" flex justify-center items-center gap-2">
            <p
              className={`px-3 py-1 ${
                item
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
  console.log("inventory", inventory?.data?.data?.data);
  const inventoryData = inventory?.data?.data?.data?.map((e) => ({
    id: e?._id,
    "Product Code": e?.item_code,
    Catogery: { catogery: e?.category, unit: e?.unit_details?.unit },
    Item_code: e?.item_code,
    Bar_code: e?.barcode,
    Valuation: e?.valuation,
    Stock: e?.stock,
    Stock_unit: e?.stock_unit,
    Minimum_quantity: e?.minimum_quantity,
    Image_url: e?.image_url,
    Excludefromstock: e?.excludefromstock,
    Active: e?.active,
    Brand: e?.brand,
    Name: e?.name,
    Stock: e?.stock,
    Status: e?.active,
    Action: "",
    unit: e?.unit_details,
  }));

  //   const invoiceData = data?.data?.data?.data?.map((e) => [
  //     {
  //       Name: e.invoice_id,
  //       "Acc. code": e.issuing_date,
  //       Under: e.customerInfo[0].name,
  //       Email: "Grocery",
  //       "Contact person": "$274.00",
  //       "Contact number": "$828.00",
  //       Address: "$551.00",
  //       Remarks: "$211.00",

  //       Action: "",
  //     },
  //   ]);

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
      {/* <BordedTable
        loading={isLoading}
        columns={InvoiceColumns}
        data={inventoryData}
      /> */}
      <BordedTable loading={isLoading} columns={InvoiceColumns} data={inventoryData} onEdit={handleEdit} onDelete={handleDelete} />
      <Pagination setFilter={setFilter} filter={filter}/>
      {open && <AddInventoryModal setOpen={setOpen} open={open} editData={editData} />}
    </div>
  );
};

export default ProductListTable;
