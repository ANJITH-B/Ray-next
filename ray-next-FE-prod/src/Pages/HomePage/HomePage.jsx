import React, { useState } from "react";
import dollor from '../../Assets/CommonImages/dollar-circle.svg'
import chart from '../../Assets/CommonImages/graph.png'
import userGroup from '../../Assets/CommonImages/profile-2user.svg'
import hero from '../../Assets/CommonImages/homepage_hero.svg'
import { Link } from "react-router-dom";
import { DatePicker, Modal } from "antd";
import ModalLayout from "../../CommonComponents/OtherComponent/ModalLayout";

const HomePage = () => {
  const isDate = JSON.parse(localStorage.getItem('accstartdate')) ?? false
  const [open, setOpen] = useState()
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSaveChanges = () => {
    if (selectedDate) {
      localStorage.setItem("accstartdate", JSON.stringify(selectedDate));
      setOpen(false)
    } 
  };
  return (
    <div className="w-full h-full bg-home-two bg-no-repeat">
      <div className="bg-home-one bg-no-repeat w-full h-full bg-right-bottom	 ">
        <div className="py-6 px-24 flex justify-between items-center h-full gap-2">
          <div className="w-1/2 flex flex-col gap-12 ">
            <h1 className="text-6xl font-semibold max-w-[500px] leading-snug">Preparing your RayNext Experience</h1>
            <p className="max-w-[600px] text-lg text-gray-700 leading-7">
              We are excited to have you onboard with RayNext. During this
              activation period we are fine tuning your account to provide you
              with seamless financial management solution. Your wait will soon
              be rewarded with enhanced efficiency and insights.
            </p>

            {isDate ? <Link to='/home' className="w-[220px] h-[64px] flex items-center justify-center rounded-full bg-blue text-sm font-semibold text-white">Take me to home</Link> :
            <button onClick={()=>setOpen(true)} className="w-[220px] h-[64px] flex items-center justify-center rounded-full bg-blue text-sm font-semibold text-white">Take me to home</button>}
            <div className="flex items-center gap-6">
              <div className="flex flex-col gap-2 border-r-[1px] border-gray-700 pr-6 max-w-[10rem]">
                <img className="w-[24px] h-[24px]" src={dollor} alt="dollor" />
                <h2 className="text-2xl font-semibold">12M+</h2>
                <p className="text-base text-gray-800">Transactions</p>
              </div>
              <div className="flex flex-col gap-2 border-r-[1px] border-gray-700 pr-6 max-w-[10rem]">
                <img className="w-[24px] h-[24px]" src={chart} alt="dollor" />
                <h2 className="text-2xl font-semibold">12M+</h2>
                <p className="text-base text-gray-800">Transactions</p>
              </div>
              <div className="flex flex-col gap-2 max-w-[10rem]">
                <img className="w-[24px] h-[24px]" src={userGroup} alt="dollor" />
                <h2 className="text-2xl font-semibold">12M+</h2>
                <p className="text-base text-gray-800">Transactions</p>
              </div>
            </div>
          </div>
            <ModalLayout title={'Account Books'} open={open} setOpen={setOpen}>
            <p className="text-gray text-gray-500">Set Account Books start date to record Transactions</p><br></br>
              <DatePicker onChange={handleDateChange}/>
            <p className="text-gray text-gray-100">( note: the date selected cannot be modified later )</p><br></br>
            <button
               className=" px-4 2xl:px-6 py-2 2xl:py-3 text-sm 2xl:text-base rounded-full border hover:bg-light-gray transition-all  bg-blue text-white"
               type="button"
               onClick={handleSaveChanges}
            >
               Save changes
            </button>
            </ModalLayout>

          <div className="w-1/2">
            <img src={hero} alt="hero" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
