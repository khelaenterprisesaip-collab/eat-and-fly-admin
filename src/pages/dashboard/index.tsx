import React, { useState, useMemo } from "react";
import {
  DollarSign,
  FileText,
  Package,
  ShoppingBag,
  TrendingUp,
  Download,
  Share2,
  RefreshCw,
} from "lucide-react";
import { useGetDashboardStats } from "hooks/dashboard/query";
import {
  StatCard,
  FilterBar,
  RevenueTrendChart,
  DistributionDonut,
  GlassCard,
  ActionableTable,
} from "./components";
import { DateRange } from "react-day-picker";
import { Button, CircularProgress } from "@mui/material";

const Dashboard = () => {
  const [airport, setAirport] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const queryParams = useMemo(() => {
    const params: any = {};
    if (airport !== "all") params.airport = airport;
    if (dateRange?.from) params.startDate = dateRange.from.getTime();
    if (dateRange?.to) params.endDate = dateRange.to.getTime();
    return params;
  }, [airport, dateRange]);

  const { data, isLoading, isError, refetch, isFetching } =
    useGetDashboardStats({ query: queryParams });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <CircularProgress />
      </div>
    );
  }

  const dashboardData = data?.data;
  const summary = dashboardData?.summary;

  return (
    <div className="min-h-screen bg-[#F0F4F8] p-4 md:p-8 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Dashboard <span className="text-indigo-600">.</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Welcome back! Here's what's happening with Eat & Fly today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => refetch()}
            variant="outlined"
            className="!rounded-2xl !p-3 !border-slate-200 !text-slate-600 hover:!bg-white group"
            disabled={isFetching}
          >
            <RefreshCw
              size={20}
              className={`${isFetching ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`}
            />
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        airport={airport}
        setAirport={setAirport}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      {/* Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Total Revenue"
          value={`${summary?.totalRevenue?.toLocaleString() || 0}`}
          icon={DollarSign}
          trend="up"
          trendValue={12.5}
          color="blue"
        />
        <StatCard
          title="Total Invoices"
          value={summary?.totalInvoices || 0}
          icon={FileText}
          trend="up"
          trendValue={8.2}
          color="green"
        />
        <StatCard
          title="Avg Order Value"
          value={`${summary?.avgOrderValue || 0}`}
          icon={ShoppingBag}
          trend="down"
          trendValue={3.1}
          color="purple"
        />
        <StatCard
          title="Active Products"
          value={summary?.activeProducts || 0}
          icon={Package}
          color="orange"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        {/* Revenue Trend */}
        <div className="lg:col-span-8">
          <GlassCard
            title="Revenue Trends"
            subtitle="Daily revenue performance analysis"
          >
            <RevenueTrendChart data={dashboardData?.revenueChart} />
          </GlassCard>
        </div>

        {/* Airport Distribution */}
        <div className="lg:col-span-4">
          <GlassCard
            title="Airport Share"
            subtitle="Revenue distribution by location"
          >
            <DistributionDonut
              data={dashboardData?.airportDistribution}
              dataKey="revenue"
              nameKey="airport"
              title="Airports"
            />
            <div className="mt-4 space-y-3">
              {dashboardData?.airportDistribution?.map(
                (item: any, i: number) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${["bg-indigo-500", "bg-emerald-500", "bg-amber-500"][i % 3]}`}
                      ></div>
                      <span className="text-slate-600 capitalize">
                        {item.airport}
                      </span>
                    </div>
                    <span className="font-bold text-slate-800">
                      {item.revenue.toLocaleString()}
                    </span>
                  </div>
                ),
              )}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Secondary Distribution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <GlassCard
          title="Payment Methods"
          subtitle="Transaction volume by type"
        >
          <div className="flex items-center">
            <DistributionDonut
              data={dashboardData?.paymentDistribution}
              dataKey="amount"
              nameKey="method"
              title="Methods"
            />
            <div className="flex-1 space-y-4 px-4">
              {dashboardData?.paymentDistribution?.map(
                (item: any, i: number) => (
                  <div key={i} className="flex flex-col">
                    <div className="flex justify-between text-xs mb-1 uppercase tracking-wider font-bold text-slate-400">
                      <span>{item.method}</span>
                      <span>{item.amount.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.method === "online" ? "bg-indigo-500" : "bg-slate-400"}`}
                        style={{
                          width: `${(item.amount / (summary?.totalRevenue || 1)) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </GlassCard>

        <GlassCard
          title="Category Analysis"
          subtitle="Performance across food categories"
        >
          <DistributionDonut
            data={dashboardData?.categoryDistribution}
            dataKey="revenue"
            nameKey="category"
            title="Categories"
          />
        </GlassCard>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <GlassCard
          title="Top Performing Products"
          subtitle="Most popular items by revenue"
        >
          <ActionableTable
            type="products"
            headers={["Product", "Qty", "Revenue"]}
            rows={dashboardData?.topProducts}
          />
        </GlassCard>

        <GlassCard
          title="Recent Invoices"
          subtitle="Latest transactions overview"
        >
          <ActionableTable
            type="invoices"
            headers={["Invoice ID", "Date", "Total", "Status"]}
            rows={dashboardData?.recentInvoices}
          />
        </GlassCard>
      </div>
    </div>
  );
};

export default Dashboard;
