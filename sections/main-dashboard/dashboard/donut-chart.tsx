import { useState } from "react";
import Chart from "react-apexcharts";

export function DonutChart() {
  const [chartOptions, setChartOptions] = useState<any>({
    series: [12, 11, 14, 18, 17, 13],

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
