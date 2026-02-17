import defaults from "./defaults";

const prefix = "category";

const category = {
    fetchCategory: {
        v1: {
            ...defaults.methods.GET,
            ...defaults.versions.v1,
            uri: prefix + "/:id",
        },
    },

    updateCategory: {
        v1: {
            ...defaults.methods.PUT,
            ...defaults.versions.v1,
            uri: prefix + "/:id",
        },
    },

    addCategory: {
        v1: {
            ...defaults.methods.POST,
            ...defaults.versions.v1,
            uri: prefix,
        },
    },

    fetchAllCategory: {
        v1: {
            ...defaults.methods.GET,
            ...defaults.versions.v1,
            uri: prefix,
        },
    },

    deleteCategory: {
        v1: {
            ...defaults.methods.DELETE,
            ...defaults.versions.v1,
            uri: prefix + "/:id",
        },
    },
};

export default category;
