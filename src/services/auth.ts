// Importing necessary utilities
import { auth } from "utils/apiUtils/endpoints";
import { callApi } from "utils/apiUtils/index";
import { ApiEndpoint } from "types/api";

interface LoginParams {
  email: string | undefined;
  password: string | undefined;
}
interface SignUpInterface {
  body: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  };
}
interface VerifyInterface {
  pathParams: {
    token: string;
  };
}

// Example login function with typed parameters
export async function login({ email = "", password = "" }: LoginParams) {
  return callApi({
    uriEndPoint: { ...auth.login.v1 } as ApiEndpoint,
    body: {
      email,
      password,
    },
  });
}
export async function register({ body }: SignUpInterface) {
  return callApi({
    uriEndPoint: { ...auth.register.v1 } as ApiEndpoint,
    body,
  });
}
export async function verifyToken({ pathParams }: VerifyInterface) {
  return callApi({
    uriEndPoint: { ...auth.verifyUser.v1 } as ApiEndpoint,
    pathParams,
  });
}
export async function setupPassword({ body }: any) {
  return callApi({
    uriEndPoint: { ...auth.setupPassword.v1 } as ApiEndpoint,
    body,
  });
}
export async function forgotPasswordService({ body }: any) {
  return callApi({
    uriEndPoint: { ...auth.forgotPassword.v1 } as ApiEndpoint,
    body,
  });
}
export async function verifyOtp({ pathParams }: any) {
  return callApi({
    uriEndPoint: { ...auth.verifyOtp.v1 } as ApiEndpoint,
    pathParams,
  });
}


export async function resetPassword({ pathParams }: any) {
  return callApi({
    uriEndPoint: { ...auth.resetPassword.v1 } as ApiEndpoint,
    pathParams,
  });
}


export async function updateProfileService({ body }: any) {
  return callApi({
    uriEndPoint: { ...auth.updateProfile.v1 } as ApiEndpoint,
    body,
  });
}

export async function updatePassword({ pathParams }: any) {
  return callApi({
    uriEndPoint: { ...auth.updatePassword.v1 } as ApiEndpoint,
    pathParams,
  });
}

export async function fetchPermission() {
  return callApi({
    uriEndPoint: { ...auth.fetchPermission.v1 } as ApiEndpoint,
  });
}
