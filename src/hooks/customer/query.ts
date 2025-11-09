import { useQuery } from "@tanstack/react-query";
import { fetchAllCustomers, fetchCustomer } from "services/customer";

export const useGetCustomers = ({ query }: any) =>
  useQuery({
    queryKey: ["customer"],
    queryFn: () =>
      fetchAllCustomers({
        query,
      }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });



  export const useGetSingleCustomer = ({ pathParams }: any) =>
  useQuery({
    queryKey: ["customer", pathParams],
    queryFn: () =>
      fetchCustomer({
        pathParams,
      }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!pathParams?.id,
  });

