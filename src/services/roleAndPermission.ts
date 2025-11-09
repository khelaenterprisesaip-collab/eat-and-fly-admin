// Importing necessary utilities
import { roleAndPermission } from 'utils/apiUtils/endpoints';
import { callApi } from 'utils/apiUtils/index';
import { ApiEndpoint } from 'types/api';

export async function addRole({ body }: any) {
  return callApi({
    uriEndPoint: { ...roleAndPermission.addRole.v1 } as ApiEndpoint,
    body
  });
}

export async function updateRole({ body, pathParams }: any) {
  return callApi({
    uriEndPoint: { ...roleAndPermission.updateRole.v1 } as ApiEndpoint,
    body,
    pathParams
  });
}

export async function fetchAllRoles({ query }: any) {
  return callApi({
    uriEndPoint: { ...roleAndPermission.fetchAllRoles.v1 } as ApiEndpoint,
    query
  });
}

export async function fetchSingleRole({ query }: any) {
  return callApi({
    uriEndPoint: { ...roleAndPermission.fetchSingleRole.v1 } as ApiEndpoint,
   query
  });
}

// permission
export async function addPermission({ body }: any) {
  return callApi({
    uriEndPoint: { ...roleAndPermission.addPermission.v1 } as ApiEndpoint,
    body
  });
}

export async function fetchSinglePermission({ pathParams }: any) {
  return callApi({
    uriEndPoint: { ...roleAndPermission.fetchSinglePermission.v1 } as ApiEndpoint,
    pathParams
  });
}

export async function updatePermission({ body, pathParams }: any) {
  return callApi({
    uriEndPoint: { ...roleAndPermission.updatePermission.v1 } as ApiEndpoint,
    body,
    pathParams
  });
}

export async function fetchAllPermission() {
  return callApi({
    uriEndPoint: { ...roleAndPermission.fetchAllPermission.v1 } as ApiEndpoint
  });
}
