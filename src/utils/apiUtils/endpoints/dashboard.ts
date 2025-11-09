import defaults from "./defaults";

const prefix = "/dashboard";

const dashboard = {
  getStats: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}`,
    },
  },
  monthlyCustomer: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/customers-monthly`,
    },
  },

  getRevenue: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/revenue`,
    },
  },
  getActivities: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `/activities`,
    },
  },
  getDashboardStats: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/stats`,
    },
  },
};

export default dashboard;
