import defaults from './defaults';

const prefix = '/tool';

const chassis = {
  add: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix 
    }
  },

    getall: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix 
    }
  },

  singleGet: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix 
    }
  },


  update: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: prefix + '/:id'
    }
  },



   validateCsv: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix + '/validate'
    }
  },


   UploadCsv: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix + '/upload'
    }
  },


  delete: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: prefix + '/:id'
    }
  },

 
};

export default chassis;
