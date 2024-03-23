import React from 'react'
import ChartDateSelect from '../../../CommonComponents/FormInputs/ChartDateSelect';
import ReactApexChart from 'react-apexcharts';
import cart from "../../../Assets/CommonImages/shoppingcart.svg";
import './purchaseStyles.scss'
const PurchaseChart = () => {
  const options = {
    chart: {
      // height: 550,
      type: "bar",
      toolbar: {
        show: false,
      },
    
    },
    colors:['#12121233'],
    plotOptions: {
      bar: {
        borderRadius: 15,
        columnWidth:'80%',
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
     
    },
    states: {
      hover: {
       filter: {
          type: ''
        }
      }
    },
    dataLabels: {
      enabled: false,
     
    },
    grid: {
      show: false,
    },

    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      position: "bottom",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        show:false,
      },
     
    },
    yaxis: {
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
    title: {
      text: undefined,
     
    },
    tooltip: {
      style: {
        fontSize: '12px',
        fontFamily: undefined,
        borderRadius:'30px'
      },
      custom: function({series, seriesIndex, dataPointIndex, w}) {
        var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        return `<div class='bar-tooltip'>
           <p>${series[seriesIndex][dataPointIndex]}<p/>
           <p>Invoices issued<p/>

        </div>`;
      }
    }
  };
  return (
    <div className='bar-chart h-[90%]'>
           <div className="bg-[#E3DBFA] h-full">
          <div className='p-12 w-full flex justify-between'>
            <div>
              <img className='mb-6' src={cart} alt="chart" />
              <h1 className='text-5xl font-semibold mb-3'>Purchase</h1>
              <p>298 purchases in last week</p>
            </div>
            <div>
              <ChartDateSelect />
            </div>
          </div>

          <div>
            <ReactApexChart
              options={options}
              
              series={[
                {
                  name: "Inflation",
                  data: [
                    2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2,
                  ],
                },
              ]}
              type="bar"
              height={380}
            />
          </div>
        </div>
    </div>
  )
}

export default PurchaseChart