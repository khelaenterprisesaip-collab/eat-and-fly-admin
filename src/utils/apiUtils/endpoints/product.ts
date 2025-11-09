import defaults from "./defaults";

const prefix = "product";

const product = {
  fetchProduct: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix + "/:id",
    },
  },

  updateProduct: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: prefix + "/:id",
    },
  },

  deleteCustomer: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: prefix + "/:id",
    },
  },

  UploadCsv: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix + "/uploadCsv",
    },
  },

  validateCsv: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix + "/validate",
    },
  },

  addProduct: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix,
    },
  },

  fetchAllProduct: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix,
    },
  },

  deleteProduct: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: prefix + "/:id",
    },
  },
};

export default product;
