import {
  ThemeProvider,
  CssBaseline,
  Box,
  Container,
  Typography,
  Grid,
  Select,
  Stack,
  MenuItem,
} from "@mui/material";

import {
  Receipt,
  Inventory,
  People,
  FlightTakeoff,
  AttachMoney,
} from "@mui/icons-material";
import SalesChart from "./Product/graph";
import StatCard from "./Product/card";
import useAuth from "hooks/useAuth";
import RecentInvoices from "./Product/table";
import { useGetDashboardStats } from "hooks/dashboard/query";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "components/CustomRangeDateWithApplyButton";
import dayjs, { Dayjs } from "dayjs";

const formatCurrency = (amount: any) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const statusOptions = [
  { value: "all", label: "all", color: "#bcd8e7" },
  { value: "cash", label: "Cash", color: "#388e3c" },
  { value: "online", label: "Online", color: "#fbc02d" },
  {
    value: "card",
    label: "Card",
    color: "#212121",
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState({
    isOpen: false,
    value: "",
  });
  const [dateRange, setDateRange] = useState<[any | null, any | null]>([
    null,
    null,
  ]);
  const { data: stats } = useGetDashboardStats({
    query: {
      startDate: dateRange[0] ? new Date(dateRange[0])?.getTime() : "",
      endDate: dateRange[1] ? new Date(dateRange[1])?.getTime() : "",
      ...(selectedStatus?.value !== "all" && {
        paymentMethod: selectedStatus?.value,
      }),
    },
  });

  console.log("stats", stats);
  // const { cards, chart } = stats;
  return (
    <>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box mb={4} display={"flex"} justifyContent={"space-between"}>
          <Stack>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: "#1a1f1a", mb: 0.5 }}
            >
              Dashboard Overview
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Welcome back! Here's what's happening with your business today.
            </Typography>
          </Stack>

          <Stack direction={"row"} gap={2} mt={0.5} px={2}>
            <Select
              value={selectedStatus?.value || "all"}
              onChange={(e) =>
                setSelectedStatus({
                  isOpen: true,
                  value: e.target.value || "",
                })
              }
              size="small"
              className="min-w-[180px] h-[42px] rounded-sm! !text-xs"
              displayEmpty
            >
              <MenuItem
                disabled
                sx={{
                  fontWeight: "500",
                  fontSize: "0.875rem",
                  fontFamily: "Inter, sans-serif",
                }}
                value={""}
              >
                Select Status
              </MenuItem>
              {statusOptions?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: option.color,
                      }}
                    />
                    <Typography
                      sx={{
                        fontWeight: "500",
                        // fontSize: "0.875rem",
                        fontFamily: "Inter, sans-serif",
                      }}
                      variant="button"
                    >
                      {option.label}
                    </Typography>
                  </Stack>
                </MenuItem>
              ))}
            </Select>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div>
                <DateRangePicker
                  clearState={setDateRange}
                  date={
                    dateRange[0] && dateRange[1]
                      ? {
                          from: dateRange[0].toDate(),
                          to: dateRange[1].toDate(),
                        }
                      : undefined
                  }
                  onDateChange={(dr: any) => {
                    setDateRange([
                      dr?.from ? dayjs(dr?.from) : null,
                      dr?.to ? dayjs(dr?.to) : null,
                    ]);
                  }}
                />
              </div>
            </LocalizationProvider>
          </Stack>
        </Box>
        {/* Stats Cards */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} lg={4}>
            <StatCard
              title="Total Invoices"
              value={stats?.data?.cards?.invoices?.value || 0}
              icon={Receipt}
              change="+12.5% from last month"
              changeType="positive"
              gradient="linear-gradient(135deg, #334735 0%, #4a6a4d 100%)"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <StatCard
              title="Products"
              value={stats?.data?.cards?.products?.value || 0}
              icon={Inventory}
              change="+8 new this week"
              changeType="positive"
              gradient="linear-gradient(135deg, #4a6a4d 0%, #5a8f5e 100%)"
            />
          </Grid>
          {/* <Grid item xs={12} sm={6} lg={4}>
            <StatCard
              title="Staff Members"
              value="89"
              icon={People}
              change="+3 hired this month"
              changeType="positive"
              gradient="linear-gradient(135deg, #5a8f5e 0%, #7bb87f 100%)"
            />
          </Grid> */}
          {/* <Grid item xs={12} sm={6} lg={4}>
            <StatCard
              title="Airports"
              value="42"
              icon={FlightTakeoff}
              change="2 pending approval"
              changeType="neutral"
              gradient="linear-gradient(135deg, #334735 0%, #5a8f5e 100%)"
            />
          </Grid> */}
          <Grid item xs={12} sm={6} lg={4}>
            <StatCard
              title="Total Sales"
              value={formatCurrency(stats?.data?.cards?.sales?.value) || 0}
              icon={AttachMoney}
              change="+23.1% from last month"
              changeType="positive"
              gradient="linear-gradient(135deg, #1f2b21 0%, #334735 100%)"
            />
          </Grid>
        </Grid>
        {/* Charts Row */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <SalesChart stats={stats?.data?.chart} />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RecentInvoices
              dateRange={dateRange}
              selectedStatus={selectedStatus}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
