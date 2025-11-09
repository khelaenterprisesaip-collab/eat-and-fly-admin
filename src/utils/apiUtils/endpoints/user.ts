import defaults from './defaults';

const user = {
  getUserDetails: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/user/:id'
    }
  }
};

export default user;
