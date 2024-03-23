import React from "react";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";

const OverdueChart = () => {
  const options = {
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
      },
    },
    chart: {
      type: "area",
      parentHeightOffset: -4,
      parentWidthOffset: -4,

      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      colors: ["#ffffff"],
    },
    grid: {
      show: false, 
    },

    labels: [10, 20, 30, 40, 50, 300],

    xaxis: {
      type: "datetime",

      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
      opposite: true,
    },
    legend: {
      horizontalAlign: "left",
    },
    colors: ["#00000033"],
    fill: {
      type: "solid",
    },
    tooltip: {
      fixed: {
        enabled: true,
      },
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {

        return `<div>dfsdf</div>`;
      },
    },
  };

  return (
    <div className="bg-dark-green rounded-[40px] max-w-[500px] max-h-[200px] 2xl:max-h-[239px] relative overflow-hidden ">
      <div className=" p-6 2xl:p-8 flex w-full justify-between">
        <div>
          <h1 className="text-base text-white mb-3 ">Overdue</h1>
          <div className="text-white flex items-baseline gap-2">
            <p className="text-4xl font-semibold ">57%</p>
            <p>Increase</p>
          </div>
        </div>

        <Link>link</Link>
      </div>
      <div className="absolute -bottom-10 -right-4  w-full">
        <ReactApexChart
          options={options}
          series={[
            {
              name: "STOCK ABC",
              data: [10, 20, 30, 40, 50, 100],
            },
          ]}
          type="area"
          height={250}
          width={"100%"}
        />
      </div>
    </div>
  );
};

export default OverdueChart;
