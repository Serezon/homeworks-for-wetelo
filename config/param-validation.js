const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  // POST /api/users
  createUser: {
    body: {
      email: Joi.string().required().regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/),
      password: Joi.string().required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      email: Joi.string().required().regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/),
      password: Joi.string().required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      email: Joi.string().required().regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/),
      password: Joi.string().required()
    }
  },

  //POST /api/role/

  createRole: {
    body: {
      name: Joi.string().required(),
      status: Joi.boolean().required(),
      isSuperadmin: Joi.boolean().required(),
      permissions: Joi.array().required()
    }
  },

  // UPDATE /api/role/:roleId
  updateRole: {
    body: {
      name: Joi.string().required(),
      status: Joi.boolean().required(),
      isSuperadmin: Joi.boolean().required(),
      permissions: Joi.array().required()
    },
    params: {
      roleId: Joi.string().hex().required()
    }
  },

  createCategory: {
    body: {
      name: Joi.string().required(),
      status: Joi.boolean().required(),
      order: Joi.number().required(),
      image: Joi.string().required()
    }
  },

  updateCategory: {
    body: {
      name: Joi.string().required(),
      status: Joi.boolean().required(),
      order: Joi.number().required(),
      image: Joi.string().required()
    },
    params: {
      categoryId: Joi.string().hex().required()
    }
  },

  
  //POST /api/product/
  createProduct: {
    body: {
      name: Joi.string().required(),
      category: Joi.objectId().required(),
      image: Joi.string(),
      code: Joi.number().required(),
      price: Joi.object().required(),
      available: Joi.boolean().required(),
      size: Joi.object().required(),
      stock: Joi.boolean().required(),
      discount: Joi.number(),
      order: Joi.number()
    }
  },

  updateProduct: {
    body: {
      name: Joi.string().required(),
      category: Joi.objectId().required(),
      image: Joi.string(),
      code: Joi.number().required(),
      price: Joi.object().required(),
      available: Joi.boolean().required(),
      size: Joi.object().required(),
      stock: Joi.boolean().required(),
      discount: Joi.number(),
      order: Joi.number()
    },
    params: {
      productId: Joi.string().hex()
    }
  }


};
