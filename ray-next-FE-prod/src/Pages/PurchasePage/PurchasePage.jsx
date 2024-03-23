import React from "react";
import PurchaseChart from "./PurchasePageComponent/PurchaseChart";
import SectionCard from "../../CommonComponents/OtherComponent/SectionCard";

const PurchasePage = () => {
  return (
    <div>
      <div>
        <PurchaseChart />

        <div className="p-8 flex gap-6 section-card overflow-auto">
          <SectionCard
            color={"#E3DBFA"}
            head={"Sales Invoice"}
            content={"Create new sales invoice and monitor the cash flow"}
          />
          <SectionCard
            color={"#E3DBFA"}
            head={"Sales Invoice"}
            content={"Create new sales invoice and monitor the cash flow"}
          />

          <SectionCard
            color={"#E3DBFA"}
            head={"Sales Invoice"}
            content={"Create new sales invoice and monitor the cash flow"}
          />

          <SectionCard
            color={"#E3DBFA"}
            head={"Sales Invoice"}
            content={"Create new sales invoice and monitor the cash flow"}
          />
          <SectionCard
            color={"#E3DBFA"}
            head={"Sales Invoice"}
            content={"Create new sales invoice and monitor the cash flow"}
          />
          <SectionCard
            color={"#E3DBFA"}
            head={"Sales Invoice"}
            content={"Create new sales invoice and monitor the cash flow"}
          />

          <SectionCard
            color={"#E3DBFA"}
            head={"Sales Invoice"}
            content={"Create new sales invoice and monitor the cash flow"}
          />
        </div>
      </div>
    </div>
  );
};

export default PurchasePage;
