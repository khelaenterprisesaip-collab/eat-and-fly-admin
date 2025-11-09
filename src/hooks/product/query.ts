import { useQuery } from "@tanstack/react-query";
import { fetchAllProduct } from "services/product";
import { GetAllStaff } from "services/staff";

export const useGetProduct = ({ query }: any) =>
  useQuery({
    queryKey: ["product"],
    queryFn: () =>
      fetchAllProduct({
        query,
      }),
    refetchOnWindowFocus: false,
  });
