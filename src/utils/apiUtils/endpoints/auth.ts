import defaults from './defaults';

const prefix = '/auth';

const auth = {
  login: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix + '/login'
    }
  },
  register: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix + '/register'
    }
  },

      SignStudent: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix + '/students/sign-in'
    }
  },
  verifyUser: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: prefix + '/verify/:token'
    }
  },
  setupPassword: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: prefix + '/setup-password/'
    }
  },
  forgotPassword: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix + '/forgotPassword'
    }
  },
  verifyOtp: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix+ '/verifyotp/:token'
    }
  },



    verifyEmail: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix+ '/verifyotp/:token'
    }
  },
  resetPassword: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix + '/resetpassword/:token'
    }
  },
  checkToken: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix + '/access/verify/token'
    }
  },
  refreshToken: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix + '/access/refresh'
    }
  },
  fetchMe: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri:  '/me'
    }
  },

  updateProfile: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: prefix + '/profile'
    }
  },

  updatePassword: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: prefix + '/password/:token'
    }
  },

  fetchPermission: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix + '/permissions'
    }
  },

 
};

export default auth;
