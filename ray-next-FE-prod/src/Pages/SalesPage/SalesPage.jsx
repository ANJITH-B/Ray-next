import React from "react";
import SalesChart from "./SalesPageComponents/SalesChart";
import SectionCard from "../../CommonComponents/OtherComponent/SectionCard";
import './SalesPageComponents/salesStyles.scss'

const SalesPage = () => {


  return (
    <div >
      <div>
       <SalesChart/>

        <div className="p-8 flex gap-6 section-card overflow-auto">
        <SectionCard head={'Sales Invoice'} content={'Create new sales invoice and monitor the cash flow'}/>
        <SectionCard head={'Sales Invoice'} content={'Create new sales invoice and monitor the cash flow'}/>

        <SectionCard head={'Sales Invoice'} content={'Create new sales invoice and monitor the cash flow'}/>

        <SectionCard head={'Sales Invoice'} content={'Create new sales invoice and monitor the cash flow'}/>
        <SectionCard head={'Sales Invoice'} content={'Create new sales invoice and monitor the cash flow'}/>
        <SectionCard head={'Sales Invoice'} content={'Create new sales invoice and monitor the cash flow'}/>

        <SectionCard head={'Sales Invoice'} content={'Create new sales invoice and monitor the cash flow'}/>

        </div>
      </div>
    </div>
  );
};

export default SalesPage;
