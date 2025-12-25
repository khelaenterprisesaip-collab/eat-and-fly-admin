import { Card, CardContent, Typography, Box } from "@mui/material";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const formatCurrency = (amount: any) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const SalesChart = ({ stats }: any) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: "area",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      fontFamily: "Inter, sans-serif",
    },
    colors: ["#334735", "#5a8f5e"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [0, 100],
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: stats?.categories || [],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#5a6a5c",
          fontSize: "12px",
          fontWeight: 500,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#5a6a5c",
          fontSize: "12px",
          fontWeight: 500,
        },
        formatter: (value: number) =>
          `${formatCurrency((value / 1000).toFixed(0))}k`,
      },
    },
    grid: {
      borderColor: "#e8ebe8",
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
      markers: {
        size: 8,
        shape: "circle" as const,
      },
      itemMargin: {
        horizontal: 12,
      },
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: (value: number) => `${formatCurrency(value)}`,
      },
    },
  };

  return (
    <Card
      elevation={2}
      sx={{
        height: "100%",
        "&:hover": {
          boxShadow: "0px 12px 24px rgba(51, 71, 53, 0.20)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              Sales Overview
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Monthly revenue and profit trends
            </Typography>
          </Box>
        </Box>
        <Chart
          options={chartOptions}
          series={stats?.series || []}
          type="area"
          height={350}
        />
      </CardContent>
    </Card>
  );
};

export default SalesChart;
