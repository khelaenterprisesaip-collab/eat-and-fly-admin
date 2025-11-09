import { ApiEndpoint } from "types/api";
import { callApi } from "utils/apiUtils";
import stripe from "utils/apiUtils/endpoints/stripe";

export const trialPeriodCheckout = async () => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...stripe.trialPeriodCheckout.v1 } as ApiEndpoint,
  });
};
export const createCheckoutSessionService = async (planId: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...stripe.createCheckoutSession.v1 } as ApiEndpoint,
    pathParams: { planId },
  });
};
export const updateSubscriptionService = async ({ body }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...stripe.updateSubscription.v1 } as ApiEndpoint,
    body,
  });
};
export const cancelNextBillingService = async ({ body }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...stripe.cancelNextBilling.v1 } as ApiEndpoint,
    body,
  });
};
export const getFutureInvoice = async () => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...stripe.getFutureInvoice.v1 } as ApiEndpoint,
  });
};
export const getPaymentMethodList = async () => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...stripe.getPaymentMethodList.v1 } as ApiEndpoint,
  });
};
export const deletePaymentMethodService = async (id: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...stripe.deletePaymentMethod.v1 } as ApiEndpoint,
    pathParams: { id },
  });
};
export const changePaymentMethodService = async (id: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...stripe.changePaymentMethod.v1 } as ApiEndpoint,
    pathParams: { id },
  });
};
export const linkPaymentMethod = async (paymentMethodId: string) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...stripe.linkPaymentMethod.v1 } as ApiEndpoint,
    body: {
      paymentMethodId,
    },
  });
};
