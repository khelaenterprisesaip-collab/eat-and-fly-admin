// Importing necessary utilities
import { product } from "utils/apiUtils/endpoints";
import { callApi } from "utils/apiUtils/index";
import { ApiEndpoint } from "types/api";

export async function createProduct({ body }: any) {
  return callApi({
    uriEndPoint: { ...product.addProduct.v1 } as ApiEndpoint,
    body,
  });
}

export async function updateProduct({ body, pathParams }: any) {
  return callApi({
    uriEndPoint: { ...product.updateProduct.v1 } as ApiEndpoint,
    body,
    pathParams,
  });
}

export async function fetchAllProduct({ query }: any) {
  return callApi({
    uriEndPoint: { ...product.fetchAllProduct.v1 } as ApiEndpoint,
    query,
  });
}

export async function getSingleFetch({ pathParams }: any) {
  return callApi({
    uriEndPoint: { ...product.fetchProduct.v1 } as ApiEndpoint,
    pathParams,
  });
}

export async function deleteProduct({ pathParams }: any) {
  return callApi({
    uriEndPoint: { ...product.deleteProduct.v1 } as ApiEndpoint,
    pathParams,
  });
}
