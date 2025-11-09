import defaults from './defaults';

const prefix = '/upload';

const upload = {
  uploadFile: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix
    }
  },

  

};

export default upload;
