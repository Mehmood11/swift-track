import { useState } from "react";
import Chart from "react-apexcharts";

export function DonutChart() {
  const [chartOptions, setChartOptions] = useState<any>({
    series: [12, 11, 14, 18, 17, 13],

    // chart: {
    //   // height: 350,
    //   type: "line",
    //   zoom: {
    //     enabled: false,
    //   },
    //   dropShadow: {
    //     enabled: true,
    //     color: "#000",
    //     top: 18,
    //     left: 7,
    //     blur: 10,
    //     opacity: 0.2,
    //   },
    //   toolbar: {
    //     show: false,
    //   },
    // },
    // colors: ["#77B6EA", "#545454"],
    // // dataLabels: {
    // //   enabled: true,
    // // },
    // stroke: {
    //   curve: "smooth",
    // },
    // title: {
    //   text: "Average High & Low Temperature",
    //   align: "left",
    // },
    // // grid: {
    // //   borderColor: "#e7e7e7",
    // //   row: {
    // //     colors: ["#f3f3f3", "transparent"],
    // //     opacity: 0.5,
    // //   },
    // // },
    // grid: {
    //   row: {
    //     colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
    //     opacity: 0.5,
    //   },
    // },
    // markers: {
    //   size: 1,
    // },
    // xaxis: {
    //   categories: [
    //     "Jan",
    //     "Feb",
    //     "Mar",
    //     "Apr",
    //     "May",
    //     "Jun",
    //     "Jul",
    //     "Aug",
    //     "Sep",
    //     "Oct",
    //     "Nov",
    //     "Dec",
    //   ],
    //   // title: {
    //   //   text: "Month",
    //   // },
    // },
    // yaxis: {
    //   // title: {
    //   //   text: "Temperature",
    //   // },
    //   min: 5,
    //   max: 150,
    // },
    // legend: {
    //   position: "top",
    //   horizontalAlign: "right",
    //   floating: true,
    //   offsetY: -25,
    //   offsetX: -5,
    // },

    // options: {
    chart: {
      //   width: 380,
      type: "donut",
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
    },
    legend: {
      formatter: function (val: any, opts: any) {
        console.log(val);

        return val + " - " + opts.w.globals.series[opts.seriesIndex];
      },
    },
    // title: {
    //   text: "Total Orders ",
    // },
    responsive: [
      {
        breakpoint: 480,
        options: {
          //   chart: {
          //     width: 200,
          //   },
          legend: {
            position: "top",
            horizontalAlign: "right",
            floating: true,
            offsetY: -25,
            offsetX: -5,
          },
        },
      },
    ],
  });
  return (
    <Chart
      options={chartOptions}
      series={chartOptions.series}
      type="donut"
      height={350}
    />
  );
}
