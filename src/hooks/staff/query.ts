import { useQuery } from "@tanstack/react-query";
import { GetAllStaff } from "services/staff";

export const useGetStaff = ({ query }: any) =>
  useQuery({
    queryKey: ["staff"],
    queryFn: () =>
      GetAllStaff({
        query,
      }),
    refetchOnWindowFocus: false,
  });
