import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "services/dashboard";

export const useGetDashboardStats = ({ query }: any) =>
  useQuery({
    queryKey: ["dashboardStats", query],
    queryFn: () =>
      getDashboardStats({
        query,
      }),
    refetchOnWindowFocus: false,
  });
