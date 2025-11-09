// Importing necessary utilities
import { dashboard } from "utils/apiUtils/endpoints";
import { callApi } from "utils/apiUtils/index";
import { ApiEndpoint } from "types/api";

export async function getStats({ query }: any) {
  return callApi({
    uriEndPoint: { ...dashboard.getStats.v1 } as ApiEndpoint,
    query,
  });
}

export async function getActivities({ query }: any) {
  return callApi({
    uriEndPoint: { ...dashboard.getActivities.v1 } as ApiEndpoint,
    query,
  });
}

export async function monthlyCustomer() {
  return callApi({
    uriEndPoint: { ...dashboard.monthlyCustomer.v1 } as ApiEndpoint,
  });
}

export async function getRevenue({ query }: any) {
  return callApi({
    uriEndPoint: { ...dashboard.getRevenue.v1 } as ApiEndpoint,
    query,
  });
}

export async function getDashboardStats({ query }: any) {
  return callApi({
    uriEndPoint: { ...dashboard.getDashboardStats.v1 } as ApiEndpoint,
    query,
  });
}
