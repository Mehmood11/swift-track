import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export function LineChart({ data, type }: any): JSX.Element {
  const theme = useTheme();
  const [chartState, setChartState] = useState<any>({
    series: [
      {
        name: "monthly",
        data: [12, 21, 6, 4, 12, 54, 5, 10],
      },
    ],
    chart: {
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
    stroke: {
      curve: "smooth",
    },
    grid: {
      row: {
        colors: ["transparent", "transparent"],
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    yaxis: {
      min: 5,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  });
  useEffect(() => {
    // Update the series data with the loaded chartData
    if (data) {
      const newSeries = [
        {
          name: type,
          data: data.map((val: any) =>
            parseInt(val?.y.toString().split(".")[0])
          ),
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
              fontSize: "13px",
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
