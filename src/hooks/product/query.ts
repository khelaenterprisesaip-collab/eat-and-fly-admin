import { useQuery } from "@tanstack/react-query";
import { fetchAirportProduct, fetchAllProduct } from "services/product";
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

export const useGetAirportProduct = ({ query }: any) =>
  useQuery({
    queryKey: ["airportProduct"],
    queryFn: () =>
      fetchAirportProduct({
        query,
      }),
    refetchOnWindowFocus: false,
  });
