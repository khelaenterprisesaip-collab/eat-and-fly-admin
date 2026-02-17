import { useQuery } from "@tanstack/react-query";
import { fetchAllCategory } from "services/category";

export const useGetCategory = ({ query }: any) =>
    useQuery({
        queryKey: ["category", query],
        queryFn: () =>
            fetchAllCategory({
                query,
            }),
        refetchOnWindowFocus: false,
    });
