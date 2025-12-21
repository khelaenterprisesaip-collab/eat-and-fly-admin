import { useMutation } from "@tanstack/react-query";
import { createInvoice, deleteInvoice } from "services/invoice";

export const useCreateInvoice = () => {
  return useMutation({
    mutationFn: (payload: any) => createInvoice(payload),
  });
};

export const useDeleteInvoice = () => {
  return useMutation({
    mutationFn: (payload: any) => deleteInvoice(payload),
  });
};
