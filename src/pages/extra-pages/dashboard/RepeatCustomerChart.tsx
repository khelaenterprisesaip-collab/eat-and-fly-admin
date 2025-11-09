import { useState, useEffect } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";

// third-party
import ReactApexChart, { Props as ChartProps } from "react-apexcharts";

// project-imports
import { ThemeMode } from "config";

// chart options
const areaChartOptions = {
  chart: {
    type: "area",
    toolbar: {
      show: false,
    },
  },
  animations: {
    enabled: false,
  },
  zoom: {
    enabled: false,
  },
  panning: {
    enabled: false,
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 1,
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      type: "vertical",
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: "45%",
      borderRadius: 4,
    },
  },
  grid: {
    strokeDashArray: 4,
  },
};

// ==============================|| CHART - REPEAT CUSTOMER CHART ||============================== //

const RepeatCustomerChart = ({
  studentStats,
}: {
  studentStats: { count: string; month: string }[];
}) => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState<ChartProps>(areaChartOptions);
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);
  const monthNames = [
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
  ];

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      xaxis: {
        categories: monthNames,
        labels: {
          style: {
            colors: Array(12).fill(secondary),
          },
        },
        axisBorder: {
          show: false,
          color: line,
        },
        axisTicks: {
          show: false,
        },
        tickAmount: 11,
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary],
          },
        },
      },
      grid: {
        borderColor: line,
      },
      theme: {
        mode: mode === ThemeMode.DARK ? "dark" : "light",
      },
    }));
  }, [mode, primary, secondary, line, theme]);

  // useEffect(() => {
  //   const data = new Array(12).fill(0);
  //   studentStats?.forEach((stat) => {
  //     const monthIndex = parseInt(stat.month, 10) - 1;
  //     data[monthIndex] = parseInt(stat.count, 10);
  //   });

  //   setSeries([{ name: "Number of  order", data }]);
  // }, [studentStats]);

  useEffect(() => {
    const data = [10, 15, 20, 18, 25, 30, 28, 22, 35, 40, 38, 50]; // Static data for 12 months

    setSeries([{ name: "Number of Orders", data }]);
  }, []);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={260}
    />
  );
};

export default RepeatCustomerChart;
