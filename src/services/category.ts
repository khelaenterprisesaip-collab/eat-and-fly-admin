// Importing necessary utilities
import { category } from "utils/apiUtils/endpoints";
import { callApi } from "utils/apiUtils/index";
import { ApiEndpoint } from "types/api";

export async function createCategory({ body }: any) {
    return callApi({
        uriEndPoint: { ...category.addCategory.v1 } as ApiEndpoint,
        body,
    });
}

export async function updateCategory({ body, pathParams }: any) {
    return callApi({
        uriEndPoint: { ...category.updateCategory.v1 } as ApiEndpoint,
        body,
        pathParams,
    });
}

export async function fetchAllCategory({ query }: any) {
    return callApi({
        uriEndPoint: { ...category.fetchAllCategory.v1 } as ApiEndpoint,
        query,
    });
}

export async function getSingleCategory({ pathParams }: any) {
    return callApi({
        uriEndPoint: { ...category.fetchCategory.v1 } as ApiEndpoint,
        pathParams,
    });
}

export async function deleteCategory({ pathParams }: any) {
    return callApi({
        uriEndPoint: { ...category.deleteCategory.v1 } as ApiEndpoint,
        pathParams,
    });
}
