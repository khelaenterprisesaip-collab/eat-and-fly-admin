// Importing necessary utilities
import { notification } from 'utils/apiUtils/endpoints';
import { callApi } from 'utils/apiUtils/index';
import { ApiEndpoint } from 'types/api';

export async function updateNotification({ body }: any) {
  return callApi({
    uriEndPoint: { ...notification.updateNotification.v1 } as ApiEndpoint,
    body
  });
}

export async function fetchNotification() {
  return callApi({
    uriEndPoint: { ...notification.fetchNotification.v1 } as ApiEndpoint
  });
}


export async function fetchAllNotification({query}:any) {
  return callApi({
    uriEndPoint: { ...notification.fetchAllNotification.v1 } as ApiEndpoint,
    query
  });
}

