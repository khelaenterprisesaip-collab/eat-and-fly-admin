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
  Switch,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const orderVolumeData = [
  { period: "202222", orders: 295 },
  { period: "202223", orders: 1138 },
  { period: "202224", orders: 1252 },
  { period: "202225", orders: 1075 },
  { period: "202226", orders: 993 },
];

const orderTypeData = [
  { name: "Pickup", value: 6.29, color: "#64B5F6" },
  { name: "Delivery", value: 93.71, color: "#1565C0" },
];

const tableData = [
  {
    id: 1,
    siteName: "SiteName 1",
    orders: 3591,
    avgCharges: "$13,948.16",
    totalCharges: "$50,073,905",
    isExpanded: false,
    children: [
      {
        id: 11,
        siteName: "Delivery",
        orders: 3496,
        avgCharges: "$14,301.63",
        totalCharges: "$49,984,208",
        children: [
          {
            id: 111,
            siteName: "CustomerName 00708",
            orders: 1627,
            avgCharges: "$578.58",
            totalCharges: "$941,344",
            children: [
              {
                id: 1111,
                siteName: "Location 2121 - City 908",
                orders: 1610,
                avgCharges: "$580.72",
                totalCharges: "$934,958",
              },
              {
                id: 1112,
                siteName: "Port Location 12741 - City 908",
                orders: 17,
                avgCharges: "$375.65",
                totalCharges: "$6,386",
              },
            ],
          },
          {
            id: 112,
            siteName: "CustomerName 00492",
            orders: 366,
            avgCharges: "$874.03",
            totalCharges: "$319,893",
            children: [
              {
                id: 1121,
                siteName: "Location 1917 - City 906",
                orders: 366,
                avgCharges: "$874.03",
                totalCharges: "$319,893",
              },
            ],
          },
          {
            id: 113,
            siteName: "CustomerName 00874",
            orders: 335,
            avgCharges: "$492.54",
            totalCharges: "$165,001",
            children: [
              {
                id: 1131,
                siteName: "Location 3705 - City 917",
                orders: 148,
                avgCharges: "$690.63",
                totalCharges: "$102,213",
              },
              {
                id: 1132,
                siteName: "Location 8965 - City 917",
                orders: 64,
                avgCharges: "$33.52",
                totalCharges: "$2,145",
              },
              {
                id: 1133,
                siteName: "Location 3709 - City 917",
                orders: 63,
                avgCharges: "$580.29",
                totalCharges: "$36,558",
              },
              {
                id: 1134,
                siteName: "Location 2009 - City 917",
                orders: 36,
                avgCharges: "$193.33",
                totalCharges: "$6,960",
              },
              {
                id: 1135,
                siteName: "Location 12657 - City 917",
                orders: 24,
                avgCharges: "$713.54",
                totalCharges: "$17,125",
              },
            ],
          },
          {
            id: 114,
            siteName: "CustomerName 00636",
            orders: 258,
            avgCharges: "$185,512.85",
            totalCharges: "$47,862,315",
            children: [
              {
                id: 1141,
                siteName: "Location 2493 - City 932",
                orders: 258,
                avgCharges: "$185,512.85",
                totalCharges: "$47,862,315",
              },
            ],
          },
          {
            id: 115,
            siteName: "CustomerName 00518",
            orders: 149,
            avgCharges: "$599.61",
            totalCharges: "$89,341",
            children: [
              {
                id: 1151,
                siteName: "Location 2041 - City 907",
                orders: 137,
                avgCharges: "$562.70",
                totalCharges: "$77,089",
              },
            ],
          },
        ],
      },
    ],
  },
];

interface TableRowData {
  id: number;
  siteName: string;
  orders: number;
  avgCharges: string;
  totalCharges: string;
  children?: TableRowData[];
  isExpanded?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
        <p className="font-semibold text-slate-800 mb-1">{label}</p>
        <p className="text-sm text-blue-600">Orders: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const ExpandableTableRow = ({
  row,
  level = 0,
  onToggleExpand,
}: {
  row: TableRowData;
  level?: number;
  onToggleExpand: (id: number) => void;
}) => {
  const hasChildren = row.children && row.children.length > 0;
  const paddingLeft = level * 20;

  return (
    <>
      <TableRow
        className={`${level === 0 ? "bg-slate-100" : level === 1 ? "bg-slate-50" : "bg-white"} hover:bg-slate-200 transition-colors`}
      >
        <TableCell
          className="font-medium"
          style={{ paddingLeft: `${paddingLeft + 16}px` }}
        >
          <div className="flex items-center">
            {hasChildren && (
              <IconButton
                size="small"
                onClick={() => onToggleExpand(row.id)}
                className="mr-2"
              >
                {row.isExpanded ? (
                  <ExpandLessIcon fontSize="small" />
                ) : (
                  <ExpandMoreIcon fontSize="small" />
                )}
              </IconButton>
            )}
            <span
              className={
                level === 0 ? "font-semibold text-slate-800" : "text-slate-700"
              }
            >
              {row.siteName}
            </span>
          </div>
        </TableCell>
        <TableCell align="right" className="font-medium text-slate-800">
          {row.orders.toLocaleString()}
        </TableCell>
        <TableCell align="right" className="font-medium text-slate-800">
          {row.avgCharges}
        </TableCell>
        <TableCell align="right" className="font-medium text-slate-800">
          {row.totalCharges}
        </TableCell>
      </TableRow>
      {hasChildren && (
        <TableRow>
          <TableCell colSpan={4} className="p-0 border-0">
            <Collapse in={row.isExpanded} timeout="auto" unmountOnExit>
              <Table size="small">
                <TableBody>
                  {row.children?.map((child) => (
                    <ExpandableTableRow
                      key={child.id}
                      row={child}
                      level={level + 1}
                      onToggleExpand={onToggleExpand}
                    />
                  ))}
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default function OrderVolumeDashboard() {
  const [dateRange, setDateRange] = useState("Last");
  const [days, setDays] = useState("30");
  const [siteName, setSiteName] = useState("All");
  const [orderCustomer, setOrderCustomer] = useState("All");
  const [customerMaster, setCustomerMaster] = useState("All");
  const [orderType, setOrderType] = useState("All");
  const [userSummary, setUserSummary] = useState(true);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRowExpansion = (id: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);

    // Update the table data to reflect expansion state
    const updateExpansion = (rows: TableRowData[]): TableRowData[] => {
      return rows.map((row) => ({
        ...row,
        isExpanded: newExpanded.has(row.id),
        children: row.children ? updateExpansion(row.children) : undefined,
      }));
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-2">
          Revenue Summary
        </h2>
        <Grid container spacing={4}>
          {/* Left Sidebar - Filters */}
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
                {/* Order Entry Date */}
                <div>
                  <Typography
                    variant="body2"
                    className="text-slate-600 font-medium mb-3"
                  >
                    Order Entry Date
                  </Typography>
                  <div className="flex space-x-2 mb-3">
                    <FormControl size="small" className="flex-1">
                      <Select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="bg-white"
                      >
                        <MenuItem value="Last">Last</MenuItem>
                        <MenuItem value="Next">Next</MenuItem>
                        <MenuItem value="Custom">Custom</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl size="small" className="flex-1">
                      <Select
                        value={days}
                        onChange={(e) => setDays(e.target.value)}
                        className="bg-white"
                      >
                        <MenuItem value="7">7</MenuItem>
                        <MenuItem value="30">30</MenuItem>
                        <MenuItem value="90">90</MenuItem>
                      </Select>
                    </FormControl>
                    <Typography
                      variant="body2"
                      className="text-slate-600 self-center"
                    >
                      Days
                    </Typography>
                  </div>
                  <div className="flex items-center text-slate-500 text-sm">
                    <CalendarTodayIcon fontSize="small" className="mr-2" />
                    5/26/2022 - 6/24/2022
                  </div>
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

                {/* Order Customer */}
                <div>
                  <Typography
                    variant="body2"
                    className="text-slate-600 font-medium mb-2"
                  >
                    Order Customer
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      value={orderCustomer}
                      onChange={(e) => setOrderCustomer(e.target.value)}
                      className="bg-white"
                    >
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value="Customer 1">Customer 1</MenuItem>
                      <MenuItem value="Customer 2">Customer 2</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                {/* Customer Master */}
                <div>
                  <Typography
                    variant="body2"
                    className="text-slate-600 font-medium mb-2"
                  >
                    Customer Master
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      value={customerMaster}
                      onChange={(e) => setCustomerMaster(e.target.value)}
                      className="bg-white"
                    >
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value="Master 1">Master 1</MenuItem>
                      <MenuItem value="Master 2">Master 2</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                {/* Order Type, Category */}
                <div>
                  <Typography
                    variant="body2"
                    className="text-slate-600 font-medium mb-2"
                  >
                    Order Type, Category
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      value={orderType}
                      onChange={(e) => setOrderType(e.target.value)}
                      className="bg-white"
                    >
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value="Type 1">Type 1</MenuItem>
                      <MenuItem value="Type 2">Type 2</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                {/* User Summary Toggle */}
                <div className="pt-4 border-t border-slate-200">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={userSummary}
                        onChange={(e) => setUserSummary(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="User Summary"
                    className="text-slate-600"
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} lg={9}>
            {/* Top Metrics */}
            <div className="mb-8">
              <Grid container spacing={4}>
                {/* Order Volume Card */}
                <Grid item xs={12} md={6}>
                  <Card
                    className="h-full transition-all duration-300 hover:shadow-lg"
                    elevation={2}
                    sx={{
                      background:
                        "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <CardContent className="p-6 text-center">
                      <Typography
                        variant="h2"
                        className="font-bold text-blue-700 mb-2"
                      >
                        4,753
                      </Typography>
                      <Typography variant="h6" className="text-slate-600 mb-6">
                        Orders Created
                      </Typography>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <Typography
                            variant="h4"
                            className="font-bold text-slate-800"
                          >
                            67.1%
                          </Typography>
                          <Typography
                            variant="body2"
                            className="text-slate-600"
                          >
                            EDI 204 - Accepted
                          </Typography>
                        </div>
                        <div>
                          <Typography
                            variant="h4"
                            className="font-bold text-slate-800"
                          >
                            59.3%
                          </Typography>
                          <Typography
                            variant="body2"
                            className="text-slate-600"
                          >
                            EDI 204 - Automated
                          </Typography>
                        </div>
                      </div>

                      {/* Donut Chart */}
                      <Box className="h-48 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={orderTypeData}
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={80}
                              paddingAngle={2}
                              dataKey="value"
                            >
                              {orderTypeData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value: any) => [
                                `${value}%`,
                                "Percentage",
                              ]}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </Box>
                      <div className="flex justify-center space-x-6 mt-4">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                          <Typography
                            variant="caption"
                            className="text-slate-600"
                          >
                            Pickup 6.29%
                          </Typography>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-blue-800 mr-2"></div>
                          <Typography
                            variant="caption"
                            className="text-slate-600"
                          >
                            Delivery 95.48%
                          </Typography>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Charts Column */}
                <Grid item xs={12} md={6}>
                  <Grid container spacing={3}>
                    {/* Order Entry Volume Chart */}
                    <Grid item xs={12}>
                      <Card
                        className="transition-all duration-300 hover:shadow-lg"
                        elevation={2}
                        sx={{
                          background:
                            "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                          border: "1px solid #e2e8f0",
                        }}
                      >
                        <CardContent className="p-6">
                          <Typography
                            variant="h6"
                            className="text-slate-800 font-semibold mb-4"
                          >
                            Order Entry Volume
                          </Typography>
                          <Box className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={orderVolumeData}
                                margin={{
                                  top: 20,
                                  right: 30,
                                  left: 20,
                                  bottom: 5,
                                }}
                              >
                                <CartesianGrid
                                  strokeDasharray="3 3"
                                  stroke="#e2e8f0"
                                />
                                <XAxis
                                  dataKey="period"
                                  tick={{ fontSize: 11, fill: "#64748b" }}
                                  axisLine={{ stroke: "#cbd5e1" }}
                                />
                                <YAxis
                                  tick={{ fontSize: 11, fill: "#64748b" }}
                                  axisLine={{ stroke: "#cbd5e1" }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar
                                  dataKey="orders"
                                  fill="#1565C0"
                                  radius={[4, 4, 0, 0]}
                                />
                              </BarChart>
                            </ResponsiveContainer>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Year Over Year Comparison */}
                    <Grid item xs={12}>
                      <Card
                        className="transition-all duration-300 hover:shadow-lg"
                        elevation={2}
                        sx={{
                          background:
                            "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                          border: "1px solid #e2e8f0",
                        }}
                      >
                        <CardContent className="p-6">
                          <Typography
                            variant="h6"
                            className="text-slate-800 font-semibold mb-4"
                          >
                            Year Over Year - YTD
                          </Typography>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Typography
                                variant="body2"
                                className="text-slate-600 mb-1"
                              >
                                Order Entry YTD
                              </Typography>
                              <Typography
                                variant="h5"
                                className="font-bold text-slate-800"
                              >
                                32963
                              </Typography>
                              <Typography
                                variant="body2"
                                className="text-slate-600 mt-1"
                              >
                                Order Entry Prior Year
                              </Typography>
                              <Typography
                                variant="body1"
                                className="text-slate-700"
                              >
                                -3,798
                              </Typography>
                              <Typography
                                variant="caption"
                                className="text-slate-500"
                              >
                                OE YTD Diff
                              </Typography>
                            </div>
                            <div className="text-right">
                              <Typography
                                variant="body2"
                                className="text-slate-600 mb-1"
                              >
                                Order Volume
                              </Typography>
                              <Typography
                                variant="h4"
                                className="font-bold text-red-600"
                              >
                                -11.5%
                              </Typography>
                              <Typography
                                variant="caption"
                                className="text-slate-500 block mt-2"
                              >
                                -11.5%
                              </Typography>
                              <Typography
                                variant="caption"
                                className="text-slate-500"
                              >
                                OE YTD Diff %
                              </Typography>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>

            {/* Data Table */}
            <Card
              className="transition-all duration-300 hover:shadow-lg"
              elevation={2}
              sx={{
                background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                border: "1px solid #e2e8f0",
              }}
            >
              <CardContent className="p-6">
                <Typography
                  variant="h6"
                  className="text-slate-800 font-semibold mb-4"
                >
                  Customer - Site - Shipper/Consignee
                </Typography>
                <TableContainer className="max-h-96 overflow-auto">
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow className="bg-slate-800">
                        <TableCell className="font-semibold text-white bg-slate-800">
                          Site Name
                        </TableCell>
                        <TableCell
                          align="right"
                          className="font-semibold text-white bg-slate-800"
                        >
                          Orders
                        </TableCell>
                        <TableCell
                          align="right"
                          className="font-semibold text-white bg-slate-800"
                        >
                          Avg Charges
                        </TableCell>
                        <TableCell
                          align="right"
                          className="font-semibold text-white bg-slate-800"
                        >
                          Total Charges
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableData.map((row) => (
                        <ExpandableTableRow
                          key={row.id}
                          row={{ ...row, isExpanded: expandedRows.has(row.id) }}
                          onToggleExpand={toggleRowExpansion}
                        />
                      ))}
                      {/* Total Row */}
                      <TableRow className="bg-slate-800">
                        <TableCell className="font-bold text-white">
                          Total
                        </TableCell>
                        <TableCell
                          align="right"
                          className="font-bold text-white"
                        >
                          4,753
                        </TableCell>
                        <TableCell
                          align="right"
                          className="font-bold text-white"
                        >
                          $10,642.46
                        </TableCell>
                        <TableCell
                          align="right"
                          className="font-bold text-white"
                        >
                          $50,572,975
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
