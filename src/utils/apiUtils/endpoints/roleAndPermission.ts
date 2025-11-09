import defaults from './defaults';

// const prefix = '/roles';

const roleAndPermission = {
  addRole: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/role'
    }
  },

  updateRole: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/role/:id'
    }
  },

  fetchAllRoles: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/role'
    }
  },

  fetchSingleRole: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/role'
    }
  },

  // permission
  addPermission: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/permissions'
    }
  },

  fetchAllPermission: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/permissions'
    }
  },

  updatePermission: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/permissions/:id'
    }
  },

  fetchSinglePermission: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/permissions/:id'
    }
  }
};

export default roleAndPermission;
