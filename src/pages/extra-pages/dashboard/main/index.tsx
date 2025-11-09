import type React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  Bar,
  BarChart,
} from "recharts";
import { useGetDashboardStats } from "hooks/dashboard/query";
import { formatCurrencyUSD } from "utils/helpers";

const orderTypeData = [
  { name: "Pickup", value: 2.57, color: "#3B82F6" },
  { name: "Delivery", value: 97.43, color: "#1E40AF" },
];

const MetricCard = ({
  title,
  subtitle,
  value,
  trend,
  className = "",
}: {
  title: string;
  subtitle?: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  className?: string;
}) => (
  <Card
    className={`h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${className}`}
    elevation={2}
    sx={{
      background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
      border: "1px solid #e2e8f0",
    }}
  >
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-3">
        <div>
          <Typography
            variant="body2"
            className="text-slate-600 font-medium mb-1"
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="caption"
              className="text-slate-400 uppercase tracking-wide"
            >
              {subtitle}
            </Typography>
          )}
        </div>
        {trend && (
          <Chip
            size="small"
            label={trend === "up" ? "↗" : trend === "down" ? "↘" : "→"}
            className={`${
              trend === "up"
                ? "bg-green-100 text-green-700"
                : trend === "down"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700"
            }`}
          />
        )}
      </div>
      <Typography
        variant="h4"
        className="font-bold text-slate-800 tracking-tight"
      >
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const ChartCard = ({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <Card
    className={`h-full transition-all duration-300 hover:shadow-lg ${className}`}
    elevation={2}
    sx={{
      background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
      border: "1px solid #e2e8f0",
    }}
  >
    <CardContent className="p-6">
      <div className="mb-6">
        <Typography variant="h6" className="text-slate-800 font-semibold mb-1">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" className="text-slate-500">
            {subtitle}
          </Typography>
        )}
      </div>
      <Box className="h-64">{children}</Box>
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
            {entry.name}: ${(entry.value / 1000000).toFixed(1)}M
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function MainDashboard() {
  const stats = useGetDashboardStats({ query: {} });
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      {/* <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Business Intelligence Dashboard
              </h1>
              <p className="text-slate-600 mt-1">
                Real-time insights and analytics
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Chip
                label="Live Data"
                className="bg-green-100 text-green-800 font-medium"
              />
            </div>
          </div>
        </div>
      </div> */}

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Revenue Metrics */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            Revenue Overview
          </h2>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
              <MetricCard
                title="Total Revenue"
                subtitle="YTD"
                value={formatCurrencyUSD(stats?.data?.totalRevenueYTD) || 0}
                trend="up"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <MetricCard
                title="Monthly Revenue"
                subtitle="MTD"
                value={formatCurrencyUSD(stats?.data?.monthlyRevenueMTD) || 0}
                trend="up"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <MetricCard
                title="Daily Average"
                subtitle="AVG YTD"
                value={formatCurrencyUSD(stats?.data?.dailyAvgYTD) || 0}
                trend="neutral"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <MetricCard
                title="Daily Average"
                subtitle="AVG MTD"
                value={formatCurrencyUSD(stats?.data?.dailyAvgMTD) || 0}
                trend="down"
              />
            </Grid>
          </Grid>
        </div>

        {/* Charts Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            Performance Analytics
          </h2>
          <Grid container spacing={4}>
            {/* Revenue Trend Chart */}
            <Grid item xs={12} lg={8}>
              <ChartCard
                title="Revenue Trends"
                subtitle="Monthly comparison across years"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={stats?.data?.monthlyTrends || []}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12, fill: "#64748b" }}
                      axisLine={{ stroke: "#cbd5e1" }}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: "#64748b" }}
                      axisLine={{ stroke: "#cbd5e1" }}
                      tickFormatter={(value) =>
                        `$${(value / 1000).toFixed(1)}K`
                      }
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="year2023"
                      stroke="#94a3b8"
                      strokeWidth={2}
                      name="2023"
                      dot={{ fill: "#94a3b8", strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="year2024"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="2024"
                      dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="year2025"
                      stroke="#1e40af"
                      strokeWidth={3}
                      name="2025"
                      dot={{ fill: "#1e40af", strokeWidth: 2, r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </Grid>

            {/* Key Metrics */}
            <Grid item xs={12} lg={4}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MetricCard
                    title="Drayage Revenue"
                    subtitle="AVG PER DAY"
                    value="$167,655"
                    trend="up"
                  />
                </Grid>
                <Grid item xs={12}>
                  <MetricCard
                    title="Auto-rating Success"
                    value="84%"
                    trend="up"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        {/* Sales Breakdown Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            Sales Breakdown
          </h2>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <MetricCard
                title="Total Sales"
                value={formatCurrencyUSD(stats?.data?.salesData?.total || 0)}
                trend="neutral"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MetricCard
                title="Paid Amount"
                value={formatCurrencyUSD(stats?.data?.salesData?.paid || 0)}
                trend="up"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MetricCard
                title="Pending Amount"
                value={formatCurrencyUSD(stats?.data?.salesData?.pending || 0)}
                trend="down"
              />
            </Grid>
          </Grid>

          {/* Sales Breakdown Chart */}
          <Grid container spacing={4} mt={3}>
            <Grid item xs={12} lg={6}>
              <ChartCard title="Sales Distribution" subtitle="Paid vs Pending">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: "Paid",
                          value: stats?.data?.salesData?.paid || 0,
                        },
                        {
                          name: "Pending",
                          value: stats?.data?.salesData?.pending || 0,
                        },
                      ]}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      <Cell fill="#3b82f6" /> {/* Paid */}
                      <Cell fill="#f59e0b" /> {/* Pending */}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            </Grid>

            <Grid item xs={12} lg={6}>
              <ChartCard
                title="Sales Trend"
                subtitle="Total vs Paid vs Pending"
              >
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[
                      {
                        name: "Sales",
                        Total: stats?.data?.salesData?.total || 0,
                        Paid: stats?.data?.salesData?.paid || 0,
                        Pending: stats?.data?.salesData?.pending || 0,
                      },
                    ]}
                    margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                      tickFormatter={(value) =>
                        `$${(value / 1000).toFixed(1)}K`
                      }
                    />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Total" fill="#1e40af" />
                    <Bar dataKey="Paid" fill="#3b82f6" />
                    <Bar dataKey="Pending" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </Grid>
          </Grid>
        </div>

        {/* Operational Metrics */}
        {/* <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            Operational Metrics
          </h2>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
              <MetricCard
                title="Location Turn Time"
                subtitle="AVG MINUTES"
                value="60"
                trend="neutral"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <MetricCard title="Mobile Usage" value="76%" trend="up" />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Card
                className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                elevation={2}
                sx={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                  border: "1px solid #e2e8f0",
                }}
              >
                <CardContent className="p-6">
                  <Typography
                    variant="body2"
                    className="text-slate-600 font-medium mb-1"
                  >
                    EDI 204 - Accepted
                  </Typography>
                  <Typography
                    variant="h4"
                    className="font-bold text-slate-800 mb-3"
                  >
                    76.9%
                  </Typography>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <Typography
                      variant="caption"
                      className="text-blue-700 font-medium"
                    >
                      Which Report VISUALS do you want on your Dashboard?
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <MetricCard
                title="Billing Cycle"
                subtitle="AVG DAYS"
                value="13.2"
                trend="down"
              />
            </Grid>
          </Grid>
        </div> */}

        {/* Bottom Section */}
        <Grid container spacing={4}>
          {/* Business Intelligence Features */}
          {/* <Grid item xs={12} lg={8}>
            <Card
              className="h-full transition-all duration-300 hover:shadow-lg"
              elevation={2}
              sx={{
                background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                border: "1px solid #e2e8f0",
              }}
            >
              <CardContent className="p-6">
                <Typography
                  variant="h6"
                  className="text-slate-800 font-semibold mb-6"
                >
                  Trinium Business Intelligence Features
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <List className="space-y-2">
                      <ListItem className="px-0 py-2 bg-slate-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0 mt-2"></div>
                        <ListItemText
                          primary="Financial and Operational Report views"
                          primaryTypographyProps={{
                            className: "text-slate-700 font-medium",
                          }}
                        />
                      </ListItem>
                      <ListItem className="px-0 py-2 bg-slate-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0 mt-2"></div>
                        <ListItemText
                          primary="Nightly refresh: results available at start of day"
                          primaryTypographyProps={{
                            className: "text-slate-700 font-medium",
                          }}
                        />
                      </ListItem>
                      <ListItem className="px-0 py-2 bg-slate-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0 mt-2"></div>
                        <ListItemText
                          primary="Two years of data for year-over-year comparisons"
                          primaryTypographyProps={{
                            className: "text-slate-700 font-medium",
                          }}
                        />
                      </ListItem>
                      <ListItem className="px-0 py-2 bg-slate-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0 mt-2"></div>
                        <ListItemText
                          primary="Flexible filter options and Excel export"
                          primaryTypographyProps={{
                            className: "text-slate-700 font-medium",
                          }}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <List className="space-y-2">
                      <ListItem className="px-0 py-2 bg-slate-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0 mt-2"></div>
                        <ListItemText
                          primary="User role and site based security"
                          primaryTypographyProps={{
                            className: "text-slate-700 font-medium",
                          }}
                        />
                      </ListItem>
                      <ListItem className="px-0 py-2 bg-slate-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0 mt-2"></div>
                        <ListItemText
                          primary="New reports and features released regularly"
                          primaryTypographyProps={{
                            className: "text-slate-700 font-medium",
                          }}
                        />
                      </ListItem>
                      <ListItem className="px-0 py-2 bg-slate-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0 mt-2"></div>
                        <ListItemText
                          primary="Product development by customer demand"
                          primaryTypographyProps={{
                            className: "text-slate-700 font-medium",
                          }}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <Typography
                    variant="body2"
                    className="text-blue-800 font-medium"
                  >
                    💡 Trinium can configure the dashboard and default filter
                    settings to your specifications.
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid> */}

          {/* Order Count Pie Chart */}
          {/* <Grid item xs={12} lg={4}>
            <ChartCard title="Order Distribution" subtitle="By Order Type">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {orderTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any) => [`${value}%`, "Percentage"]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <Box className="mt-4 space-y-3">
                {orderTypeData.map((item, index) => (
                  <Box
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                  >
                    <Box className="flex items-center">
                      <Box
                        className="w-4 h-4 rounded-full mr-3"
                        style={{ backgroundColor: item.color }}
                      />
                      <Typography
                        variant="body2"
                        className="text-slate-700 font-medium"
                      >
                        {item.name}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      className="text-slate-800 font-bold"
                    >
                      {item.value}%
                    </Typography>
                  </Box>
                ))}
              </Box>
            </ChartCard>
          </Grid> */}
        </Grid>
      </div>
    </div>
  );
}
