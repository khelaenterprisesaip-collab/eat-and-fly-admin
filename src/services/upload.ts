

// Importing necessary utilities
import { upload } from 'utils/apiUtils/endpoints';
import { callApi } from 'utils/apiUtils/index';
import { ApiEndpoint } from 'types/api';



export async function uploadFile({ body }:any ) {
  return callApi({
    uriEndPoint: { ...upload.uploadFile.v1 } as ApiEndpoint,
    body,
      additionalHeaders: {
      'Content-Type': 'multipart/form-data'
    }
  });
}






