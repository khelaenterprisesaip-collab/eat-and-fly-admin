"use client";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Switch,
  Chip,
  Tabs,
  Tab,
} from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useState } from "react";

const revenueData = [
  { month: "January", year2020: 4200000, year2021: 4500000, year2022: 4800000 },
  {
    month: "February",
    year2020: 3800000,
    year2021: 4100000,
    year2022: 4400000,
  },
  { month: "March", year2020: 4600000, year2021: 4900000, year2022: 5200000 },
  { month: "April", year2020: 4400000, year2021: 4700000, year2022: 5000000 },
  { month: "May", year2020: 4800000, year2021: 5100000, year2022: 5400000 },
  { month: "June", year2020: 4200000, year2021: 4500000, year2022: 4800000 },
  { month: "July", year2020: 4000000, year2021: 4300000, year2022: 4600000 },
  { month: "August", year2020: 4300000, year2021: 4600000, year2022: 4900000 },
  {
    month: "September",
    year2020: 4100000,
    year2021: 4400000,
    year2022: 4700000,
  },
  { month: "October", year2020: 4500000, year2021: 4800000, year2022: 5100000 },
  {
    month: "November",
    year2020: 4700000,
    year2021: 5000000,
    year2022: 5300000,
  },
  {
    month: "December",
    year2020: 5000000,
    year2021: 5300000,
    year2022: 5600000,
  },
];

const averageRevenueData = [
  { month: "January", year2020: 650, year2021: 700, year2022: 750 },
  { month: "February", year2020: 680, year2021: 730, year2022: 780 },
  { month: "March", year2020: 720, year2021: 770, year2022: 820 },
  { month: "April", year2020: 700, year2021: 750, year2022: 800 },
  { month: "May", year2020: 740, year2021: 790, year2022: 840 },
  { month: "June", year2020: 710, year2021: 760, year2022: 810 },
  { month: "July", year2020: 690, year2021: 740, year2022: 790 },
  { month: "August", year2020: 720, year2021: 770, year2022: 820 },
  { month: "September", year2020: 700, year2021: 750, year2022: 800 },
  { month: "October", year2020: 730, year2021: 780, year2022: 830 },
  { month: "November", year2020: 750, year2021: 800, year2022: 850 },
  { month: "December", year2020: 780, year2021: 830, year2022: 880 },
];

const RevenueCard = ({
  title,
  period,
  revenue,
  avgPerDay,
  avgPerOrder,
  isCurrentPeriod = false,
}: {
  title: string;
  period: string;
  revenue: string;
  avgPerDay: string;
  avgPerOrder: string;
  isCurrentPeriod?: boolean;
}) => (
  <Card
    className={`transition-all duration-300 hover:shadow-lg ${isCurrentPeriod ? "ring-2 ring-blue-500" : ""}`}
    elevation={2}
    sx={{
      background: isCurrentPeriod
        ? "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)"
        : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
      border: "1px solid #e2e8f0",
    }}
  >
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <Typography
            variant="body2"
            className="text-slate-600 font-medium mb-1"
          >
            {title}
          </Typography>
          <Typography variant="h5" className="font-bold text-blue-700">
            {period}
          </Typography>
        </div>
        {isCurrentPeriod && (
          <Chip
            label="Current"
            size="small"
            className="bg-blue-100 text-blue-700"
          />
        )}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Typography
            variant="caption"
            className="text-slate-500 uppercase tracking-wide"
          >
            YTD Revenue
          </Typography>
          <Typography variant="h6" className="font-semibold text-slate-800">
            {revenue}
          </Typography>
        </div>
        <div>
          <Typography
            variant="caption"
            className="text-slate-500 uppercase tracking-wide"
          >
            Avg Rev per Day
          </Typography>
          <Typography variant="h6" className="font-semibold text-slate-800">
            {avgPerDay}
          </Typography>
        </div>
        <div>
          <Typography
            variant="caption"
            className="text-slate-500 uppercase tracking-wide"
          >
            Avg Rev per Order
          </Typography>
          <Typography variant="h6" className="font-semibold text-slate-800">
            {avgPerOrder}
          </Typography>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ComparisonCard = ({
  title,
  value,
  change,
  isPositive,
}: {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}) => (
  <Card
    className="transition-all duration-300 hover:shadow-lg"
    elevation={1}
    sx={{
      background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
      border: "1px solid #e2e8f0",
    }}
  >
    <CardContent className="p-4">
      <Typography
        variant="caption"
        className="text-slate-500 uppercase tracking-wide mb-2 block"
      >
        {title}
      </Typography>
      <div className="flex items-center justify-between">
        <Typography variant="h6" className="font-semibold text-slate-800">
          {value}
        </Typography>
        <Chip
          label={change}
          size="small"
          className={`font-medium ${isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        />
      </div>
    </CardContent>
  </Card>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-slate-200">
        <p className="font-semibold text-slate-800 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}:{" "}
            {entry.name.includes("Average")
              ? `$${entry.value}`
              : `$${(entry.value / 1000000).toFixed(1)}M`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function RevenueDashboard() {
  const [viewMode, setViewMode] = useState("graph");
  const [siteName, setSiteName] = useState("All");
  const [revenueType, setRevenueType] = useState("Drayage");
  const [chargeStatus, setChargeStatus] = useState("Billable");
  const [businessRule, setBusinessRule] = useState("Revenue Legs Delivered");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-2">
          Revenue Summary
        </h2>
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} lg={9}>
            {/* Revenue Summary Cards */}
            <div className="mb-8">
              <Grid container spacing={3} className="mb-4">
                <Grid item xs={12} md={6}>
                  <RevenueCard
                    title="Current Year"
                    period="2022"
                    revenue="$24,987,482"
                    avgPerDay="$155.2K"
                    avgPerOrder="$818"
                    isCurrentPeriod={true}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RevenueCard
                    title="Current Month"
                    period="June"
                    revenue="$3,021,942"
                    avgPerDay="$143.9K"
                    avgPerOrder="$747"
                  />
                </Grid>
              </Grid>

              {/* Comparison Cards */}
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <ComparisonCard
                    title="Prior Year YTD"
                    value="$23,283,808"
                    change="7%"
                    isPositive={true}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <ComparisonCard
                    title="Change"
                    value="$711"
                    change="15%"
                    isPositive={true}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <ComparisonCard
                    title="Prior Year MTD"
                    value="$3,377,939"
                    change="-11%"
                    isPositive={false}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <ComparisonCard
                    title="Pr Y/MTD Avg"
                    value="$750"
                    change="-0%"
                    isPositive={false}
                  />
                </Grid>
              </Grid>
            </div>

            {/* Graph/Table Toggle */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={viewMode === "graph"}
                    onChange={(e) =>
                      setViewMode(e.target.checked ? "graph" : "table")
                    }
                    color="primary"
                  />
                  <Typography
                    variant="body2"
                    className="text-slate-600 font-medium"
                  >
                    Graph / Table
                  </Typography>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Typography variant="body2" className="text-slate-600">
                  Charge Status
                </Typography>
                <RadioGroup
                  row
                  value={chargeStatus}
                  onChange={(e) => setChargeStatus(e.target.value)}
                  className="ml-2"
                >
                  <FormControlLabel
                    value="Billable"
                    control={<Radio size="small" />}
                    label="Billable"
                    className="text-slate-600"
                  />
                </RadioGroup>
              </div>
            </div>

            {/* Charts */}
            {viewMode === "graph" && (
              <Grid container spacing={4} className="mb-8">
                <Grid item xs={12} lg={6}>
                  <Card
                    className="h-full transition-all duration-300 hover:shadow-lg"
                    elevation={2}
                    sx={{
                      background:
                        "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <Typography
                          variant="h6"
                          className="text-slate-800 font-semibold"
                        >
                          Year Month Revenue Totals
                        </Typography>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-blue-300"></div>
                            <Typography
                              variant="caption"
                              className="text-slate-600"
                            >
                              2020
                            </Typography>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <Typography
                              variant="caption"
                              className="text-slate-600"
                            >
                              2021
                            </Typography>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-blue-700"></div>
                            <Typography
                              variant="caption"
                              className="text-slate-600"
                            >
                              2022
                            </Typography>
                          </div>
                        </div>
                      </div>
                      <Box className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={revenueData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#e2e8f0"
                            />
                            <XAxis
                              dataKey="month"
                              tick={{ fontSize: 11, fill: "#64748b" }}
                              axisLine={{ stroke: "#cbd5e1" }}
                              angle={-45}
                              textAnchor="end"
                              height={60}
                            />
                            <YAxis
                              tick={{ fontSize: 11, fill: "#64748b" }}
                              axisLine={{ stroke: "#cbd5e1" }}
                              tickFormatter={(value) =>
                                `$${(value / 1000000).toFixed(0)}M`
                              }
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                              type="monotone"
                              dataKey="year2020"
                              stackId="1"
                              stroke="#93c5fd"
                              fill="#93c5fd"
                              fillOpacity={0.6}
                            />
                            <Area
                              type="monotone"
                              dataKey="year2021"
                              stackId="1"
                              stroke="#3b82f6"
                              fill="#3b82f6"
                              fillOpacity={0.7}
                            />
                            <Area
                              type="monotone"
                              dataKey="year2022"
                              stackId="1"
                              stroke="#1e40af"
                              fill="#1e40af"
                              fillOpacity={0.8}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} lg={6}>
                  <Card
                    className="h-full transition-all duration-300 hover:shadow-lg"
                    elevation={2}
                    sx={{
                      background:
                        "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <Typography
                          variant="h6"
                          className="text-slate-800 font-semibold"
                        >
                          Year Month Average Revenue
                        </Typography>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-blue-300"></div>
                            <Typography
                              variant="caption"
                              className="text-slate-600"
                            >
                              2020
                            </Typography>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <Typography
                              variant="caption"
                              className="text-slate-600"
                            >
                              2021
                            </Typography>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-blue-700"></div>
                            <Typography
                              variant="caption"
                              className="text-slate-600"
                            >
                              2022
                            </Typography>
                          </div>
                        </div>
                      </div>
                      <Box className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={averageRevenueData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#e2e8f0"
                            />
                            <XAxis
                              dataKey="month"
                              tick={{ fontSize: 11, fill: "#64748b" }}
                              axisLine={{ stroke: "#cbd5e1" }}
                              angle={-45}
                              textAnchor="end"
                              height={60}
                            />
                            <YAxis
                              tick={{ fontSize: 11, fill: "#64748b" }}
                              axisLine={{ stroke: "#cbd5e1" }}
                              tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                              type="monotone"
                              dataKey="year2020"
                              stackId="1"
                              stroke="#93c5fd"
                              fill="#93c5fd"
                              fillOpacity={0.6}
                            />
                            <Area
                              type="monotone"
                              dataKey="year2021"
                              stackId="1"
                              stroke="#3b82f6"
                              fill="#3b82f6"
                              fillOpacity={0.7}
                            />
                            <Area
                              type="monotone"
                              dataKey="year2022"
                              stackId="1"
                              stroke="#1e40af"
                              fill="#1e40af"
                              fillOpacity={0.8}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
          </Grid>

          {/* Right Sidebar */}
          <Grid item xs={12} lg={3}>
            <Card
              className="sticky top-6 transition-all duration-300 hover:shadow-lg"
              elevation={2}
              sx={{
                background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                border: "1px solid #e2e8f0",
              }}
            >
              <CardContent className="p-6 space-y-6">
                {/* Company */}
                <div className="flex items-center justify-between">
                  <Typography
                    variant="body2"
                    className="text-slate-600 font-medium"
                  >
                    Company
                  </Typography>
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>

                {/* Site Name */}
                <div>
                  <Typography
                    variant="body2"
                    className="text-slate-600 font-medium mb-2"
                  >
                    Site Name
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      value={siteName}
                      onChange={(e) => setSiteName(e.target.value)}
                      className="bg-white"
                    >
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value="Site 1">Site 1</MenuItem>
                      <MenuItem value="Site 2">Site 2</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                {/* Revenue Type */}
                <div>
                  <Typography
                    variant="body2"
                    className="text-slate-600 font-medium mb-3"
                  >
                    Revenue Type
                  </Typography>
                  <div className="space-y-2">
                    <Button
                      variant={
                        revenueType === "Drayage" ? "contained" : "outlined"
                      }
                      fullWidth
                      onClick={() => setRevenueType("Drayage")}
                      className={`justify-start ${
                        revenueType === "Drayage"
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "border-slate-300 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      Drayage
                    </Button>
                    <Button
                      variant={
                        revenueType === "Accessional" ? "contained" : "outlined"
                      }
                      fullWidth
                      onClick={() => setRevenueType("Accessional")}
                      className={`justify-start ${
                        revenueType === "Accessional"
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "border-slate-300 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      Accessional
                    </Button>
                  </div>
                </div>

                {/* Business Rules */}
                <div>
                  <Typography
                    variant="body2"
                    className="text-slate-600 font-medium mb-3"
                  >
                    Business Rules
                  </Typography>
                  <div className="space-y-2">
                    <Button
                      variant={
                        businessRule === "Revenue Legs Delivered"
                          ? "contained"
                          : "outlined"
                      }
                      fullWidth
                      onClick={() => setBusinessRule("Revenue Legs Delivered")}
                      className={`justify-start text-xs ${
                        businessRule === "Revenue Legs Delivered"
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "border-slate-300 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      Revenue Legs Delivered
                    </Button>
                    <Button
                      variant={
                        businessRule === "All Legs Delivered"
                          ? "contained"
                          : "outlined"
                      }
                      fullWidth
                      onClick={() => setBusinessRule("All Legs Delivered")}
                      className={`justify-start text-xs ${
                        businessRule === "All Legs Delivered"
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "border-slate-300 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      All Legs Delivered
                    </Button>
                  </div>
                </div>

                {/* Last Refresh */}
                <div className="pt-4 border-t border-slate-200">
                  <Typography variant="caption" className="text-slate-500">
                    Last Refresh - 6/23/2022 11:04:06 PM EST
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
