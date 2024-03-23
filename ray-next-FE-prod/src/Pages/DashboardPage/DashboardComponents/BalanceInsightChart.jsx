import React from "react";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";

const BalanceInsightChart = () => {
  const chartData = {
    chart: {
      type: "line",
      id: "apexchart-example",

      menu: {
        enable: false,
      },
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },

    markers: {
      size: 2,
      colors: undefined,
      strokeColors: "#fff",
      strokeWidth: 2,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      shape: "circle",
      radius: 2,
      offsetX: 0,
      offsetY: 0,
      onClick: undefined,
      onDblClick: undefined,
      showNullDataPoints: true,
      hover: {
        size: undefined,
        sizeOffset: 3,
      },
    },

    xaxis: {
      labels: { show: false },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },

    yaxis: {
      show: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    grid: {
      show: false, // you can either change hear to disable all grids
    },
    toolbar: {
      show: false,
    },

    series: [
      {
        name: "Distance Traveled",
        type: "line",

        data: [
          1000, 2000, 3000, 571, 400, 2000, 201, 1743, 1500, 400, 257, 3000,
        ],
      },
      {
        name: "Time Traveled",
        type: "line",
        data: [
          2000, 3000, 2000, 1000, 2500, 1390, 1388, 3999, 1000, 1200, 2000, 200,
        ],
      },
    ],
  };

  return (
    <div className="bg-dark-color max:w-[500px]  h-full rounded-[40px] text-white">
      <div className="pt-8 px-8 flex w-full justify-between gap-2">
        <div>
          <h3 className=" text-sm 2xl:text-base font-light mb-4 2xl:mb-6">Balance Insight</h3>
          <p>
            <span className=" text-3xl 2xl:text-4xl font-semibold">57 </span>{" "}
            <span className="text-base">% increase</span>
          </p>
        </div>
        <div>
          <Link>link</Link>
        </div>
      </div>
      <ReactApexChart
        width={"100%"}
        height={"50%"}
        options={chartData}
        series={chartData.series}
      />
      <div className="p-8 flex items-center gap-12">
        <div className="flex items-center gap-4">
          <div className="w-4 h-4 bg-[#1F78B4] rounded-full"></div>
          <div>
            <p className="2xl:text-base text-sm">Cash Balance</p>
            <p className="2xl:text-base text-sm font-semibold">120 AED</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-4 h-4 bg-[#1F78B4] rounded-full"></div>
          <div>
            <p className="2xl:text-base text-sm">Bank Balance</p>
            <p className=" 2xl:text-base text-sm font-semibold">1204534 AED</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceInsightChart;
