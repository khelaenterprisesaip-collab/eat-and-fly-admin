import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "services/dashboard";
import { normalizeDateRangeQuery } from "utils/dateRange";

export const useGetDashboardStats = ({ query }: any) => {
  const normalizedQuery = normalizeDateRangeQuery(query);

  return useQuery({
    queryKey: ["dashboardStats", normalizedQuery],
    queryFn: () =>
      getDashboardStats({
        query: normalizedQuery,
      }),
    refetchOnWindowFocus: false,
  });
};
