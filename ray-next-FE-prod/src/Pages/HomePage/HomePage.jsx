import React from "react";
import dollor from '../../Assets/CommonImages/dollar-circle.svg'
import chart from '../../Assets/CommonImages/graph.png'
import userGroup from '../../Assets/CommonImages/profile-2user.svg'
import hero from '../../Assets/CommonImages/homepage_hero.svg'
import { Link } from "react-router-dom";


const HomePage = () => {
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

            <Link to='/home' className="w-[220px] h-[64px] flex items-center justify-center rounded-full bg-blue text-sm font-semibold text-white">Take me to home</Link>

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

          <div className="w-1/2">
            <img src={hero} alt="hero" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
