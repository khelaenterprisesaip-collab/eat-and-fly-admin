import { useQuery } from "@tanstack/react-query";
import { queryClient } from "App";
import { getAllChassis } from "services/chassis";

export const useGetAllTool = ({ query }: any) =>
  useQuery({
    queryKey: ["tool", query],
    queryFn: () =>
      getAllChassis({
        query,
      }),
    refetchOnWindowFocus: false,
  });

export const updateToolAvailabilityCache = ({ oldId, newId, type }: any) => {
  return queryClient.setQueriesData(
    {
      queryKey: ["tool", { type }],
    },
    (oldData: any) => {
      if (!oldData) {
        return;
      }
      if (oldId === newId) {
        return oldData;
      }
      return {
        ...oldData,
        data: oldData?.data?.map((item: any) => {
          if (item.uuid === oldId) {
            return {
              ...item,
              isAvailable: true,
            };
          }
          if (item.uuid === newId) {
            return {
              ...item,
              isAvailable: false,
            };
          }
          return item;
        }),
      };
    }
  );
};
