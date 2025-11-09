
import defaults from './defaults';

const prefix = '/notification/master';

const notification = {
  fetchNotification: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix
    }
  },

  updateNotification: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: prefix
    }
  },


  fetchAllNotification:{
     v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/notifications'
    }
  }
};

export default notification;
