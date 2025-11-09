// Import necessary types and utilities
import { user, auth } from 'utils/apiUtils/endpoints';
import { callApi } from 'utils/apiUtils';
import { ApiEndpoint } from 'types/api'; // Assuming you have a types file

// Assuming callApi and user.fetchMe.v1 are already correctly typed,
// this conversion should be straightforward.

export const getCurrentUser = async () => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...auth.fetchMe.v1 } as ApiEndpoint
  });
};
export const getUserDetails = async (id: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...user.getUserDetails.v1 } as ApiEndpoint,
    pathParams: { id }
  });
};
// export const updateProfileService = async ({ body }: any) => {
//   // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
//   return callApi({
//     uriEndPoint: { ...user.updateProfile.v1 } as ApiEndpoint,
//     body
//   });
// };
// export const resetPasswordService = async ({ pathParams }: any) => {
//   // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
//   return callApi({
//     uriEndPoint: { ...user.resetPassword.v1 } as ApiEndpoint,
//     pathParams
//   });
// };
