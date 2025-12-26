import { useQuery } from "@tanstack/react-query";
import { getInvoice } from "services/invoice";

export const useGetInvoices = ({ query }: any) =>
  useQuery({
    queryKey: ["invoices", query],
    queryFn: () =>
      getInvoice({
        query,
      }),
    refetchOnWindowFocus: false,
  });
