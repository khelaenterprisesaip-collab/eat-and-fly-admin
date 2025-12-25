import {
  ThemeProvider,
  CssBaseline,
  Box,
  Container,
  Typography,
  Grid,
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

const formatCurrency = (amount: any) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function Dashboard() {
  const { user } = useAuth();
  const [dateRange, setDateRange] = useState([
    new Date(new Date().setDate(new Date().getDate() - 30)),
    new Date(),
  ]);
  const { data: stats } = useGetDashboardStats({
    query: {
      startDate: dateRange[0].getTime(),
      endDate: dateRange[1].getTime(),
    },
  });

  console.log("stats", stats);
  // const { cards, chart } = stats;
  return (
    <>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box mb={4}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "#1a1f1a", mb: 0.5 }}
          >
            Dashboard Overview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back! Here's what's happening with your business today.
          </Typography>
        </Box>
        {/* Stats Cards */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} lg={4}>
            <StatCard
              title="Total Invoices"
              value="1,284"
              icon={Receipt}
              change="+12.5% from last month"
              changeType="positive"
              gradient="linear-gradient(135deg, #334735 0%, #4a6a4d 100%)"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <StatCard
              title="Products"
              value="156"
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
              value="$728K"
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
            <SalesChart />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RecentInvoices />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
