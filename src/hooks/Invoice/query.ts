import { useQuery } from "@tanstack/react-query";
import { getInvoice } from "services/invoice";
import { normalizeDateRangeQuery } from "utils/dateRange";

export const useGetInvoices = ({ query }: any) => {
  const normalizedQuery = normalizeDateRangeQuery(query);

  return useQuery({
    queryKey: ["invoices", normalizedQuery],
    queryFn: () =>
      getInvoice({
        query: normalizedQuery,
      }),
    refetchOnWindowFocus: false,
  });
};
