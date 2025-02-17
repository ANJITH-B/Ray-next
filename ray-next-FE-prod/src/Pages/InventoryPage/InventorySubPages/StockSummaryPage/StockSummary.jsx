
import React, { useState } from "react";
import SideBar from "../../InventoryComponents/SideBar";
import { Link } from "react-router-dom";
import printer from "../../../../Assets/CommonImages/printer.svg";
import excel from "../../../../Assets/CommonImages/excel.svg";
import Button from "../../../../CommonComponents/FormInputs/Button";
import { Tabs } from "antd";
import ProductListTable from "../../InventoryComponents/ProductListTable";
import AddWarehouseModel from "../../../../CommonComponents/OtherComponent/AddWarehouseModel";

const StockSummary = () => {
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState("1");
  const [active, setActive] = useState(true);


  const tabItems = [
    {
      key: "1",
      label: "Product List",
      children: <ProductListTable tabIndex={tabIndex} />,
    },
    {
      key: "2",
      label: "Low Stock",
      children: <ProductListTable tabIndex={tabIndex} />,
    },
  ];
  return (
    <div className="px-8 pt-8 max-w-[1512px]    m-auto ">
      <div>
        <SideBar setActive={setActive} active={active} />
      </div>
      <div
        className={`w-auto  ${active ? "ml-[130px]" : "ml-[300px]"
          } transition-all`}
      >
        <div className=" flex justify-between  mb-[12px]">
          <div className="flex items-center gap-12 ">
            <Link className="text-[32px] font-semibold">Stock Summary</Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-full flex items-center justify-center min-w-[40px] 2xl:min-w-[56px] min-h-[40px] 2xl:min-h-[56px] bg-light-gray">
              <img src={printer} alt="printer" className=" w-5 2xl:w-8" />
            </div>
            <div>
              <button className="rounded-full h-[40px] 2xl:h-[56px] flex items-center gap-2 justify-center py-4 px-8 bg-green">
                <img src={excel} alt="excel" />
                <div className="whitespace-nowrap 2xl:text-base text-sm text-white">
                  Export
                </div>
              </button>
            </div>
            <Button
              onClick={() => setOpen(tabIndex)}
              background={"bg-blue text-white"}
              text={"Add Stock Journal"}
            />
          </div>
        </div>
        <p className="text-lg tracking-wide">Manage and Monitor Stock Summaries</p>
        <ProductListTable tabIndex={tabIndex} />
      </div>
      <AddWarehouseModel open={open} setOpen={setOpen} />
    </div>
  );
};

export default StockSummary;