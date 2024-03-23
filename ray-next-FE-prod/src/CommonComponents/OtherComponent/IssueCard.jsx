import React from "react";
import logo from "../../Assets/CommonImages/unicorn.svg";
const IssueCard = () => {
  const data = JSON.parse(localStorage.getItem('USER_ID'))

  return (
    <div className=" min-w-[320px] 2xl:w-[373px] min-h-[180px] flex  2xl:min-h-[180px] rounded-[30px] border-[1px] border-border-gray">
      <div className="px-6 py-4 flex flex-col justify-between gap-4 ">
        <h2 className=" text-sm 2xl:text-base ">Issued by</h2>
        <div className="flex gap-3">
          <div className="w-12 h-12">
            <img src={logo} alt="logo" className="w-12 h-12"/>
          </div>
          <div>
            <h4 className="text-dark-color 2xl:text-base text-sm font-semibold">{data!==null&&data?.company?data.company:'Example Company'}</h4>
            <p className="text-gray text-xs 2xl:text-sm">{data!==null&&data?.email?data.email:'example@gmail.com'} </p>
          </div>
        </div>
        <div>
          <p className="text-xs 2xl:text-sm max-w-[70%]">{data!==null&&data?.state?data.state:'India'} {data!==null&&data.region?data.region:'Banglore'}</p>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
