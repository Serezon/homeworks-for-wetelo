const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Role Schema
 */
const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
  isSuperadmin: {
    type: Boolean,
    required: true
  },
  permissions: {
    type: Array,
    default: []
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
RoleSchema.method({
});

/**
 * Statics
 */
RoleSchema.statics = {
  /**
   * Get role
   * @param {ObjectId} id - The objectIdrole.
   * @returns {Promise<Role, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((role) => {
        if (role) {
          return role;
        }
        const err = new APIError('No such role exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List roles in descending order of 'name'.
   * @param {number} skip - Number of roles to be skipped.
   * @param {number} limit - Limit number of roles to be returned.
   * @returns {Promise<Role[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ name: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Role
 */
module.exports = mongoose.model('Role', RoleSchema);
