import { ApiEndpoint } from "types/api";
import { callApi } from "utils/apiUtils";
import invoice from "utils/apiUtils/endpoints/invoice";

export async function createInvoice({ body }: any) {
  return callApi({
    uriEndPoint: { ...invoice.createInvoice.v1 } as ApiEndpoint,
    body,
  });
}

export async function getInvoice({ query }: any) {
  return callApi({
    uriEndPoint: { ...invoice.getInvoice.v1 } as ApiEndpoint,
    query,
  });
}
export async function getSingleInvoice({ pathParams }: any) {
  return callApi({
    uriEndPoint: { ...invoice.getSingleInvoice.v1 } as ApiEndpoint,
    pathParams,
  });
}

export async function deleteInvoice({ pathParams }: any) {
  return callApi({
    uriEndPoint: { ...invoice.deleteInvoice.v1 } as ApiEndpoint,
    pathParams,
  });
}

export async function downloadInvoice({ body }: any) {
  return callApi({
    uriEndPoint: { ...invoice.downloadInvoice.v1 } as ApiEndpoint,
    body,
  });
}

export async function capturePayment({ body }: any) {
  return callApi({
    uriEndPoint: { ...invoice.capturePayment.v1 } as ApiEndpoint,
    body,
  });
}

export async function getTransactions({ pathParams }: any) {
  return callApi({
    uriEndPoint: { ...invoice.getTransactions.v1 } as ApiEndpoint,
    pathParams,
  });
}
