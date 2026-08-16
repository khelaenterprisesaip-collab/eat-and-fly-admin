import React from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
  Package,
  Activity,
  Calendar as CalendarIcon,
  MapPin,
  ChevronRight,
  MoreVertical,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { format } from "date-fns";
import { DateRangePicker } from "components/CustomRangeDateWithApplyButton";
import { DateRange } from "react-day-picker";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Button,
} from "@mui/material";

// --- GlassCard Component ---
export const GlassCard = ({
  children,
  className = "",
  title,
  subtitle,
  action,
}: any) => (
  <div
    className={`backdrop-blur-xl bg-white/60 border border-white/20 rounded-3xl shadow-xl overflow-hidden ${className}`}
  >
    {(title || action) && (
      <div className="p-6 pb-2 flex justify-between items-center">
        <div>
          {title && (
            <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          )}
          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
    )}
    <div className="p-6 pt-2">{children}</div>
  </div>
);

// --- StatCard Component ---
export const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  color,
}: any) => {
  const colors: any = {
    blue: "bg-blue-500/10 text-blue-600 border-blue-200",
    green: "bg-green-500/10 text-green-600 border-green-200",
    purple: "bg-purple-500/10 text-purple-600 border-purple-200",
    orange: "bg-orange-500/10 text-orange-600 border-orange-200",
  };

  return (
    <GlassCard className="transition-all hover:scale-[1.02] hover:shadow-2xl">
      <div className="flex justify-between items-start">
        <div
          className={`p-3 rounded-2xl ${colors[color] || colors.blue} border`}
        >
          <Icon size={24} />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <h2 className="text-3xl font-black text-slate-800 mt-1">{value}</h2>
      </div>
    </GlassCard>
  );
};

// --- FilterBar Component ---
export const FilterBar = ({
  airport,
  setAirport,
  dateRange,
  setDateRange,
}: any) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
      <div className="flex flex-wrap gap-4 items-center w-full md:w-auto">
        <DateRangePicker
          date={dateRange}
          onDateChange={setDateRange}
          placeholder="Filter by Date"
          className="!w-auto"
          clearState={() => setDateRange(undefined)}
        />

        <FormControl variant="outlined" size="small" className="min-w-[150px]">
          <InputLabel id="airport-select-label">Airport</InputLabel>
          <Select
            labelId="airport-select-label"
            value={airport}
            onChange={(e) => setAirport(e.target.value)}
            label="Airport"
            className="bg-white/50 backdrop-blur-sm rounded-lg"
          >
            <MenuItem value="all">All Airports</MenuItem>
            <MenuItem value="amritsar">Amritsar</MenuItem>
            <MenuItem value="jalandhar">Jalandhar</MenuItem>
            <MenuItem value="ludhiana">Ludhiana</MenuItem>
            <MenuItem value="ghaziabad">Ghaziabad</MenuItem>
            <MenuItem value="jaisalmer">Jaisalmer</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

// --- RevenueTrendChart Component ---
export const RevenueTrendChart = ({ data }: any) => {
  const chartData =
    data?.labels.map((label: string, index: number) => ({
      name: label,
      revenue: data.series[index],
    })) || [];

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#E2E8F0"
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748B", fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748B", fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "16px",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#4F46E5"
            strokeWidth={4}
            dot={{ r: 6, fill: "#4F46E5", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 8, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// --- DistributionDonut Component ---
export const DistributionDonut = ({ data, dataKey, nameKey, title }: any) => {
  const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  return (
    <div className="h-[250px] w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data || []}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey={dataKey}
            nameKey={nameKey}
          >
            {data?.map((entry: any, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "12px",
              border: "none",
              backdropFilter: "blur(4px)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
        <span className="text-2xl font-bold text-slate-800">
          {data?.length || 0}
        </span>
        <span className="text-[10px] text-slate-500 uppercase tracking-widest">
          {title}
        </span>
      </div>
    </div>
  );
};

// --- ActionableTable Component ---
export const ActionableTable = ({ headers, rows, type }: any) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100">
            {headers.map((header: string) => (
              <th
                key={header}
                className="text-left py-4 px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
            <th className="py-4 px-2"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {rows?.map((row: any, i: number) => (
            <tr
              key={i}
              className="group hover:bg-slate-50/50 transition-colors"
            >
              {type === "products" ? (
                <>
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <Package size={20} />
                      </div>
                      <span className="font-semibold text-slate-700">
                        {row.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-slate-600">{row.quantity}</td>
                  <td className="py-4 px-2 font-bold text-slate-800">
                    ${row.revenue.toLocaleString()}
                  </td>
                </>
              ) : (
                <>
                  <td className="py-4 px-2">
                    <span className="font-semibold text-slate-700">
                      {row.invoiceNumber}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-slate-500 text-sm">
                    {format(new Date(row.date), "dd MMM, yyyy")}
                  </td>
                  <td className="py-4 px-2 font-bold text-slate-800">
                    ${row.total.toLocaleString()}
                  </td>
                  <td className="py-4 px-2">
                    <span
                      className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        row.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </>
              )}
              <td className="py-4 px-2 text-right">
                <IconButton size="small">
                  <ChevronRight
                    size={18}
                    className="text-slate-300 group-hover:text-indigo-600 transition-colors"
                  />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
