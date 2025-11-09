
import defaults from './defaults';

const prefix = 'customers';

const customer = {



  fetchCustomer: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix +"/:id"
    }
  },

  updateCustomer: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: prefix +"/:id"
    }
  },

  deleteCustomer: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: prefix +"/:id"
    }
  },


  UploadCsv: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix +"/uploadCsv"
    }
  },


  validateCsv :{
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix +"/validate"
    }
  },

    addCustomer: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix
    }
  },


  fetchAllCustomers:{
     v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix
    }
  }
};

export default customer;
