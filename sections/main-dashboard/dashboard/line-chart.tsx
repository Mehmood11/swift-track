import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export function LineChart({ data, type }: any): JSX.Element {
  const theme = useTheme();
  const [chartState, setChartState] = useState<any>({
    series: [
      {
        name: "monthly",
        data: [],
      },
    ],
    chart: {
      // height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    // colors: [theme.palette.primary.main],
    // dataLabels: {
    //   enabled: true,
    // },
    stroke: {
      curve: "smooth",
    },
    // title: {
    //   text: "Sales overview",
    //   align: "left",
    // },
    // grid: {
    //   borderColor: "#e7e7e7",
    //   row: {
    //     colors: ["#f3f3f3", "transparent"],
    //     opacity: 0.5,
    //   },
    // },
    grid: {
      row: {
        colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
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
      // title: {
      //   text: "Month",
      // },
    },
    yaxis: {
      // title: {
      //   text: "Temperature",
      // },
      min: 5,
      // max: 150,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  });
  // const chartOptions = ;
  useEffect(() => {
    // Update the series data with the loaded chartData
    if (data) {
      const newSeries = [
        {
          name: type,
          data: data.map((val: any) => val?.y?.toFixed(2)),
        },
      ];
      const xAxis = data.map((val: any) => val?.x);
      setChartState((prevChartState: any) => ({
        ...prevChartState,
        series: newSeries,
        colors: [theme.palette.primary.main],
        xaxis: {
          categories: xAxis,
          labels: {
            style: {
              colors: theme.palette.text.primary,
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: [theme.palette.text.primary],
            },
          },
        },
        tooltip: {
          fillSeriesColor: true,
          labels: {
            style: {
              colors: [theme.palette.text.primary],
            },
          },
        },
      }));
    }
  }, [data, type, theme]);
  return (
    <Chart
      options={chartState}
      series={chartState.series}
      type="line"
      height={350}
    />
  );
}
