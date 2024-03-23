import React from "react";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";

const AvailableBalanceChart = () => {
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
      width:1
    },
    grid: {
      show: false,
    },

    labels: [10, 20, 30, 40, 50, 300],

    xaxis: {
      type: "datetime",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
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
    
    fill: {
       
      type: "gradient",
      gradient: {
        type: "vertical",
      
        shade: 'dark',
        shadeIntensity: 0,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: .5,
        colorStops: [
            {
                offset: -10,
                color: "#F69FEB",
                opacity: 1
              },
              {
                offset:100,
                color: "#F4D64C80",
                opacity: 1
              },
        ]
      },
    },
  };
  return (
    <div className="bg-dark-color relative max-h-[340px] 2xl:max-h-[398px] rounded-[40px] overflow-hidden text-white">
      <div className=" p-6 2xl:p-8 flex w-full justify-between gap-2">
        <div>
          <h3 className=" text-sm 2xl:text-base font-light mb-6">Available Balance</h3>
          <p>
            <span className=" text-3xl 2xl:text-5xl font-semibold">$ 59989879 </span>{" "}
          </p>
        </div>
        <div className="flex  gap-2">
          <Link>link</Link>
          <Link>link</Link>
        </div>
      </div>
      <div className="translate-x-5 translate-y-8 2xl:translate-y-14 w-full">
      <ReactApexChart
        options={options}
        series={[
          {
            name: "STOCK ABC",
            type:'line',
            data: [20, 30, 40, 50, 60, 110],
          },
          {
            name: "STOCK ABC",
            type:'area',

            data: [10, 20, 30, 40, 50, 100],
          },
        ]}
        height={250}
        width={"100%"}
      />
      </div>
     
    </div>
  );
};

export default AvailableBalanceChart;
