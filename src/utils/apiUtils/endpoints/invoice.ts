import defaults from "./defaults";

const prefix = "/invoice";

const invoice = {
  createInvoice: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix,
    },
  },
  getInvoice: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix,
    },
  },
  getSingleInvoice: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix + "/single/:id",
    },
  },
  deleteInvoice: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: `${prefix}/:id`,
    },
  },
  downloadInvoice: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: prefix,
    },
  },
  capturePayment: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix + "/transaction",
    },
  },
  getTransactions: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix + "/transaction/:invoiceId",
    },
  },
};

export default invoice;
