import { useMutation } from "@tanstack/react-query";
import { createInvoice } from "services/invoice";

export const useCreateInvoice = () => {
  return useMutation({
    mutationFn: (payload: any) => createInvoice(payload),
  });
};
