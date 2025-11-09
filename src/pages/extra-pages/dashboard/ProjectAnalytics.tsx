import { useEffect, useState, SyntheticEvent } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ReactApexChart, { Props as ChartProps } from "react-apexcharts";
import MainCard from "components/MainCard";
import { ThemeMode } from "config";
import { Divider, FormLabel } from "@mui/material";

// ==============================|| CHART ||============================== //

function EcommerceDataChart({ data }: { data: any[] }) {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const areaChartOptions: any = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    colors: [
      "#334735",
      "#4366EF",
      "#5575F0",
      "#6984F2",
      "#7B95F4",
      "#8EA3F5",
      "#A1B2F7",
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "82%",
        borderRadius: 1,
        borderRadiusApplication: "end",
        distributed: false,
        barHeight: "75%",
      },
    },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "start",
      offsetY: 8,
      markers: {
        shape: "circle",
        width: 8,
        height: 8,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 8,
      },
      fontSize: "11px",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 3,
      colors: ["transparent"],
    },
    grid: {
      strokeDashArray: 0,
    },
    tooltip: {
      y: {
        // formatter: (val: number) => val,
      },
    },
    xaxis: {
      categories: [
        "Winter (January-March)",
        "Summer (April-July)",
        "Fall (August-December)",
      ],
      labels: {
        style: {
          colors: [
            theme.palette.text.secondary,
            theme.palette.text.secondary,
            theme.palette.text.secondary,
          ],
        },
      },
      axisBorder: {
        show: false,
        color: theme.palette.divider,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: [theme.palette.text.secondary],
        },
      },
    },
    theme: {
      mode: mode === ThemeMode.DARK ? "dark" : "light",
    },
  };

  const [series, setSeries] = useState(
    data.map((item) => ({
      // name: item.name, // Status name (New, Submitted, etc.)
      data: item.data, // Data array for the status
    }))
  );

  useEffect(() => {
    setSeries(
      data.map((item) => ({
        // name: item.name,
        data: item.data,
      }))
    );
  }, [data]);

  return (
    <ReactApexChart
      options={areaChartOptions}
      series={series}
      type="bar"
      height={325}
    />
  );
}

// ==============================|| CHART WIDGET - PROJECT ANALYTICS ||============================== //

export default function ProjectAnalytics({
  applicationStats,
  totalCommisionSum,
  transition,
  selectedYear,
  setSelectedYear,
}: any) {
  const [value, setValue] = useState(0);
  const theme = useTheme();

  const chartData = [
    { name: "Pre-Payment", stage_id: 1, data: [12, 12, 12] },
    { name: "Pre-Submission", stage_id: 2, data: [30, 30, 30] },
    { name: "Post Submission", stage_id: 3, data: [50, 50, 45] },
    { name: "Visa", stage_id: 4, data: [0, 0, 0] },
    { name: "Enrolment/Commission", stage_id: 5, data: [0, 0, 0] },
    // { name: 'Tuition Paid', stage_id: 6, data: [0, 0, 0] },
    // { name: 'Visa', stage_id: 7, data: [0, 0, 0] }
  ];

  const periodIndices: any = {
    "Jan-March": 0,
    "April-July": 1,
    "Aug-Dec": 2,
  };

  applicationStats?.forEach((item: any) => {
    const stageIndex = chartData.findIndex(
      (chart) => chart.stage_id === item.stage_id
    );
    if (stageIndex !== -1) {
      const periodIndex = periodIndices[item.period];
      if (periodIndex !== undefined) {
        chartData[stageIndex].data[periodIndex] = parseInt(item.total_count);
      }
    }
  });

  const [data, setData] = useState(chartData);

  useEffect(() => {
    setData(chartData);
  }, [applicationStats]);

  const selectStyle = {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#C8D7F7",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#C8D7F7",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#C8D7F7",
    },
    "& .MuiSelect-icon": {
      color: "#7C7C7C",
      fontSize: "24px",
    },
  };
  const handleYearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedYear(event.target.value as number);
  };

  const years = Array.from({ length: 21 }, (_, index) => 2024 + index);

  return (
    <Stack direction={"row"} width={"100%"} gap={3} alignItems={"start"}>
      <MainCard
        content={false}
        sx={{
          width: "100%",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          pb: 4,
        }}
      >
        <Box>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}></Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack sx={{ px: 3, py: 2 }}>
                  <Typography variant="h5" color={"#535E6F"}>
                    Summary
                  </Typography>
                </Stack>
                <Divider
                  style={{
                    border: "0.4px solid #C8D7F7",
                  }}
                />
                <Stack spacing={2} sx={{ px: 3, py: 2 }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={1}
                  >
                    <Stack>
                      <Typography variant="h5" color={"#535E6F"}>
                        Customer
                      </Typography>
                      <Typography variant="caption" color={"#7A839D"}>
                        Number of Customer over time
                      </Typography>
                    </Stack>
                    <Box sx={{ minWidth: 430, display: "flex", gap: 4 }}>
                      <Stack
                        justifyContent={"end"}
                        direction={"row"}
                        width={"100%"}
                      >
                        <Stack
                          bgcolor={"white"}
                          py={1}
                          direction={"row"}
                          borderRadius={1}
                          width={"50%"}
                          justifyContent={"end"}
                          mb={2}
                        >
                          <FormControl fullWidth size="small">
                            <FormLabel sx={{ fontSize: 13, mb: 0.8 }}>
                              Year Filter
                            </FormLabel>
                            <Select
                              sx={{ ...selectStyle, color: "#7C7C7C" }}
                              value={selectedYear}
                              onChange={(value: any) => {
                                handleYearChange(value);
                              }}
                              MenuProps={{
                                PaperProps: {
                                  style: {
                                    maxHeight: 300,
                                    overflowY: "auto",
                                  },
                                },
                              }}
                            >
                              {years.map((year) => (
                                <MenuItem key={year} value={year}>
                                  {year}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Stack>
                      </Stack>
                      {/* <FormControl fullWidth>
                        <Select id="demo-simple-select" value={'staff'} size="small" sx={{ ...selectStyle, color: '#7C7C7C' }}>
                          <MenuItem value={'staff'}>Staff</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl fullWidth>
                        <Select sx={{ ...selectStyle, color: '#7C7C7C' }} id="demo-simple-select" value={2024} size="small">
                          <MenuItem value={2024}>2024</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl fullWidth>
                        <Select sx={{ ...selectStyle, color: '#7C7C7C' }} id="demo-simple-select" value={'Countries'} size="small">
                          <MenuItem value={'Countries'}>All Countries</MenuItem>
                        </Select>
                      </FormControl> */}
                    </Box>
                  </Stack>

                  <EcommerceDataChart data={data} />
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </MainCard>
    </Stack>
  );
}
