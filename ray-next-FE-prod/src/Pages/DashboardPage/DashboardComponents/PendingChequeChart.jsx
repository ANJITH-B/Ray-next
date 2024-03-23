import React from "react";
import ReactApexChart from "react-apexcharts";

const PendingChequeChart = () => {
  const options = {
    chart: {
      height: 350,
      type: "radialBar",
    },

    plotOptions: {
      radialBar: {
        hollow: {
          size: "55%",
        },
        dataLabels:
 {
          show: true,
          name:{
            show:false
          },
          value:{
            color:'#ffffff',
            fontSize:'25',
            fontWeight:900,
            offsetY:6
          }
        },

        track: {
          show: true,
          startAngle: undefined,
          endAngle: false,
          background: "#00000033",
          strokeWidth: "100%",
          opacity: 0.5,
          margin: 5,
          borderRadius: 30,

          dropShadow: {
            enabled: false,
            top: 0,
            left: 0,
            blur: 3,
            opacity: 0.5,
          },
        },
      },
    },

    fill: {
      opacity: 1.5,
      colors: ["#ffffff"],
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Cricket"],
  };

  return (
    <div className="max-w-[500px] max-h-[200px] 2xl:max-h-[239px] bg-dark-blue rounded-[40px] p-6 2xl:p-8 flex  justify-between">
      <div className="flex flex-col  justify-between w-full">
        <h1 className=" text-sm 2xl:text-base text-white ">Pending Cheque</h1>
        <div className="pl-2 flex flex-col gap-2 2xl:gap-4">
          <div className="flex text-white items-baseline gap-2">
            <p className=" text-5xl 2xl:text-6xl font-semibold ">432 </p>
            <span>/</span>
            <p>567</p>
          </div>
          <div>
            <p className="text-white text-xs 2xl:text-sm font-light">
              <span>23% </span> increase compare to last week
            </p>
          </div>
        </div>
      </div>
      <div className="h-full flex items-center">
        <ReactApexChart
          options={options}
          series={[70]}
          type="radialBar"
          height={200}
        />
      </div>
    </div>
  );
};

export default PendingChequeChart;
