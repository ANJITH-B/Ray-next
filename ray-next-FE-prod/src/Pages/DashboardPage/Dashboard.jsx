import React, { useState } from "react";
import DateSelect from "./DashboardComponents/DateSelect";
import BalanceCard from "./DashboardComponents/BalanceCard";
import bank from "../../Assets/DashboardIcons/bank.svg";
import cal from "../../Assets/DashboardIcons/calendar.svg";
import money from "../../Assets/DashboardIcons/moneys.svg";
import shoping from "../../Assets/DashboardIcons/shoppingbag.svg";
import docs from "../../Assets/DashboardIcons/tabledocument.svg";
import sales from "../../Assets/DashboardIcons/chart2.svg";
import purchase from "../../Assets/DashboardIcons/shoppingcart.svg";
import payment from "../../Assets/DashboardIcons/money.svg";
import reciept from "../../Assets/DashboardIcons/documenttext.svg";
import account from "../../Assets/DashboardIcons/usersquare.svg";
import report from "../../Assets/DashboardIcons/documentcopy.svg";
import MenuCard from "./DashboardComponents/MenuCard";
import BalanceInsightChart from "./DashboardComponents/BalanceInsightChart";
import PendingChequeChart from "./DashboardComponents/PendingChequeChart";
import OverdueChart from "./DashboardComponents/OverdueChart";
import AvailableBalanceChart from "./DashboardComponents/AvailableBalanceChart";
import JournalEntry from "../AccountPage/AccountPageComponents/JournalEntry";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full  p-6 mb-6 max-w-[1512px] overflow-hidden h-full  m-auto">
      <div className="flex overflow-hidden   relative gap-6 2xl:gap-8">
        <div className=" fixed max-w-[320px] 2xl:max-w-[394px]">
          <div className="mb-6 w-400px">
            {/* <DateSelect /> */}
          </div>
          <div className=" grid grid-cols-2 max-w-[320px] 2xl:max-w-[394px]  gap-3">
            <BalanceCard
              color={"bg-cash-balance-color"}
              head={"Cash Balance"}
              currency={"AED"}
              count={2100}
              image={shoping}
            />
            <BalanceCard
              color={"bg-bank-balance-color"}
              head={"Bank Balance"}
              currency={"AED"}
              count={32000}
              image={bank}
            />

            <BalanceCard
              color={"bg-cheque-color"}
              head={"Pending Cheques"}
              count={10}
              image={docs}
            />

            <BalanceCard
              color={"bg-overdue-color"}
              head={"Overdues"}
              count={18}
              image={cal}
            />
            <div className="col-span-2">
              {" "}
              <BalanceCard
                color={"bg-balance-color"}
                head={"Available Balance"}
                count={32000}
                image={shoping}
                width="w-full"
                currencyLeft="$"
              />
            </div>
          </div>
        </div>
        <div className="min-w-[70%] ml-[21rem] 2xl:ml-[28%]">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-dark-color">Services</h1>
          </div>
          <div className="w-full grid grid-cols-3 gap-4 mb-4">
            <MenuCard
              color={"bg-sales-color"}
              head={"Sales"}
              image={sales}
              subHead={"increase in total sales"}
              value={"2.5%"}
              links={[
                {
                  path: "#",
                  path: "/sales/invoice",
                  content: "Invoice",
                },
                {
                  path: "#",
                  content: "Return",
                  path: "/sales/return",
                },
                {
                  path: "#",
                  content: "Quotations",
                  path: "/sales/quotation",
                },
                {
                  path: "#",
                  content: "Customer",
                  path: "/sales/customer",
                },
                {
                  path: "#",
                  content: "Sales order",
                  path: "/sales/sales-order",
                },
                {
                  path: "#",
                  content: "History",
                  path: "/sales/history",
                },
              ]}
            />
            <MenuCard
              color={"bg-purchase-color"}
              head={"Purchase"}
              image={purchase}
              subHead={"purchases in last week"}
              value={"298"}
              links={[
                {
                  path: "#",
                  content: "Bill",
                  path: "/purchase/bill",
                },
                {
                  path: "#",
                  content: "Return",
                  path: "/purchase/return",
                },
                {
                  path: "#",
                  content: "LPO",
                  path: "/purchase/LPO",
                },
                {
                  path: "#",
                  content: "Supplier",
                  path: "/purchase/supplier",
                },
                {
                  path: "#",
                  content: "Cost allocation",
                },
                {
                  path: "#",
                  content: "History",
                  path: "/purchase/history",
                },
              ]}
            />
            <MenuCard
              color={"bg-payment-color"}
              head={"Payment"}
              image={payment}
              subHead={"transations this month"}
              value={"1455"}
              links={[
                {
                  path: "#",
                  content: "To expenses",
                },
                {
                  path: "#",
                  content: "To payable",
                },
                {
                  path: "#",
                  content: "To bank/cash",
                },
                {
                  path: "#",
                  content: "To owner",
                },
                {
                  path: "#",
                  content: "To staff",
                },
                {
                  path: "#",
                  content: "History",
                },
              ]}
            />
            <MenuCard
              color={"bg-reciept-color"}
              head={"Reciept"}
              image={reciept}
              subHead={"reciept generated"}
              value={"133"}
              links={[
                {
                  path: "#",
                  content: "From customer",
                },
                {
                  path: "#",
                  content: "Cash & bank",
                },
                {
                  path: "#",
                  content: "From owner",
                },
                {
                  path: "#",
                  content: "From loan",
                },
                {
                  path: "#",
                  content: "History",
                },
              ]}
            />
            <MenuCard
              color={"bg-account-color"}
              head={"Account"}
              image={account}
              subHead={"accounts in total"}
              value={"566"}
              links={[
                {
                  path: "#",
                  content: "Journal",
                  isButton: true,
                  onClick: () => setOpen(true),
                },
                {
                  path: "#",
                  content: "Costing",
                },
                {
                  path: "/account/customer",
                  content: "Customer",
                },
                {
                  path: "/account/chart-of-account",
                  content: "Chart of accounts",
                },
                {
                  path: "#",
                  content: "Bank notes",
                },
                {
                  path: "#",
                  content: "Reconciliation",
                },
                {
                  path: "/account/account-book",
                  content: "Account books",
                },
              ]}
            />
            <MenuCard
              color={"bg-report-color"}
              head={"Reports"}
              image={report}
              subHead={"reports pending"}
              value={"56"}
              links={[
                {
                  path: "#",
                  content: "Register",
                },
                {
                  path: "#",
                  content: "Financial reports",
                },
                {
                  path: "#",
                  content: "Analytical reports",
                },
                {
                  path: "#",
                  content: "Daily reports",
                },
                {
                  path: "#",
                  content: "MIS",
                },
              ]}
            />
          </div>
          <div className="mt-10 mb-4">
            <h1 className="text-xl font-semibold text-dark-color">
              Graphical Insights
            </h1>
          </div>
          <div className="w-full flex mb-4  gap-4">
            <div className="flex-1">
              <BalanceInsightChart />
            </div>

            <div className=" grid flex-1  gap-4 grid-rows-2 jj">
              <PendingChequeChart />
              <OverdueChart />
            </div>
          </div>
          <div>
            <AvailableBalanceChart />
          </div>
        </div>
      </div>
      <JournalEntry open={open} setOpen={setOpen} />
    </div>
  );
};

export default Dashboard;
