import defaults from "./defaults";

const prefix = "/user";

const staff = {
  invite: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix + "/admin/add-user ",
    },
  },

  fetchAllFetch: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix,
    },
  },

  updateStaff: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: prefix + "/admin/updateProfile/:id",
    },
  },

  updatePassword: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: prefix + "/admin/password/reset",
    },
  },

  getSingleFetch: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix + "/admin/:id",
    },
  },

  resendInvite: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix + "/resend",
    },
  },
  acceptRecruiter: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix + "/accept",
    },
  },
  UpdateStatus: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: prefix + "/:id",
    },
  },
};

export default staff;
