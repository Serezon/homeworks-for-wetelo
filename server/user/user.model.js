const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const bcrypt = require('bcrypt');

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
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
UserSchema.method({
});

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ email: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

UserSchema.pre("save", function (next) {
  const user = this;
  
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      err => next(err);
    } else {
      // console.log(`I'm user: ${user}`);
      user.password = hash;
      // console.log(user.password);
      next();
    }
  });
});

UserSchema.post("save", function () {
  console.log('post save hook');
});

/**
 * @typedef User
 */
module.exports = mongoose.model('User', UserSchema);
