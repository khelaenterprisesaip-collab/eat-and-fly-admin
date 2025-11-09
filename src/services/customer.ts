// Importing necessary utilities
import { customer } from 'utils/apiUtils/endpoints';
import { callApi } from 'utils/apiUtils/index';
import { ApiEndpoint } from 'types/api';

export async function updateCustomer({ body, pathParams }: any) {
  return callApi({
    uriEndPoint: { ...customer.updateCustomer.v1 } as ApiEndpoint,
    body,
    pathParams
  });
}

export async function addCustomer({ body }: any) {
  return callApi({
    uriEndPoint: { ...customer.addCustomer.v1 } as ApiEndpoint,
    body
  });
}

export async function fetchCustomer({pathParams}:any) {
  return callApi({
    uriEndPoint: { ...customer.fetchCustomer.v1 } as ApiEndpoint,
    pathParams
  });
}


export async function deleteCustomer({pathParams}:any) {
  return callApi({
    uriEndPoint: { ...customer.deleteCustomer.v1 } as ApiEndpoint,
    pathParams
  });
}





export async function fetchAllCustomers({query}:any) {
  return callApi({
    uriEndPoint: { ...customer.fetchAllCustomers.v1 } as ApiEndpoint,
    query
  });
}



export async function ValidateCustomerCsv({ body  }: any) {
  return callApi({
    uriEndPoint: { ...customer.validateCsv.v1 } as ApiEndpoint,
    body,
     additionalHeaders: {
      'Content-Type': 'multipart/form-data'
    }

  });
}


export async function UploadCustomerCsv({ body  }: any) {
  return callApi({
    uriEndPoint: { ...customer.UploadCsv.v1 } as ApiEndpoint,
    body,

  });
}

