import defaults from './defaults';

const prefix = '/tenant';

const tenant = {
  getTenantDetails: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}`,
    },
  },
};

export default tenant;
