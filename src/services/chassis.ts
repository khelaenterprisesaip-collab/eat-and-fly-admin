// Importing necessary utilities
import { chassis } from 'utils/apiUtils/endpoints';
import { callApi } from 'utils/apiUtils/index';
import { ApiEndpoint } from 'types/api';



export async function addChassis({ body }: any) {
  return callApi({
    uriEndPoint: { ...chassis.add.v1 } as ApiEndpoint,
    body,
    additionalHeaders: {
      'Content-Type': 'multipart/form-data'
    }
  });
}





export async function updateChassis({ body , pathParams }: any) {
  return callApi({
    uriEndPoint: { ...chassis.update.v1 } as ApiEndpoint,
    body,
    pathParams,
    additionalHeaders: {
      'Content-Type': 'multipart/form-data'
    }
  });
}



export async function getAllChassis({query}:any) {
  return callApi({
    uriEndPoint: { ...chassis.getall.v1 } as ApiEndpoint,
    query
  });
}



export async function getSingleChassis({ query }: any) {
  return callApi({
    uriEndPoint: { ...chassis.singleGet.v1 } as ApiEndpoint,
    query,
  });
}



export async function ValidateToolCsv({ body  }: any) {
  return callApi({
    uriEndPoint: { ...chassis.validateCsv.v1 } as ApiEndpoint,
    body,
     additionalHeaders: {
      'Content-Type': 'multipart/form-data'
    }

  });
}


export async function UploadToolCsv({ body  }: any) {
  return callApi({
    uriEndPoint: { ...chassis.UploadCsv.v1 } as ApiEndpoint,
    body,

  });
}




export async function deleteChassis({ pathParams }: any) {
  return callApi({
    uriEndPoint: { ...chassis.delete.v1 } as ApiEndpoint,
    pathParams,
  });
}





